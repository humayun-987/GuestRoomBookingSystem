// import { useEffect, useState, useCallback } from "react";
// import {
//   collection, getDocs, addDoc, doc, updateDoc,
//   query, where, writeBatch,
// } from "firebase/firestore";
// import { db } from "../comp/firebaseConfig";
// import { useAuth } from "./AuthContext";
// import { message } from "antd";
// import { injectPortalTheme } from "./PortalTheme";

// /* ── Status config ── */
// const STATUS = {
//   pending:     { cls: "pt-amber",  label: "Pending Approval",  bcard: "pending" },
//   approved:    { cls: "pt-green",  label: "Approved",          bcard: "approved" },
//   conditional: { cls: "pt-green",  label: "Approved with Condition", bcard: "approved" },
//   checked_in:  { cls: "pt-purple", label: "Checked In",        bcard: "checked_in" },
//   checked_out: { cls: "pt-muted",  label: "Checked Out",       bcard: "checked_out" },
//   rejected:    { cls: "pt-red",    label: "Rejected",          bcard: "rejected" },
//   cancelled:   { cls: "pt-muted",  label: "Cancelled",         bcard: "checked_out" },
// };

// /* ── Check if two date ranges overlap ── */
// const overlaps = (bIn, bOut, reqIn, reqOut) =>
//   bIn < reqOut && bOut > reqIn;

// /* ── Auto-cleanup: mark expired bookings — fire and forget ── */
// const runCleanup = async () => {
//   try {
//     const now = new Date();
//     const snap = await getDocs(
//       query(
//         collection(db, "bookings"),
//         where("status", "in", ["pending", "approved", "conditional", "checked_in"])
//       )
//     );
//     const batch = writeBatch(db);
//     let count = 0;
//     snap.docs.forEach(d => {
//       const data = d.data();
//       const checkOut = data.checkOut?.toDate?.() ?? new Date(data.checkOut);
//       if (checkOut < now) {
//         const newStatus = data.status === "checked_in" ? "checked_out" : "cancelled";
//         batch.update(doc(db, "bookings", d.id), {
//           status: newStatus,
//           ...(newStatus === "checked_out" ? { checkedOutAt: now } : {}),
//         });
//         count++;
//       }
//     });
//     if (count > 0) await batch.commit();
//   } catch {
//     // silent — non-critical
//   }
// };

// export default function StudentDashboard() {
//   const { user, profile, logout } = useAuth();
//   const [tab, setTab]         = useState("book");
//   const [preCheckIn, setPreCheckIn]   = useState("");
//   const [preCheckOut, setPreCheckOut] = useState("");

//   // Called from HistoryTab when student clicks "Book Another Room"
//   const handleBookAnother = (checkIn, checkOut) => {
//     setPreCheckIn(checkIn);
//     setPreCheckOut(checkOut);
//     setTab("book");
//   };

//   useEffect(() => {
//     injectPortalTheme();
//     runCleanup();
//   }, []);

//   return (
//     <div className="pr">
//       <div className="pr-bg" />

//       {/* Topbar */}
//       <div className="pr-topbar">
//         <div>
//           <div className="pr-brand">IITK <span>Guest Rooms</span></div>
//           <div className="pr-brand-sub">Student Portal</div>
//         </div>
//         <div className="pr-topbar-right">
//           <div style={{ textAlign: "right" }}>
//             <div className="pr-user-name">{profile?.name || user?.email}</div>
//             <div className="pr-user-role">Student · {profile?.hostel || ""}</div>
//           </div>
//           <button className="pr-logout" onClick={logout}>Sign Out</button>
//         </div>
//       </div>

//       <div className="pr-body">
//         <div className="pr-page-header pr-a1">
//           <div className="pr-eyebrow">Student Portal</div>
//           <h1 className="pr-page-title">Guest Room Booking</h1>
//           <p className="pr-page-sub">Check availability for your dates, then request a room</p>
//         </div>

//         <div className="pr-tabs pr-a2">
//           {[
//             { key: "book",    label: "Book a Room" },
//             { key: "status",  label: "Active Bookings" },
//             { key: "history", label: "History" },
//           ].map(t => (
//             <button key={t.key}
//               className={`pr-tab ${tab === t.key ? "active" : ""}`}
//               onClick={() => setTab(t.key)}>
//               {t.label}
//             </button>
//           ))}
//         </div>

//         <div className="pr-a3">
//           {tab === "book"    && <BookTab user={user} profile={profile} preCheckIn={preCheckIn} preCheckOut={preCheckOut} />}
//           {tab === "status"  && <StatusTab user={user} onBookAnother={handleBookAnother} />}
//           {tab === "history" && <HistoryTab user={user} onBookAnother={handleBookAnother} />}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════
//    BOOK TAB — date-first availability
// ══════════════════════════════════════ */
// function BookTab({ user, profile, preCheckIn = "", preCheckOut = "" }) {
//   /* ── Date selection ── */
//   const [checkIn, setCheckIn]   = useState(preCheckIn);
//   const [checkOut, setCheckOut] = useState(preCheckOut);
//   const [searched, setSearched] = useState(false);

//   // Auto-search if dates were pre-filled from "Book Another Room"
//   useEffect(() => {
//     if (preCheckIn && preCheckOut) {
//       setCheckIn(preCheckIn);
//       setCheckOut(preCheckOut);
//       setSearched(false);
//     }
//   }, [preCheckIn, preCheckOut]);

//   /* ── Results ── */
//   const [hostels, setHostels]   = useState([]);
//   const [loading, setLoading]   = useState(false);
//   const [openAccordion, setOpenAccordion] = useState(null);

//   /* ── Booking modal ── */
//   const [modal, setModal]         = useState(null); // { room, hostel }
//   const [submitting, setSubmitting] = useState(false);

//   /* Guest form fields */
//   const [guestName, setGuestName]   = useState("");
//   const [guestRel, setGuestRel]     = useState("");
//   const [purpose, setPurpose]       = useState("");
//   const [yourName, setYourName]     = useState("");
//   const [yourPhone, setYourPhone]   = useState("");

//   /* ── Date validation ── */
//   const today = new Date().toISOString().split("T")[0];
//   const dateError = (() => {
//     if (!checkIn || !checkOut) return null;
//     if (checkOut <= checkIn) return "Check-out must be after check-in";
//     return null;
//   })();

//   /* ── Check availability ── */
//   const checkAvailability = useCallback(async () => {
//     if (!checkIn || !checkOut || dateError) return;
//     setLoading(true);
//     setSearched(true);
//     setOpenAccordion(null);

//     try {
//       const reqIn  = new Date(checkIn);
//       const reqOut = new Date(checkOut);

//       /* 1. Fetch all active bookings that could overlap */
//       const bookSnap = await getDocs(
//         query(
//           collection(db, "bookings"),
//           where("status", "in", ["pending", "approved", "conditional", "checked_in"])
//         )
//       );
//       const activeBookings = bookSnap.docs.map(d => ({ id: d.id, ...d.data() }));

//       /* 2. Build set of roomIds that are blocked for our date range */
//       const blockedRooms = new Set();
//       activeBookings.forEach(b => {
//         const bIn  = b.checkIn?.toDate?.()  ?? new Date(b.checkIn);
//         const bOut = b.checkOut?.toDate?.() ?? new Date(b.checkOut);
//         if (overlaps(bIn, bOut, reqIn, reqOut)) {
//           blockedRooms.add(b.roomId);
//         }
//       });

//       /* 3. Fetch hostels + rooms, annotate with date availability */
//       const hostelSnap = await getDocs(collection(db, "hostels"));
//       const data = [];
//       for (const h of hostelSnap.docs) {
//         const roomSnap = await getDocs(collection(db, "hostels", h.id, "rooms"));
//         const rooms = roomSnap.docs.map(r => {
//           const rData = r.data();
//           // Room is date-available if:
//           // 1. Not blocked by an overlapping booking for these dates
//           // 2. Not explicitly put in maintenance by admin (maintenance: true)
//           // NOTE: We intentionally ignore the legacy `available` field —
//           // old bookings incorrectly set available:false permanently on rooms.
//           const underMaintenance = rData.maintenance === true;
//           return {
//             id: r.id,
//             ...rData,
//             underMaintenance,
//             dateAvailable: !blockedRooms.has(r.id) && !underMaintenance,
//           };
//         });
//         data.push({
//           id: h.id,
//           ...h.data(),
//           rooms,
//           availCount: rooms.filter(r => r.dateAvailable).length,
//         });
//       }

