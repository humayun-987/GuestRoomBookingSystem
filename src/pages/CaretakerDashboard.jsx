import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";
import { DocumentViewer } from "./StudentDashboard";
import { useNavigate } from "react-router-dom";
const STATUS = {
  approved: { cls: "pt-green", label: "Expected Arrival", bcard: "approved" },
  conditional: { cls: "pt-green", label: "Approved with Condition", bcard: "approved" },
  checked_in: { cls: "pt-purple", label: "Checked In", bcard: "checked_in" },
  checked_out: { cls: "pt-muted", label: "Checked Out", bcard: "checked_out" },
};

export default function CaretakerDashboard() {
  const { user, profile, logout } = useAuth();
  const [tab, setTab] = useState("arrivals");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [passkey, setPasskey] = useState(null);
  const [showPasskey, setShowPasskey] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { injectPortalTheme(); }, []);

  useEffect(() => {
    if (!user?.uid) return;
    (async () => {
      try {
        const q = query(
          collection(db, "invite_codes"),
          where("role", "==", "caretaker"),
          where("usedBy", "==", user.uid)
        );
        const snap = await getDocs(q);
        if (!snap.empty) setPasskey(snap.docs[0].id);
      } catch { /* silent */ }
    })();
  }, [user]);

  const fetchBookings = async () => {
    if (!profile?.hostelId) return;
    setLoading(true);
    try {
      const q = query(collection(db, "bookings"), where("hostelId", "==", profile.hostelId));
      const snap = await getDocs(q);
      setBookings(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (a.checkIn?.toDate?.() || 0) - (b.checkIn?.toDate?.() || 0))
      );
    } catch { message.error("Failed to load bookings"); }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [profile]);

  const filter = (list) => {
    if (!search.trim()) return list;
    const s = search.toLowerCase();
    return list.filter(b =>
      b.guestName?.toLowerCase().includes(s) ||
      b.studentName?.toLowerCase().includes(s) ||
      b.phone?.includes(s)
    );
  };

  const arrivals = filter(bookings.filter(b => b.status === "approved" || b.status === "conditional"));
  const staying  = filter(bookings.filter(b => b.status === "checked_in"));
  const completed = filter(bookings.filter(b => b.status === "checked_out"));

  const checkIn = async (booking) => {
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "checked_in",
        checkedInAt: new Date(),
      });
      message.success("Guest checked in!");
      fetchBookings();
    } catch { message.error("Check-in failed"); }
  };

  const checkOut = async (booking) => {
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status: "checked_out",
        checkedOutAt: new Date(),
      });
      message.success("Guest checked out!");
      fetchBookings();
    } catch { message.error("Check-out failed"); }
  };

  const verifyPayment = async (booking) => {
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        paymentStatus: "verified",
        paymentVerifiedAt: new Date(),
      });
      message.success("Payment verified — check-in is now unlocked!");
      fetchBookings();
    } catch { message.error("Verification failed. Please try again."); }
  };

  return (
    <div className="pr">
      <div className="pr-bg" />

      <div className="pr-topbar">
        <div>
          <div className="pr-brand">IITK <span>Guest Rooms</span></div>
          <div className="pr-brand-sub">Caretaker Portal</div>
        </div>
        <div className="pr-topbar-right">
          <button className="pr-logout" onClick={() => navigate("/")}>Home</button>
          <button className="pr-logout" onClick={logout}>Sign Out</button>
        </div>
      </div>

      <div className="pr-body">
        <div className="pr-page-header pr-a1">
          <div style={{
            marginBottom: 16, padding: "10px 14px", borderRadius: 6,
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div style={{ lineHeight: 1.2 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>{profile?.name}</span>
              <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>{profile?.hostelName}</span>
            </div>
            <span style={{
              fontSize: 11, color: "#4ade80",
              background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)",
              padding: "3px 8px", borderRadius: 999,
            }}>● Active</span>
          </div>
          <div className="pr-eyebrow">Caretaker Portal</div>
          <h1 className="pr-page-title">Guest Management</h1>
          <p className="pr-page-sub">{profile?.hostelName} — manage arrivals, check-ins and check-outs</p>
        </div>

        {passkey && (
          <div className="pr-card pr-a1" style={{ maxWidth: 480, marginBottom: 28, border: "1px solid rgba(201,168,76,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>
                  Your Admin Passkey
                </div>
                <div style={{
                  fontFamily: "monospace", fontSize: 20, letterSpacing: 3,
                  color: showPasskey ? "var(--gold)" : "var(--muted)",
                  filter: showPasskey ? "none" : "blur(6px)",
                  userSelect: showPasskey ? "text" : "none",
                  transition: "filter 0.2s",
                }}>
                  {passkey}
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                  Use this to unlock hostel management in the Admin panel
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="pb pb-ghost pb-sm" onClick={() => setShowPasskey(s => !s)}>
                  {showPasskey ? "🙈 Hide" : "👁 Show"}
                </button>
                {showPasskey && (
                  <button className="pb pb-ghost pb-sm"
                    onClick={() => { navigator.clipboard.writeText(passkey); message.success("Copied!"); }}>
                    📋 Copy
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="pr-stats pr-a2">
          {[
            { num: arrivals.length,  label: "Expected Arrivals",  color: "#4ade80" },
            { num: staying.length,   label: "Currently Staying",  color: "#a78bfa" },
            { num: completed.length, label: "Completed Stays",    color: "var(--muted)" },
          ].map(({ num, label, color }) => (
            <div key={label} className="pr-stat">
              <div className="pr-stat-num" style={{ color }}>{num}</div>
              <div className="pr-stat-label">{label}</div>
            </div>
          ))}
        </div>

        {!profile?.hostelId ? (
          <div className="pr-card" style={{ color: "#f87171" }}>
            No hostel assigned to your account. Contact the administrator.
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 20 }} className="pr-a2">
              <input className="pr-search"
                placeholder="Search by guest name, student name, or phone…"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="pr-tabs pr-a2">
              {[
                { key: "arrivals",  label: "Expected Arrivals",  count: arrivals.length },
                { key: "staying",   label: "Currently Staying",  count: staying.length },
                { key: "completed", label: "Completed",          count: null },
              ].map(t => (
                <button key={t.key}
                  className={`pr-tab ${tab === t.key ? "active" : ""}`}
                  onClick={() => setTab(t.key)}>
                  {t.label}
                  {t.count > 0 && <span className="pr-badge">{t.count}</span>}
                </button>
              ))}
            </div>

            <div className="pr-a3">
              {tab === "arrivals" && (loading
                ? <div className="pr-spin" />
                : arrivals.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">✈️</div>No expected arrivals</div>
                  : arrivals.map(b => (
                    <GuestCard key={b.id} booking={b} action="checkin"
                      onAction={checkIn} onVerifyPayment={verifyPayment} />
                  ))
              )}
              {tab === "staying" && (loading
                ? <div className="pr-spin" />
                : staying.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">🏠</div>No guests currently staying</div>
                  : staying.map(b => (
                    <GuestCard key={b.id} booking={b} action="checkout"
                      onAction={checkOut} onVerifyPayment={null} />
                  ))
              )}
              {tab === "completed" && (loading
                ? <div className="pr-spin" />
                : completed.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">✅</div>No completed stays</div>
                  : completed.map(b => (
                    <GuestCard key={b.id} booking={b} action="none" onVerifyPayment={null} />
                  ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function GuestCard({ booking, action, onAction, onVerifyPayment }) {
  const [busy, setBusy]           = useState(false);
  const [verifyBusy, setVerifyBusy] = useState(false);
  const [popConfirm, setPopConfirm] = useState(false);
  const [proofModal, setProofModal] = useState(false);

  const cfg = STATUS[booking.status] || { cls: "pt-muted", label: booking.status, bcard: "checked_out" };
  const fmt     = ts => ts?.toDate?.().toLocaleDateString("en-IN") || "—";
  const fmtFull = ts => ts?.toDate?.().toLocaleString("en-IN") || "—";

  const payStatus = booking.paymentStatus;   // undefined | "pending_verification" | "verified"
  const proof     = booking.paymentProof;
  const paymentVerified = payStatus === "verified";
  const proofPending    = payStatus === "pending_verification";

  const handleAction = async () => {
    setBusy(true);
    await onAction(booking);
    setBusy(false);
    setPopConfirm(false);
  };

  const handleVerify = async () => {
    setVerifyBusy(true);
    await onVerifyPayment(booking);
    setVerifyBusy(false);
  };

  return (
    <>
      <div className={`pr-bcard ${action === "checkin" ? "approved" : action === "checkout" ? "checked_in" : "checked_out"}`}>
        <div className="pr-bcard-head">
          <div>
            <div className="pr-bcard-title">{booking.guestName}</div>
            <div className="pr-bcard-sub">{booking.guestRelation} of {booking.studentName}</div>
          </div>
          <span className={`pt ${cfg.cls}`}>{cfg.label}</span>
        </div>

        <div className="pr-details">
          <div className="pr-detail-item"><span className="pr-dl">Phone:</span><span className="pr-dv">{booking.phone}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Purpose:</span><span className="pr-dv">{booking.purpose}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Check-in:</span><span className="pr-dv">{fmt(booking.checkIn)}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Check-out:</span><span className="pr-dv">{fmt(booking.checkOut)}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Room:</span><span className="pr-dv">{booking.roomAc ? "AC" : "Non-AC"} · Cap {booking.roomCapacity}</span></div>
          {booking.roomRate > 0 && (
            <div className="pr-detail-item">
              <span className="pr-dl">Amount Due:</span>
              <span className="pr-dv" style={{ color: "var(--gold)", fontWeight: 600 }}>
                ₹{booking.roomRate}/night
              </span>
            </div>
          )}
          {booking.checkedInAt && (
            <div className="pr-detail-item"><span className="pr-dl">Arrived:</span><span className="pr-dv">{fmtFull(booking.checkedInAt)}</span></div>
          )}
          {booking.checkedOutAt && (
            <div className="pr-detail-item"><span className="pr-dl">Departed:</span><span className="pr-dv">{fmtFull(booking.checkedOutAt)}</span></div>
          )}
        </div>

        {booking.wardenNote && (
          <div className="pr-warden-note">
            {booking.status === "conditional" ? "📋 Condition to verify: " : "💬 Warden: "}
            {booking.wardenNote}
          </div>
        )}

        {/* Documents */}
        <div style={{ marginTop: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>
            Submitted Documents
          </div>
          <DocumentViewer docs={booking.documents} />
        </div>

        {/* ── Payment Status Section (arrivals only) ── */}
        {action === "checkin" && (
          <div style={{ marginTop: 12 }}>

            {/* VERIFIED */}
            {paymentVerified && (
              <div style={{
                background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.25)",
                borderRadius: 8, padding: "12px 16px", marginBottom: 10,
              }}>
                <div style={{ color: "#4ade80", fontWeight: 600, fontSize: 13, marginBottom: proof ? 6 : 0 }}>
                  ✅ Payment Verified — Check-In Unlocked
                </div>
                {proof && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 20px" }}>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>Ref: <strong style={{ color: "var(--text)" }}>{proof.txnRef}</strong></span>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>₹{proof.amountPaid} · {proof.date}</span>
                    {proof.screenshotUrl && (
                      <a href={proof.screenshotUrl} target="_blank" rel="noreferrer"
                        style={{ fontSize: 12, color: "var(--gold)", textDecoration: "underline" }}>
                        View Receipt ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* PENDING VERIFICATION */}
            {proofPending && !paymentVerified && (
              <div style={{
                background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 8, padding: "14px 16px", marginBottom: 10,
              }}>
                <div style={{
                  fontSize: 11, color: "var(--gold)", textTransform: "uppercase",
                  letterSpacing: 1, fontWeight: 700, marginBottom: 10,
                }}>
                  💳 Payment Proof Submitted — Verify Before Check-In
                </div>
                {proof && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 110 }}>Transaction Ref:</span>
                      <span style={{ fontSize: 13, color: "var(--text)", fontFamily: "monospace", fontWeight: 600 }}>{proof.txnRef}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 110 }}>Date of Payment:</span>
                      <span style={{ fontSize: 13, color: "var(--text)" }}>{proof.date}</span>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 110 }}>Amount Paid:</span>
                      <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600 }}>₹{proof.amountPaid}</span>
                    </div>
                    {proof.screenshotUrl && (
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "var(--muted)", minWidth: 110 }}>Payment Screenshot:</span>
                        <button className="pb pb-ghost pb-sm" style={{ padding: "3px 12px", fontSize: 12 }}
                          onClick={() => setProofModal(true)}>
                          👁 View Screenshot
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <button
                  className="pb pb-gold pb-sm"
                  style={{ width: "100%", marginTop: 4 }}
                  disabled={verifyBusy}
                  onClick={handleVerify}
                >
                  {verifyBusy ? "Verifying…" : "✓ Mark as Verified & Unlock Check-In"}
                </button>
              </div>
            )}

            {/* NO PAYMENT PROOF */}
            {!payStatus && (
              <div style={{
                background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: 8, padding: "10px 14px", marginBottom: 10,
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{ fontSize: 16 }}>⏳</span>
                <div>
                  <div style={{ fontSize: 13, color: "#f59e0b", fontWeight: 600 }}>Awaiting Payment Proof</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                    Student has not submitted payment proof yet. Check-in is locked.
                  </div>
                </div>
              </div>
            )}

            {/* CHECK-IN BUTTON */}
            <div style={{ position: "relative" }}>
              <button
                className="pb pb-green pb-sm"
                disabled={busy || !paymentVerified}
                onClick={() => paymentVerified && setPopConfirm(true)}
                style={{
                  opacity: !paymentVerified ? 0.45 : 1,
                  cursor: !paymentVerified ? "not-allowed" : "pointer",
                }}
                title={!paymentVerified ? "Payment must be verified before check-in" : ""}
              >
                ✓ Check In Guest
              </button>
              {!paymentVerified && (
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 5 }}>
                  🔒 Requires payment verification
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHECK-OUT BUTTON */}
        {action === "checkout" && (
          <button className="pb pb-purple pb-sm" disabled={busy} onClick={() => setPopConfirm(true)}>
            → Check Out Guest
          </button>
        )}
      </div>

      {/* Confirm popup */}
      {popConfirm && (
        <div className="pr-pop">
          <div className="pr-pop-box pr-a1">
            <div className="pr-pop-title">
              {action === "checkin" ? `Check in ${booking.guestName}?` : `Check out ${booking.guestName}?`}
            </div>
            <div className="pr-pop-desc">
              {action === "checkin"
                ? "Verify guest ID and documents before confirming."
                : "This will close the booking. The room is immediately freed for new bookings."}
            </div>
            <div className="pr-pop-actions">
              <button className="pb pb-ghost pb-sm" onClick={() => setPopConfirm(false)}>Cancel</button>
              <button
                className={`pb pb-sm ${action === "checkin" ? "pb-green" : "pb-purple"}`}
                disabled={busy} onClick={handleAction}
              >
                {busy ? "…" : action === "checkin" ? "Confirm Check-in" : "Confirm Check-out"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment screenshot modal */}
      {proofModal && proof?.screenshotUrl && (
        <div className="pr-overlay" style={{ zIndex: 9999 }} onClick={() => setProofModal(false)}>
          <div className="pr-modal pr-a1" style={{ maxWidth: 700, width: "90vw" }}
            onClick={e => e.stopPropagation()}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">💳 Payment Screenshot — {booking.guestName}</div>
              <button className="pr-modal-close" onClick={() => setProofModal(false)}>✕</button>
            </div>
            <div className="pr-modal-body" style={{ padding: 0 }}>
              <img
                src={proof.screenshotUrl}
                alt="Payment Receipt"
                style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block", borderRadius: "0 0 8px 8px" }}
              />
            </div>
            <div className="pr-modal-footer">
              <a href={proof.screenshotUrl} target="_blank" rel="noreferrer"
                className="pb pb-gold pb-sm" style={{ textDecoration: "none" }}>
                ⬇ Download
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