//       setHostels(data);
//     } catch {
//       message.error("Failed to check availability");
//     }

//     setLoading(false);
//   }, [checkIn, checkOut, dateError]);

//   /* ── Open booking modal ── */
//   const openModal = (room, hostel) => {
//     setModal({ room, hostel });
//     setYourName(profile?.name || "");
//     setYourPhone(profile?.phone || "");
//     setGuestName(""); setGuestRel(""); setPurpose("");
//   };

//   /* ── Submit booking ── */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!yourName || !yourPhone || !guestName || !guestRel || !purpose) {
//       message.error("Please fill in all fields");
//       return;
//     }
//     if (!/^[0-9]{10}$/.test(yourPhone)) {
//       message.error("Enter a valid 10-digit phone number");
//       return;
//     }

//     const { room, hostel } = modal;
//     setSubmitting(true);

//     try {
//       await addDoc(collection(db, "bookings"), {
//         hostelId:      hostel.id,
//         hostelName:    hostel.name,
//         roomId:        room.id,
//         roomCapacity:  room.capacity,
//         roomAc:        room.ac,
//         studentId:     user.uid,
//         studentName:   yourName.trim(),
//         phone:         yourPhone.trim(),
//         guestName:     guestName.trim(),
//         guestRelation: guestRel.trim(),
//         checkIn:       new Date(checkIn),
//         checkOut:      new Date(checkOut),
//         purpose:       purpose.trim(),
//         bookedAt:      new Date(),
//         status:        "pending",
//         wardenNote:    "",
//       });

//       /* Optimistically mark this room as date-unavailable in local state */
//       setHostels(prev => prev.map(h =>
//         h.id !== hostel.id ? h : {
//           ...h,
//           availCount: h.availCount - 1,
//           rooms: h.rooms.map(r =>
//             r.id === room.id ? { ...r, dateAvailable: false } : r
//           ),
//         }
//       ));

//       message.success("Booking request submitted — awaiting warden approval");
//       setModal(null);
//     } catch {
//       message.error("Submission failed. Please try again.");
//     }

//     setSubmitting(false);
//   };

//   /* ── Render ── */
//   return (
//     <>
//       {/* ── Date picker card ── */}
//       <div className="pr-card pr-a1" style={{ maxWidth: 640, marginBottom: 28 }}>
//         <div className="pr-card-title">Select Your Dates</div>
//         <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -12, marginBottom: 20 }}>
//           Choose check-in and check-out dates to see available rooms across all hostels.
//         </p>

//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//           <div className="pr-field">
//             <label className="pr-label">Check-in Date</label>
//             <input className="pr-input" type="date" min={today}
//               value={checkIn}
//               onChange={e => { setCheckIn(e.target.value); setSearched(false); }}
//               style={{ colorScheme: "dark" }} />
//           </div>
//           <div className="pr-field">
//             <label className="pr-label">Check-out Date</label>
//             <input className="pr-input" type="date" min={checkIn || today}
//               value={checkOut}
//               onChange={e => { setCheckOut(e.target.value); setSearched(false); }}
//               style={{ colorScheme: "dark" }} />
//           </div>
//         </div>

//         {dateError && (
//           <p style={{ color: "#f87171", fontSize: 13, marginTop: -8, marginBottom: 12 }}>
//             ⚠ {dateError}
//           </p>
//         )}

//         {checkIn && checkOut && !dateError && (
//           <div style={{
//             background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
//             borderRadius: 4, padding: "8px 14px", fontSize: 13, color: "var(--gold)",
//             marginBottom: 16,
//           }}>
//             📅 {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//             {" → "}
//             {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//             {" · "}
//             {Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)} night(s)
//           </div>
//         )}

//         <button
//           className="pb pb-gold pb-lg"
//           disabled={!checkIn || !checkOut || !!dateError || loading}
//           onClick={checkAvailability}
//           style={{ minWidth: 200 }}
//         >
//           {loading ? "Checking…" : searched ? "↻ Re-check Availability" : "Check Availability →"}
//         </button>
//       </div>

//       {/* ── Results ── */}
//       {loading && <div className="pr-spin" />}

//       {!loading && searched && hostels.length === 0 && (
//         <div className="pr-empty"><div className="pr-empty-icon">🏠</div>No hostels configured yet</div>
//       )}

//       {!loading && searched && hostels.map(h => (
//         <div key={h.id} className="pr-accordion pr-a2">
//           <div className={`pr-accordion-head ${openAccordion === h.id ? "open" : ""}`}
//             onClick={() => setOpenAccordion(openAccordion === h.id ? null : h.id)}>
//             <div className="pr-accordion-title">
//               {h.name}
//               <span className={`pt ${h.availCount > 0 ? "pt-green" : "pt-red"}`}>
//                 {h.availCount > 0 ? `${h.availCount} Available` : "Fully Booked"}
//               </span>
//             </div>
//             <span className={`pr-chevron ${openAccordion === h.id ? "open" : ""}`}>▼</span>
//           </div>

//           {openAccordion === h.id && (
//             <div className="pr-accordion-body">
//               {h.rooms.length === 0
//                 ? <div className="pr-empty" style={{ padding: "20px 0" }}>No rooms configured</div>
//                 : (
//                   <div className="pr-room-grid">
//                     {h.rooms.map((room, i) => (
//                       <div key={room.id}
//                         className={`pr-room-card ${room.dateAvailable ? "available" : "booked"}`}>
//                         <div className="pr-room-name">
//                           Room {i + 1}
//                           <span className={`pt ${room.dateAvailable ? "pt-green" : "pt-red"}`}
//                             style={{ fontSize: 10 }}>
//                             {room.underMaintenance
//                               ? "Maintenance"
//                               : room.dateAvailable ? "Free" : "Booked"}
//                           </span>
//                         </div>
//                         <div className="pr-room-row">
//                           👥 Capacity: <strong style={{ color: "var(--text)" }}>{room.capacity}</strong>
//                         </div>
//                         <div className="pr-room-row">
//                           ❄️ AC: <strong style={{ color: "var(--text)" }}>{room.ac ? "Yes" : "No"}</strong>
//                         </div>
//                         {!room.dateAvailable && !room.underMaintenance && (
//                           <div style={{
//                             fontSize: 11, color: "var(--muted)", marginTop: 8,
//                             padding: "4px 8px", background: "rgba(248,113,113,0.07)",
//                             borderRadius: 4,
//                           }}>
//                             Booked for your dates
//                           </div>
//                         )}
//                         {room.underMaintenance && (
//                           <div style={{
//                             fontSize: 11, color: "var(--muted)", marginTop: 8,
//                             padding: "4px 8px", background: "rgba(245,158,11,0.07)",
//                             borderRadius: 4,
//                           }}>
//                             Temporarily unavailable
//                           </div>
//                         )}
//                         {room.dateAvailable && (
//                           <button className="pb pb-gold pb-full pb-sm"
//                             style={{ marginTop: 12 }}
//                             onClick={() => openModal(room, h)}>
//                             Request Booking
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 )
//               }
//             </div>
//           )}
//         </div>
//       ))}

//       {/* ── Booking modal ── */}
//       {modal && (
//         <div className="pr-overlay">
//           <div className="pr-modal pr-a1">
//             <div className="pr-modal-head">
//               <div className="pr-modal-title">Booking Request</div>
//               <button className="pr-modal-close" onClick={() => setModal(null)}>✕</button>
//             </div>
//             <div className="pr-modal-body">
//               {/* Room + dates summary */}
//               <div style={{
//                 background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)",
//                 borderRadius: 6, padding: "12px 16px", marginBottom: 20,
//               }}>
//                 <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
//                   <span className="pt pt-blue">{modal.hostel.name}</span>
//                   <span className="pt pt-muted">Cap: {modal.room.capacity}</span>
//                   <span className="pt pt-muted">{modal.room.ac ? "AC" : "Non-AC"}</span>
//                 </div>
//                 <div style={{ fontSize: 13, color: "var(--gold)" }}>
//                   📅 {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                   {" → "}
//                   {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
//                   {" · "}
//                   {Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)} night(s)
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//                   <div className="pr-field">
//                     <label className="pr-label">Your Name</label>
//                     <input className="pr-input" value={yourName}
//                       onChange={e => setYourName(e.target.value)} placeholder="Full name" />
//                   </div>
//                   <div className="pr-field">
//                     <label className="pr-label">Your Phone</label>
//                     <input className="pr-input" value={yourPhone}
//                       onChange={e => setYourPhone(e.target.value)}
//                       placeholder="10-digit number" maxLength={10} />
//                   </div>
//                   <div className="pr-field">
//                     <label className="pr-label">Guest Name</label>
//                     <input className="pr-input" value={guestName}
//                       onChange={e => setGuestName(e.target.value)} placeholder="Guest's full name" />
//                   </div>
//                   <div className="pr-field">
//                     <label className="pr-label">Relation</label>
//                     <input className="pr-input" value={guestRel}
//                       onChange={e => setGuestRel(e.target.value)} placeholder="e.g. Father, Sister" />
//                   </div>
//                 </div>
//                 <div className="pr-field">
//                   <label className="pr-label">Purpose of Visit</label>
//                   <textarea className="pr-textarea" value={purpose}
//                     onChange={e => setPurpose(e.target.value)}
//                     placeholder="e.g. Medical, Parents visit, Conference…" />
//                 </div>
//                 <button type="submit" className="pb pb-gold pb-full pb-lg" disabled={submitting}>
//                   {submitting ? "Submitting…" : "Submit Booking Request →"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// /* ══════════════════════════════════════
//    STATUS TAB
// ══════════════════════════════════════ */
// function StatusTab({ user, onBookAnother }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading]   = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const q = query(collection(db, "bookings"), where("studentId", "==", user.uid));
//         const snap = await getDocs(q);
//         setBookings(
//           snap.docs.map(d => ({ id: d.id, ...d.data() }))
//             .filter(b => {
//               if (["pending", "approved", "conditional", "checked_in"].includes(b.status)) return true;
//               // Show cancelled bookings caused by maintenance or admin — so student sees why
//               if (b.status === "cancelled" && (
//                 b.wardenNote?.startsWith("Room under maintenance:") ||
//                 b.wardenNote?.startsWith("Cancelled by admin:")
//               )) return true;
//               return false;
//             })
//             .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
//         );
//       } catch { message.error("Failed to load"); }
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) return <div className="pr-spin" />;
//   if (!bookings.length) return (
//     <div className="pr-empty"><div className="pr-empty-icon">📋</div>No active bookings</div>
//   );

//   return bookings.map(b => {
//     const isCancelled = b.status === "cancelled" && (
//       b.wardenNote?.startsWith("Room under maintenance:") ||
//       b.wardenNote?.startsWith("Cancelled by admin:")
//     );
//     return (
//       <BookingCard key={b.id} booking={b}
//         onBookAnother={isCancelled
//           ? () => onBookAnother(
//               b.checkIn?.toDate?.().toISOString().split("T")[0] || "",
//               b.checkOut?.toDate?.().toISOString().split("T")[0] || ""
//             )
//           : null}
//       />
//     );
//   });
// }

// /* ══════════════════════════════════════
//    HISTORY TAB
// ══════════════════════════════════════ */
// function HistoryTab({ user, onBookAnother }) {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading]   = useState(true);
//   const [reapplyModal, setReapplyModal] = useState(null); // booking to reapply

//   useEffect(() => {
//     (async () => {
//       try {
//         const q = query(collection(db, "bookings"), where("studentId", "==", user.uid));
//         const snap = await getDocs(q);
//         setBookings(
//           snap.docs.map(d => ({ id: d.id, ...d.data() }))
//             .filter(b => ["checked_out", "rejected", "cancelled"].includes(b.status))
//             .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
//         );
//       } catch { message.error("Failed to load history"); }
//       setLoading(false);
//     })();
//   }, []);

//   if (loading) return <div className="pr-spin" />;
//   if (!bookings.length) return (
//     <div className="pr-empty"><div className="pr-empty-icon">🕑</div>No booking history</div>
//   );
//   return (
//     <>
//       {bookings.map(b => {
//         const isMaintCancelled = b.status === "cancelled" &&
//           b.wardenNote?.startsWith("Room under maintenance:");
//         const isAdminCancelled = b.status === "cancelled" &&
//           b.wardenNote?.startsWith("Cancelled by admin:");
//         const needsRebook = isMaintCancelled || isAdminCancelled;
//         return (
//           <BookingCard
//             key={b.id}
//             booking={b}
//             onReapply={b.status === "rejected" ? () => setReapplyModal(b) : null}
//             onBookAnother={needsRebook
//               ? () => onBookAnother(
//                   b.checkIn?.toDate?.().toISOString().split("T")[0] || "",
//                   b.checkOut?.toDate?.().toISOString().split("T")[0] || ""
//                 )
//               : null}
//           />
//         );
//       })}
//       {reapplyModal && (
//         <ReapplyModal booking={reapplyModal} user={user} onClose={() => setReapplyModal(null)} />
//       )}
//     </>
//   );
// }


// /* ══════════════════════════════════════
//    REAPPLY MODAL — pre-filled from rejected booking
// ══════════════════════════════════════ */
// function ReapplyModal({ booking, user, onClose }) {
//   const today = new Date().toISOString().split("T")[0];
//   const [checkIn, setCheckIn]   = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guestName, setGuestName]   = useState(booking.guestName || "");
//   const [guestRel, setGuestRel]     = useState(booking.guestRelation || "");
//   const [purpose, setPurpose]       = useState(booking.purpose || "");
//   const [yourName, setYourName]     = useState(booking.studentName || "");
//   const [yourPhone, setYourPhone]   = useState(booking.phone || "");
//   const [submitting, setSubmitting] = useState(false);

//   const dateError = checkIn && checkOut && checkOut <= checkIn
//     ? "Check-out must be after check-in" : null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!checkIn || !checkOut || dateError) { message.error("Select valid dates"); return; }
//     if (!yourName || !yourPhone || !guestName || !guestRel || !purpose) {
//       message.error("Please fill in all fields"); return;
//     }
//     if (!/^[0-9]{10}$/.test(yourPhone)) { message.error("Enter a valid 10-digit phone number"); return; }

//     setSubmitting(true);
//     try {
//       await addDoc(collection(db, "bookings"), {
//         hostelId:      booking.hostelId,
//         hostelName:    booking.hostelName,
//         roomId:        booking.roomId,
//         roomCapacity:  booking.roomCapacity,
//         roomAc:        booking.roomAc,
//         studentId:     user.uid,
//         studentName:   yourName.trim(),
//         phone:         yourPhone.trim(),
//         guestName:     guestName.trim(),
//         guestRelation: guestRel.trim(),
//         checkIn:       new Date(checkIn),
//         checkOut:      new Date(checkOut),
//         purpose:       purpose.trim(),
//         bookedAt:      new Date(),
//         status:        "pending",
//         wardenNote:    "",
//       });
//       message.success("Re-application submitted — awaiting warden approval");
//       onClose();
//     } catch {
//       message.error("Submission failed. Please try again.");
//     }
//     setSubmitting(false);
//   };

//   return (
//     <div className="pr-overlay">
//       <div className="pr-modal pr-a1">
//         <div className="pr-modal-head">
//           <div className="pr-modal-title">Re-apply for Room</div>
//           <button className="pr-modal-close" onClick={onClose}>✕</button>
//         </div>
//         <div className="pr-modal-body">

//           {/* Show rejection reason as context */}
//           {booking.wardenNote && (
//             <div style={{
//               background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
//               borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 13,
//             }}>
//               <div style={{ color: "#f87171", fontWeight: 600, marginBottom: 4 }}>Previous rejection reason:</div>
//               <div style={{ color: "var(--text)" }}>{booking.wardenNote}</div>
//             </div>
//           )}

//           {/* Room info */}
//           <div style={{
//             background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)",
//             borderRadius: 6, padding: "10px 14px", marginBottom: 20,
//           }}>
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               <span className="pt pt-blue">{booking.hostelName}</span>
//               <span className="pt pt-muted">Cap: {booking.roomCapacity}</span>
//               <span className="pt pt-muted">{booking.roomAc ? "AC" : "Non-AC"}</span>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* New dates */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <div className="pr-field">
//                 <label className="pr-label">New Check-in Date</label>
//                 <input className="pr-input" type="date" min={today}
//                   value={checkIn} onChange={e => setCheckIn(e.target.value)}
//                   style={{ colorScheme: "dark" }} />
//               </div>
//               <div className="pr-field">
//                 <label className="pr-label">New Check-out Date</label>
//                 <input className="pr-input" type="date" min={checkIn || today}
//                   value={checkOut} onChange={e => setCheckOut(e.target.value)}
//                   style={{ colorScheme: "dark" }} />
//               </div>
//             </div>
//             {dateError && (
//               <p style={{ color: "#f87171", fontSize: 13, marginTop: -8, marginBottom: 12 }}>⚠ {dateError}</p>
//             )}

//             {/* Pre-filled details — editable */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
//               <div className="pr-field">
//                 <label className="pr-label">Your Name</label>
//                 <input className="pr-input" value={yourName} onChange={e => setYourName(e.target.value)} />
//               </div>
//               <div className="pr-field">
//                 <label className="pr-label">Your Phone</label>
//                 <input className="pr-input" value={yourPhone} onChange={e => setYourPhone(e.target.value)} maxLength={10} />
//               </div>
//               <div className="pr-field">
//                 <label className="pr-label">Guest Name</label>
//                 <input className="pr-input" value={guestName} onChange={e => setGuestName(e.target.value)} />
//               </div>
//               <div className="pr-field">
//                 <label className="pr-label">Relation</label>
//                 <input className="pr-input" value={guestRel} onChange={e => setGuestRel(e.target.value)} />
//               </div>
//             </div>
//             <div className="pr-field">
//               <label className="pr-label">Purpose of Visit</label>
//               <textarea className="pr-textarea" value={purpose} onChange={e => setPurpose(e.target.value)} />
//             </div>

//             <button type="submit" className="pb pb-gold pb-full pb-lg" disabled={submitting}>
//               {submitting ? "Submitting…" : "Submit Re-application →"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// function BookingCard({ booking, onReapply, onBookAnother }) {
//   const isMaintCancelled = booking.status === "cancelled" &&
//     booking.wardenNote?.startsWith("Room under maintenance:");
//   const isAdminCancelled = booking.status === "cancelled" &&
//     booking.wardenNote?.startsWith("Cancelled by admin:");

//   const effectiveStatus = isMaintCancelled ? "_maintenance"
//     : isAdminCancelled ? "_admin_cancel"
//     : booking.status;

//   const STATUS_OVERRIDE = {
//     _maintenance:   { cls: "pt-amber", label: "Cancelled — Maintenance", bcard: "rejected" },
//     _admin_cancel:  { cls: "pt-red",   label: "Cancelled by Admin",      bcard: "rejected" },
//   };

//   const cfg = STATUS_OVERRIDE[effectiveStatus]
//     || STATUS[booking.status]
//     || { cls: "pt-muted", label: booking.status, bcard: "checked_out" };

//   const fmt = ts => ts?.toDate?.().toLocaleDateString("en-IN") || "—";

//   return (
//     <div className={`pr-bcard ${cfg.bcard}`}>
//       <div className="pr-bcard-head">
//         <div>
//           <div className="pr-bcard-title">{booking.hostelName}</div>
//           <div className="pr-bcard-sub">{booking.roomAc ? "AC" : "Non-AC"} · Capacity {booking.roomCapacity}</div>
//         </div>
//         <span className={`pt ${cfg.cls}`}>{cfg.label}</span>
//       </div>
//       <div className="pr-details">
//         <div className="pr-detail-item">
//           <span className="pr-dl">Guest:</span>
//           <span className="pr-dv">{booking.guestName} ({booking.guestRelation})</span>
//         </div>
//         <div className="pr-detail-item">
//           <span className="pr-dl">Phone:</span>
//           <span className="pr-dv">{booking.phone}</span>
//         </div>
//         <div className="pr-detail-item">
//           <span className="pr-dl">Check-in:</span>
//           <span className="pr-dv">{fmt(booking.checkIn)}</span>
//         </div>
//         <div className="pr-detail-item">
//           <span className="pr-dl">Check-out:</span>
//           <span className="pr-dv">{fmt(booking.checkOut)}</span>
//         </div>
//         <div className="pr-detail-item">
//           <span className="pr-dl">Purpose:</span>
//           <span className="pr-dv">{booking.purpose}</span>
//         </div>
//         <div className="pr-detail-item">
//           <span className="pr-dl">Requested:</span>
//           <span className="pr-dv">{fmt(booking.bookedAt)}</span>
//         </div>
//       </div>

//       {/* Maintenance cancellation note */}
//       {isMaintCancelled && (
//         <div style={{
//           background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
//           borderRadius: 6, padding: "10px 14px", marginTop: 8,
//         }}>
//           <div style={{ color: "#f59e0b", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
//             🔧 Room taken offline for maintenance
//           </div>
//           <div style={{ color: "var(--text)", fontSize: 13 }}>
//             {booking.wardenNote.replace("Room under maintenance: ", "")}
//           </div>
//         </div>
//       )}

//       {/* Admin cancellation note */}
//       {isAdminCancelled && (
//         <div style={{
//           background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
//           borderRadius: 6, padding: "10px 14px", marginTop: 8,
//         }}>
//           <div style={{ color: "#f87171", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
//             ✕ Booking cancelled by administrator
//           </div>
//           <div style={{ color: "var(--text)", fontSize: 13 }}>
//             {booking.wardenNote.replace("Cancelled by admin: ", "")}
//           </div>
//         </div>
//       )}

//       {/* Rejection / conditional note */}
//       {!isMaintCancelled && !isAdminCancelled && booking.wardenNote && (
//         <div className={`pr-warden-note ${booking.status === "rejected" ? "rejected" : ""}`}>
//           {booking.status === "rejected" ? "❌ Rejection reason: " : "📋 Condition on arrival: "}
//           {booking.wardenNote}
//         </div>
//       )}

//       {/* Book another room — for maintenance cancelled */}
//       {onBookAnother && (
//         <div style={{ marginTop: 12 }}>
//           <button className="pb pb-gold pb-sm" onClick={onBookAnother}>
//             🔍 Book Another Room for Same Dates →
//           </button>
//         </div>
//       )}

//       {/* Re-apply — for rejected bookings */}
//       {onReapply && (
//         <div style={{ marginTop: 12 }}>
//           <button className="pb pb-gold pb-sm" onClick={onReapply}>
//             ↩ Re-apply for this Room
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState, useCallback } from "react";
import {
  collection, getDocs, doc, setDoc, updateDoc,
  query, where, writeBatch, addDoc,
} from "firebase/firestore";
import { db } from "../comp/firebaseConfig";
import { useAuth } from "./AuthContext";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";

/* ── Cloudinary config ── */
const CLOUD_NAME    = "dzoqdhk17";
const UPLOAD_PRESET = "iitk_docs";

const uploadToCloudinary = async (file, publicId) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("upload_preset", UPLOAD_PRESET);
  fd.append("public_id", publicId);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: fd }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Upload failed");
  }
  const data = await res.json();
  return data.secure_url;
};

/* ── Status config ── */
const STATUS = {
  pending:     { cls: "pt-amber",  label: "Pending Approval",  bcard: "pending" },
  approved:    { cls: "pt-green",  label: "Approved",          bcard: "approved" },
  conditional: { cls: "pt-green",  label: "Approved with Condition", bcard: "approved" },
  checked_in:  { cls: "pt-purple", label: "Checked In",        bcard: "checked_in" },
  checked_out: { cls: "pt-muted",  label: "Checked Out",       bcard: "checked_out" },
  rejected:    { cls: "pt-red",    label: "Rejected",          bcard: "rejected" },
  cancelled:   { cls: "pt-muted",  label: "Cancelled",         bcard: "checked_out" },
};

/* ── Check if two date ranges overlap ── */
const overlaps = (bIn, bOut, reqIn, reqOut) =>
  bIn < reqOut && bOut > reqIn;

/* ── Auto-cleanup: mark expired bookings — fire and forget ── */
const runCleanup = async () => {
  try {
    const now = new Date();
    const snap = await getDocs(
      query(
        collection(db, "bookings"),
        where("status", "in", ["pending", "approved", "conditional", "checked_in"])
      )
    );
    const batch = writeBatch(db);
    let count = 0;
    snap.docs.forEach(d => {
      const data = d.data();
      const checkOut = data.checkOut?.toDate?.() ?? new Date(data.checkOut);
      if (checkOut < now) {
        const newStatus = data.status === "checked_in" ? "checked_out" : "cancelled";
        batch.update(doc(db, "bookings", d.id), {
          status: newStatus,
          ...(newStatus === "checked_out" ? { checkedOutAt: now } : {}),
        });
        count++;
      }
    });
    if (count > 0) await batch.commit();
  } catch {
    // silent — non-critical
  }
};

export default function StudentDashboard() {
  const { user, profile, logout } = useAuth();
  const [tab, setTab]         = useState("book");
  const [preCheckIn, setPreCheckIn]   = useState("");
  const [preCheckOut, setPreCheckOut] = useState("");

  // Called from HistoryTab when student clicks "Book Another Room"
  const handleBookAnother = (checkIn, checkOut) => {
    setPreCheckIn(checkIn);
    setPreCheckOut(checkOut);
    setTab("book");
  };

  useEffect(() => {
    injectPortalTheme();
    runCleanup();
  }, []);

  return (
    <div className="pr">
      <div className="pr-bg" />

      {/* Topbar */}
      <div className="pr-topbar">
        <div>
          <div className="pr-brand">IITK <span>Guest Rooms</span></div>
          <div className="pr-brand-sub">Student Portal</div>
        </div>
        <div className="pr-topbar-right">
          <div style={{ textAlign: "right" }}>
            <div className="pr-user-name">{profile?.name || user?.email}</div>
            <div className="pr-user-role">Student · {profile?.hostel || ""}</div>
          </div>
          <button className="pr-logout" onClick={logout}>Sign Out</button>
        </div>
      </div>

      <div className="pr-body">
        <div className="pr-page-header pr-a1">
          <div className="pr-eyebrow">Student Portal</div>
          <h1 className="pr-page-title">Guest Room Booking</h1>
          <p className="pr-page-sub">Check availability for your dates, then request a room</p>
        </div>

        <div className="pr-tabs pr-a2">
          {[
            { key: "book",    label: "Book a Room" },
            { key: "status",  label: "Active Bookings" },
            { key: "history", label: "History" },
          ].map(t => (
            <button key={t.key}
              className={`pr-tab ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="pr-a3">
          {tab === "book"    && <BookTab user={user} profile={profile} preCheckIn={preCheckIn} preCheckOut={preCheckOut} />}
          {tab === "status"  && <StatusTab user={user} onBookAnother={handleBookAnother} />}
          {tab === "history" && <HistoryTab user={user} onBookAnother={handleBookAnother} />}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   BOOK TAB — date-first availability
══════════════════════════════════════ */
function BookTab({ user, profile, preCheckIn = "", preCheckOut = "" }) {
  /* ── Date selection ── */
  const [checkIn, setCheckIn]   = useState(preCheckIn);
  const [checkOut, setCheckOut] = useState(preCheckOut);
  const [searched, setSearched] = useState(false);

  // Auto-search if dates were pre-filled from "Book Another Room"
  useEffect(() => {
    if (preCheckIn && preCheckOut) {
      setCheckIn(preCheckIn);
      setCheckOut(preCheckOut);
      setSearched(false);
    }
  }, [preCheckIn, preCheckOut]);

  /* ── Results ── */
  const [hostels, setHostels]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null);

  /* ── Booking modal ── */
  const [modal, setModal]         = useState(null); // { room, hostel }
  const [submitting, setSubmitting] = useState(false);

  /* Guest form fields */
  const [guestName, setGuestName]   = useState("");
  const [guestRel, setGuestRel]     = useState("");
  const [purpose, setPurpose]       = useState("");
  const [yourName, setYourName]     = useState("");
  const [yourPhone, setYourPhone]   = useState("");

  /* Document uploads */
  const [docAadhar, setDocAadhar]     = useState(null);
  const [docCollege, setDocCollege]   = useState(null);
  const [docGuest, setDocGuest]       = useState(null);
  const [uploadProgress, setUploadProgress] = useState("");

  /* ── Date validation ── */
  const today = new Date().toISOString().split("T")[0];
  const dateError = (() => {
    if (!checkIn || !checkOut) return null;
    if (checkOut <= checkIn) return "Check-out must be after check-in";
    return null;
  })();

  /* ── Check availability ── */
  const checkAvailability = useCallback(async () => {
    if (!checkIn || !checkOut || dateError) return;
    setLoading(true);
    setSearched(true);
    setOpenAccordion(null);

    try {
      const reqIn  = new Date(checkIn);
      const reqOut = new Date(checkOut);

      /* 1. Fetch all active bookings that could overlap */
      const bookSnap = await getDocs(
        query(
          collection(db, "bookings"),
          where("status", "in", ["pending", "approved", "conditional", "checked_in"])
        )
      );
      const activeBookings = bookSnap.docs.map(d => ({ id: d.id, ...d.data() }));

      /* 2. Build set of roomIds that are blocked for our date range */
      const blockedRooms = new Set();
      activeBookings.forEach(b => {
        const bIn  = b.checkIn?.toDate?.()  ?? new Date(b.checkIn);
        const bOut = b.checkOut?.toDate?.() ?? new Date(b.checkOut);
        if (overlaps(bIn, bOut, reqIn, reqOut)) {
          blockedRooms.add(b.roomId);
        }
      });

      /* 3. Fetch hostels + rooms, annotate with date availability */
      const hostelSnap = await getDocs(collection(db, "hostels"));
      const data = [];
      for (const h of hostelSnap.docs) {
        const roomSnap = await getDocs(collection(db, "hostels", h.id, "rooms"));
        const rooms = roomSnap.docs.map(r => {
          const rData = r.data();
          // Room is date-available if:
          // 1. Not blocked by an overlapping booking for these dates
          // 2. Not explicitly put in maintenance by admin (maintenance: true)
          // NOTE: We intentionally ignore the legacy `available` field —
          // old bookings incorrectly set available:false permanently on rooms.
          const underMaintenance = rData.maintenance === true;
          return {
            id: r.id,
            ...rData,
            underMaintenance,
            dateAvailable: !blockedRooms.has(r.id) && !underMaintenance,
          };
        });
        data.push({
          id: h.id,
          ...h.data(),
          rooms,
          availCount: rooms.filter(r => r.dateAvailable).length,
        });
      }

      setHostels(data);
    } catch {
      message.error("Failed to check availability");
    }

    setLoading(false);
  }, [checkIn, checkOut, dateError]);

  /* ── Open booking modal ── */
  const openModal = (room, hostel) => {
    setModal({ room, hostel });
    setYourName(profile?.name || "");
    setYourPhone(profile?.phone || "");
    setGuestName(""); setGuestRel(""); setPurpose("");
    setDocAadhar(null); setDocCollege(null); setDocGuest(null);
    setUploadProgress("");
  };

  /* ── Submit booking ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!yourName || !yourPhone || !guestName || !guestRel || !purpose) {
      message.error("Please fill in all fields");
      return;
    }
    if (!/^[0-9]{10}$/.test(yourPhone)) {
      message.error("Enter a valid 10-digit phone number");
      return;
    }
    if (!docAadhar || !docCollege || !docGuest) {
      message.error("Please upload all 3 required documents");
      return;
    }

    const { room, hostel } = modal;
    setSubmitting(true);

    try {
      // Pre-generate booking ID so we can use it in storage paths
      const bookingRef = doc(collection(db, "bookings"));
      const bookingId  = bookingRef.id;

      // Upload all 3 docs to Cloudinary
      setUploadProgress("Uploading Aadhar Card…");
      const aadharUrl = await uploadToCloudinary(docAadhar, `bookings/${bookingId}/aadhar`);

      setUploadProgress("Uploading College ID…");
      const collegeUrl = await uploadToCloudinary(docCollege, `bookings/${bookingId}/college_id`);

      setUploadProgress("Uploading Guest ID Proof…");
      const guestUrl = await uploadToCloudinary(docGuest, `bookings/${bookingId}/guest_id`);

      setUploadProgress("Saving booking…");

      await setDoc(bookingRef, {
        hostelId:      hostel.id,
        hostelName:    hostel.name,
        roomId:        room.id,
        roomCapacity:  room.capacity,
        roomAc:        room.ac,
        studentId:     user.uid,
        studentName:   yourName.trim(),
        phone:         yourPhone.trim(),
        guestName:     guestName.trim(),
        guestRelation: guestRel.trim(),
        checkIn:       new Date(checkIn),
        checkOut:      new Date(checkOut),
        purpose:       purpose.trim(),
        bookedAt:      new Date(),
        status:        "pending",
        wardenNote:    "",
        documents: {
          aadhar:    aadharUrl,
          collegeId: collegeUrl,
          guestId:   guestUrl,
        },
      });

      /* Optimistically mark room as date-unavailable */
      setHostels(prev => prev.map(h =>
        h.id !== hostel.id ? h : {
          ...h,
          availCount: h.availCount - 1,
          rooms: h.rooms.map(r =>
            r.id === room.id ? { ...r, dateAvailable: false } : r
          ),
        }
      ));

      message.success("Booking request submitted — awaiting warden approval");
      setModal(null);
    } catch (err) {
      console.error(err);
      message.error("Submission failed. Please try again.");
    }

    setUploadProgress("");
    setSubmitting(false);
  };

  /* ── Render ── */
  return (
    <>
      {/* ── Date picker card ── */}
      <div className="pr-card pr-a1" style={{ maxWidth: 640, marginBottom: 28 }}>
        <div className="pr-card-title">Select Your Dates</div>
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: -12, marginBottom: 20 }}>
          Choose check-in and check-out dates to see available rooms across all hostels.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div className="pr-field">
            <label className="pr-label">Check-in Date</label>
            <input className="pr-input" type="date" min={today}
              value={checkIn}
              onChange={e => { setCheckIn(e.target.value); setSearched(false); }}
              style={{ colorScheme: "dark" }} />
          </div>
          <div className="pr-field">
            <label className="pr-label">Check-out Date</label>
            <input className="pr-input" type="date" min={checkIn || today}
              value={checkOut}
              onChange={e => { setCheckOut(e.target.value); setSearched(false); }}
              style={{ colorScheme: "dark" }} />
          </div>
        </div>

        {dateError && (
          <p style={{ color: "#f87171", fontSize: 13, marginTop: -8, marginBottom: 12 }}>
            ⚠ {dateError}
          </p>
        )}

        {checkIn && checkOut && !dateError && (
          <div style={{
            background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 4, padding: "8px 14px", fontSize: 13, color: "var(--gold)",
            marginBottom: 16,
          }}>
            📅 {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            {" → "}
            {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            {" · "}
            {Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)} night(s)
          </div>
        )}

        <button
          className="pb pb-gold pb-lg"
          disabled={!checkIn || !checkOut || !!dateError || loading}
          onClick={checkAvailability}
          style={{ minWidth: 200 }}
        >
          {loading ? "Checking…" : searched ? "↻ Re-check Availability" : "Check Availability →"}
        </button>
      </div>

      {/* ── Results ── */}
      {loading && <div className="pr-spin" />}

      {!loading && searched && hostels.length === 0 && (
        <div className="pr-empty"><div className="pr-empty-icon">🏠</div>No hostels configured yet</div>
      )}

      {!loading && searched && hostels.map(h => (
        <div key={h.id} className="pr-accordion pr-a2">
          <div className={`pr-accordion-head ${openAccordion === h.id ? "open" : ""}`}
            onClick={() => setOpenAccordion(openAccordion === h.id ? null : h.id)}>
            <div className="pr-accordion-title">
              {h.name}
              <span className={`pt ${h.availCount > 0 ? "pt-green" : "pt-red"}`}>
                {h.availCount > 0 ? `${h.availCount} Available` : "Fully Booked"}
              </span>
            </div>
            <span className={`pr-chevron ${openAccordion === h.id ? "open" : ""}`}>▼</span>
          </div>

          {openAccordion === h.id && (
            <div className="pr-accordion-body">
              {h.rooms.length === 0
                ? <div className="pr-empty" style={{ padding: "20px 0" }}>No rooms configured</div>
                : (
                  <div className="pr-room-grid">
                    {h.rooms.map((room, i) => (
                      <div key={room.id}
                        className={`pr-room-card ${room.dateAvailable ? "available" : "booked"}`}>
                        <div className="pr-room-name">
                          Room {i + 1}
                          <span className={`pt ${room.dateAvailable ? "pt-green" : "pt-red"}`}
                            style={{ fontSize: 10 }}>
                            {room.underMaintenance
                              ? "Maintenance"
                              : room.dateAvailable ? "Free" : "Booked"}
                          </span>
                        </div>
                        <div className="pr-room-row">
                          👥 Capacity: <strong style={{ color: "var(--text)" }}>{room.capacity}</strong>
                        </div>
                        <div className="pr-room-row">
                          ❄️ AC: <strong style={{ color: "var(--text)" }}>{room.ac ? "Yes" : "No"}</strong>
                        </div>
                        {!room.dateAvailable && !room.underMaintenance && (
                          <div style={{
                            fontSize: 11, color: "var(--muted)", marginTop: 8,
                            padding: "4px 8px", background: "rgba(248,113,113,0.07)",
                            borderRadius: 4,
                          }}>
                            Booked for your dates
                          </div>
                        )}
                        {room.underMaintenance && (
                          <div style={{
                            fontSize: 11, color: "var(--muted)", marginTop: 8,
                            padding: "4px 8px", background: "rgba(245,158,11,0.07)",
                            borderRadius: 4,
                          }}>
                            Temporarily unavailable
                          </div>
                        )}
                        {room.dateAvailable && (
                          <button className="pb pb-gold pb-full pb-sm"
                            style={{ marginTop: 12 }}
                            onClick={() => openModal(room, h)}>
                            Request Booking
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          )}
        </div>
      ))}

      {/* ── Booking modal ── */}
      {modal && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1">
            <div className="pr-modal-head">
              <div className="pr-modal-title">Booking Request</div>
              <button className="pr-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              {/* Room + dates summary */}
              <div style={{
                background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 6, padding: "12px 16px", marginBottom: 20,
              }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                  <span className="pt pt-blue">{modal.hostel.name}</span>
                  <span className="pt pt-muted">Cap: {modal.room.capacity}</span>
                  <span className="pt pt-muted">{modal.room.ac ? "AC" : "Non-AC"}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--gold)" }}>
                  📅 {new Date(checkIn).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {" → "}
                  {new Date(checkOut).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}
                  {Math.ceil((new Date(checkOut) - new Date(checkIn)) / 86400000)} night(s)
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                  <div className="pr-field">
                    <label className="pr-label">Your Name</label>
                    <input className="pr-input" value={yourName}
                      onChange={e => setYourName(e.target.value)} placeholder="Full name" />
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Your Phone</label>
                    <input className="pr-input" value={yourPhone}
                      onChange={e => setYourPhone(e.target.value)}
                      placeholder="10-digit number" maxLength={10} />
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Guest Name</label>
                    <input className="pr-input" value={guestName}
                      onChange={e => setGuestName(e.target.value)} placeholder="Guest's full name" />
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Relation</label>
                    <input className="pr-input" value={guestRel}
                      onChange={e => setGuestRel(e.target.value)} placeholder="e.g. Father, Sister" />
                  </div>
                </div>
                <div className="pr-field">
                  <label className="pr-label">Purpose of Visit</label>
                  <textarea className="pr-textarea" value={purpose}
                    onChange={e => setPurpose(e.target.value)}
                    placeholder="e.g. Medical, Parents visit, Conference…" />
                </div>

                {/* ── Document uploads ── */}
                <div style={{
                  borderTop: "1px solid var(--border)", paddingTop: 16,
                  marginTop: 4, marginBottom: 4,
                }}>
                  <div style={{ fontSize: 13, color: "var(--gold)", fontWeight: 600, marginBottom: 12 }}>
                    📎 Required Documents <span style={{ color: "#f87171", fontWeight: 400 }}>— all mandatory</span>
                  </div>
                  {[
                    { label: "Aadhar Card",     key: "aadhar",  file: docAadhar,  setter: setDocAadhar },
                    { label: "College ID Card",  key: "college", file: docCollege, setter: setDocCollege },
                    { label: "Guest's ID Proof", key: "guest",   file: docGuest,   setter: setDocGuest },
                  ].map(({ label, key, file, setter }) => (
                    <div key={key} className="pr-field" style={{ marginBottom: 12 }}>
                      <label className="pr-label">{label}</label>
                      <div style={{
                        border: `1px dashed ${file ? "rgba(74,222,128,0.4)" : "rgba(201,168,76,0.25)"}`,
                        borderRadius: 6, padding: "10px 14px",
                        background: file ? "rgba(74,222,128,0.05)" : "rgba(201,168,76,0.03)",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: 10, cursor: "pointer",
                        transition: "all 0.2s",
                      }}
                        onClick={() => document.getElementById(`file-${key}`).click()}
                      >
                        <div style={{ fontSize: 13, color: file ? "#4ade80" : "var(--muted)" }}>
                          {file ? `✓ ${file.name}` : `Click to upload ${label}`}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--muted)", flexShrink: 0 }}>
                          JPG / PNG / WebP · max 10MB
                        </div>
                      </div>
                      <input
                        id={`file-${key}`}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: "none" }}
                        onChange={e => {
                          const f = e.target.files[0];
                          if (f && f.size > 10 * 1024 * 1024) {
                            message.error(`${label} must be under 10MB`);
                            return;
                          }
                          setter(f || null);
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Upload progress */}
                {uploadProgress && (
                  <div style={{
                    background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 6, padding: "10px 14px", marginBottom: 12,
                    fontSize: 13, color: "var(--gold)",
                  }}>
                    ⏳ {uploadProgress}
                  </div>
                )}

                <button type="submit" className="pb pb-gold pb-full pb-lg" disabled={submitting}>
                  {submitting ? uploadProgress || "Processing…" : "Submit Booking Request →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════
   STATUS TAB
══════════════════════════════════════ */
function StatusTab({ user, onBookAnother }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "bookings"), where("studentId", "==", user.uid));
        const snap = await getDocs(q);
        setBookings(
          snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(b => {
              if (["pending", "approved", "conditional", "checked_in"].includes(b.status)) return true;
              // Show cancelled bookings caused by maintenance or admin — so student sees why
              if (b.status === "cancelled" && (
                b.wardenNote?.startsWith("Room under maintenance:") ||
                b.wardenNote?.startsWith("Cancelled by admin:")
              )) return true;
              return false;
            })
            .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
        );
      } catch { message.error("Failed to load"); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="pr-spin" />;
  if (!bookings.length) return (
    <div className="pr-empty"><div className="pr-empty-icon">📋</div>No active bookings</div>
  );

  return bookings.map(b => {
    const isCancelled = b.status === "cancelled" && (
      b.wardenNote?.startsWith("Room under maintenance:") ||
      b.wardenNote?.startsWith("Cancelled by admin:")
    );
    return (
      <BookingCard key={b.id} booking={b}
        onBookAnother={isCancelled
          ? () => onBookAnother(
              b.checkIn?.toDate?.().toISOString().split("T")[0] || "",
              b.checkOut?.toDate?.().toISOString().split("T")[0] || ""
            )
          : null}
      />
    );
  });
}

/* ══════════════════════════════════════
   HISTORY TAB
══════════════════════════════════════ */
function HistoryTab({ user, onBookAnother }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [reapplyModal, setReapplyModal] = useState(null); // booking to reapply

  useEffect(() => {
    (async () => {
      try {
        const q = query(collection(db, "bookings"), where("studentId", "==", user.uid));
        const snap = await getDocs(q);
        setBookings(
          snap.docs.map(d => ({ id: d.id, ...d.data() }))
            .filter(b => ["checked_out", "rejected", "cancelled"].includes(b.status))
            .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
        );
      } catch { message.error("Failed to load history"); }
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="pr-spin" />;
  if (!bookings.length) return (
    <div className="pr-empty"><div className="pr-empty-icon">🕑</div>No booking history</div>
  );
  return (
    <>
      {bookings.map(b => {
        const isMaintCancelled = b.status === "cancelled" &&
          b.wardenNote?.startsWith("Room under maintenance:");
        const isAdminCancelled = b.status === "cancelled" &&
          b.wardenNote?.startsWith("Cancelled by admin:");
        const needsRebook = isMaintCancelled || isAdminCancelled;
        return (
          <BookingCard
            key={b.id}
            booking={b}
            onReapply={b.status === "rejected" ? () => setReapplyModal(b) : null}
            onBookAnother={needsRebook
              ? () => onBookAnother(
                  b.checkIn?.toDate?.().toISOString().split("T")[0] || "",
                  b.checkOut?.toDate?.().toISOString().split("T")[0] || ""
                )
              : null}
          />
        );
      })}
      {reapplyModal && (
        <ReapplyModal booking={reapplyModal} user={user} onClose={() => setReapplyModal(null)} />
      )}
    </>
  );
}


/* ══════════════════════════════════════
   REAPPLY MODAL — pre-filled from rejected booking
══════════════════════════════════════ */
function ReapplyModal({ booking, user, onClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn]   = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestName, setGuestName]   = useState(booking.guestName || "");
  const [guestRel, setGuestRel]     = useState(booking.guestRelation || "");
  const [purpose, setPurpose]       = useState(booking.purpose || "");
  const [yourName, setYourName]     = useState(booking.studentName || "");
  const [yourPhone, setYourPhone]   = useState(booking.phone || "");
  const [submitting, setSubmitting] = useState(false);

  const dateError = checkIn && checkOut && checkOut <= checkIn
    ? "Check-out must be after check-in" : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || dateError) { message.error("Select valid dates"); return; }
    if (!yourName || !yourPhone || !guestName || !guestRel || !purpose) {
      message.error("Please fill in all fields"); return;
    }
    if (!/^[0-9]{10}$/.test(yourPhone)) { message.error("Enter a valid 10-digit phone number"); return; }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "bookings"), {
        hostelId:      booking.hostelId,
        hostelName:    booking.hostelName,
        roomId:        booking.roomId,
        roomCapacity:  booking.roomCapacity,
        roomAc:        booking.roomAc,
        studentId:     user.uid,
        studentName:   yourName.trim(),
        phone:         yourPhone.trim(),
        guestName:     guestName.trim(),
        guestRelation: guestRel.trim(),
        checkIn:       new Date(checkIn),
        checkOut:      new Date(checkOut),
        purpose:       purpose.trim(),
        bookedAt:      new Date(),
        status:        "pending",
        wardenNote:    "",
      });
      message.success("Re-application submitted — awaiting warden approval");
      onClose();
    } catch {
      message.error("Submission failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="pr-overlay">
      <div className="pr-modal pr-a1">
        <div className="pr-modal-head">
          <div className="pr-modal-title">Re-apply for Room</div>
          <button className="pr-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="pr-modal-body">

          {/* Show rejection reason as context */}
          {booking.wardenNote && (
            <div style={{
              background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: 6, padding: "10px 14px", marginBottom: 20, fontSize: 13,
            }}>
              <div style={{ color: "#f87171", fontWeight: 600, marginBottom: 4 }}>Previous rejection reason:</div>
              <div style={{ color: "var(--text)" }}>{booking.wardenNote}</div>
            </div>
          )}

          {/* Room info */}
          <div style={{
            background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.15)",
            borderRadius: 6, padding: "10px 14px", marginBottom: 20,
          }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span className="pt pt-blue">{booking.hostelName}</span>
              <span className="pt pt-muted">Cap: {booking.roomCapacity}</span>
              <span className="pt pt-muted">{booking.roomAc ? "AC" : "Non-AC"}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* New dates */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <div className="pr-field">
                <label className="pr-label">New Check-in Date</label>
                <input className="pr-input" type="date" min={today}
                  value={checkIn} onChange={e => setCheckIn(e.target.value)}
                  style={{ colorScheme: "dark" }} />
              </div>
              <div className="pr-field">
                <label className="pr-label">New Check-out Date</label>
                <input className="pr-input" type="date" min={checkIn || today}
                  value={checkOut} onChange={e => setCheckOut(e.target.value)}
                  style={{ colorScheme: "dark" }} />
              </div>
            </div>
            {dateError && (
              <p style={{ color: "#f87171", fontSize: 13, marginTop: -8, marginBottom: 12 }}>⚠ {dateError}</p>
            )}

            {/* Pre-filled details — editable */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
              <div className="pr-field">
                <label className="pr-label">Your Name</label>
                <input className="pr-input" value={yourName} onChange={e => setYourName(e.target.value)} />
              </div>
              <div className="pr-field">
                <label className="pr-label">Your Phone</label>
                <input className="pr-input" value={yourPhone} onChange={e => setYourPhone(e.target.value)} maxLength={10} />
              </div>
              <div className="pr-field">
                <label className="pr-label">Guest Name</label>
                <input className="pr-input" value={guestName} onChange={e => setGuestName(e.target.value)} />
              </div>
              <div className="pr-field">
                <label className="pr-label">Relation</label>
                <input className="pr-input" value={guestRel} onChange={e => setGuestRel(e.target.value)} />
              </div>
            </div>
            <div className="pr-field">
              <label className="pr-label">Purpose of Visit</label>
              <textarea className="pr-textarea" value={purpose} onChange={e => setPurpose(e.target.value)} />
            </div>

            <button type="submit" className="pb pb-gold pb-full pb-lg" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Re-application →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
function BookingCard({ booking, onReapply, onBookAnother }) {
  const isMaintCancelled = booking.status === "cancelled" &&
    booking.wardenNote?.startsWith("Room under maintenance:");
  const isAdminCancelled = booking.status === "cancelled" &&
    booking.wardenNote?.startsWith("Cancelled by admin:");

  const effectiveStatus = isMaintCancelled ? "_maintenance"
    : isAdminCancelled ? "_admin_cancel"
    : booking.status;

  const STATUS_OVERRIDE = {
    _maintenance:   { cls: "pt-amber", label: "Cancelled — Maintenance", bcard: "rejected" },
    _admin_cancel:  { cls: "pt-red",   label: "Cancelled by Admin",      bcard: "rejected" },
  };

  const cfg = STATUS_OVERRIDE[effectiveStatus]
    || STATUS[booking.status]
    || { cls: "pt-muted", label: booking.status, bcard: "checked_out" };

  const fmt = ts => ts?.toDate?.().toLocaleDateString("en-IN") || "—";

  return (
    <div className={`pr-bcard ${cfg.bcard}`}>
      <div className="pr-bcard-head">
        <div>
          <div className="pr-bcard-title">{booking.hostelName}</div>
          <div className="pr-bcard-sub">{booking.roomAc ? "AC" : "Non-AC"} · Capacity {booking.roomCapacity}</div>
        </div>
        <span className={`pt ${cfg.cls}`}>{cfg.label}</span>
      </div>
      <div className="pr-details">
        <div className="pr-detail-item">
          <span className="pr-dl">Guest:</span>
          <span className="pr-dv">{booking.guestName} ({booking.guestRelation})</span>
        </div>
        <div className="pr-detail-item">
          <span className="pr-dl">Phone:</span>
          <span className="pr-dv">{booking.phone}</span>
        </div>
        <div className="pr-detail-item">
          <span className="pr-dl">Check-in:</span>
          <span className="pr-dv">{fmt(booking.checkIn)}</span>
        </div>
        <div className="pr-detail-item">
          <span className="pr-dl">Check-out:</span>
          <span className="pr-dv">{fmt(booking.checkOut)}</span>
        </div>
        <div className="pr-detail-item">
          <span className="pr-dl">Purpose:</span>
          <span className="pr-dv">{booking.purpose}</span>
        </div>
        <div className="pr-detail-item">
          <span className="pr-dl">Requested:</span>
          <span className="pr-dv">{fmt(booking.bookedAt)}</span>
        </div>
      </div>

      {/* Maintenance cancellation note */}
      {isMaintCancelled && (
        <div style={{
          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
          borderRadius: 6, padding: "10px 14px", marginTop: 8,
        }}>
          <div style={{ color: "#f59e0b", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
            🔧 Room taken offline for maintenance
          </div>
          <div style={{ color: "var(--text)", fontSize: 13 }}>
            {booking.wardenNote.replace("Room under maintenance: ", "")}
          </div>
        </div>
      )}

      {/* Admin cancellation note */}
      {isAdminCancelled && (
        <div style={{
          background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
          borderRadius: 6, padding: "10px 14px", marginTop: 8,
        }}>
          <div style={{ color: "#f87171", fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
            ✕ Booking cancelled by administrator
          </div>
          <div style={{ color: "var(--text)", fontSize: 13 }}>
            {booking.wardenNote.replace("Cancelled by admin: ", "")}
          </div>
        </div>
      )}

      {/* Rejection / conditional note */}
      {!isMaintCancelled && !isAdminCancelled && booking.wardenNote && (
        <div className={`pr-warden-note ${booking.status === "rejected" ? "rejected" : ""}`}>
          {booking.status === "rejected" ? "❌ Rejection reason: " : "📋 Condition on arrival: "}
          {booking.wardenNote}
        </div>
      )}

      {/* Book another room — for maintenance cancelled */}
      {onBookAnother && (
        <div style={{ marginTop: 12 }}>
          <button className="pb pb-gold pb-sm" onClick={onBookAnother}>
            🔍 Book Another Room for Same Dates →
          </button>
        </div>
      )}

      {/* Re-apply — for rejected bookings */}
      {onReapply && (
        <div style={{ marginTop: 12 }}>
          <button className="pb pb-gold pb-sm" onClick={onReapply}>
            ↩ Re-apply for this Room
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════
   DOCUMENT VIEWER — reusable across all dashboards
   Import and use: <DocumentViewer docs={booking.documents} />
══════════════════════════════════════ */
export function DocumentViewer({ docs }) {
  const [preview, setPreview] = useState(null);

  if (!docs) return (
    <div style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>
      No documents uploaded
    </div>
  );

  const items = [
    { key: "aadhar",    label: "Aadhar Card",     url: docs.aadhar },
    { key: "collegeId", label: "College ID Card",  url: docs.collegeId },
    { key: "guestId",   label: "Guest's ID Proof", url: docs.guestId },
  ];

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(({ key, label, url }) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: url ? "rgba(74,222,128,0.05)" : "rgba(248,113,113,0.05)",
            border: `1px solid ${url ? "rgba(74,222,128,0.2)" : "rgba(248,113,113,0.15)"}`,
            borderRadius: 6, padding: "8px 14px",
          }}>
            <div style={{ fontSize: 13, color: url ? "var(--text)" : "var(--muted)" }}>
              {url ? "✓" : "✕"} {label}
            </div>
            {url && (
              <div style={{ display: "flex", gap: 8 }}>
                <button className="pb pb-ghost pb-sm"
                  style={{ padding: "4px 12px", fontSize: 12 }}
                  onClick={() => setPreview({ url, label })}>
                  👁 View
                </button>
                <a href={url} target="_blank" rel="noreferrer"
                  className="pb pb-ghost pb-sm"
                  style={{ padding: "4px 12px", fontSize: 12, textDecoration: "none" }}>
                  ⬇ Open
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image preview modal */}
      {preview && (
        <div className="pr-overlay" style={{ zIndex: 9999 }}
          onClick={() => setPreview(null)}>
          <div className="pr-modal pr-a1"
            style={{ maxWidth: 700, width: "90vw" }}
            onClick={e => e.stopPropagation()}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">📎 {preview.label}</div>
              <button className="pr-modal-close" onClick={() => setPreview(null)}>✕</button>
            </div>
            <div className="pr-modal-body" style={{ padding: 0, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={preview.url} alt={preview.label}
                style={{ width: "100%", maxHeight: "70vh", objectFit: "contain",
                  borderRadius: "0 0 8px 8px", display: "block" }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "block"; }}
              />
              <div style={{ display: "none", color: "var(--muted)", fontSize: 13, padding: 24 }}>
                Failed to load image. Try the Download button.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
