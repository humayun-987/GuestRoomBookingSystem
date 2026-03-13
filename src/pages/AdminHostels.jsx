import { useEffect, useState } from "react";
import {
  collection, addDoc, setDoc, getDocs,
  doc, updateDoc, deleteDoc, query, where, writeBatch,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import { useAuth } from "./AuthContext.jsx";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";
import { DocumentViewer } from "./StudentDashboard";

/* ─────────────────────────────────────────────────────────────
   SUPER ADMIN PASSKEY — hardcoded, never stored in database.
   Only share this with the designated super administrator.
   Change this string before production deployment.
───────────────────────────────────────────────────────────── */
const SUPER_ADMIN_KEY = "IITK-GRMS-SA-2025";

export default function AdminHostels() {
  const { logout } = useAuth();
  const [hostels, setHostels]             = useState([]);
  const [tab, setTab]                     = useState("rooms");
  const [newHostelName, setNewHostelName] = useState("");
  const [loading, setLoading]             = useState(false);

  // Session-based unlock: Set of hostelIds unlocked this session
  const [unlockedHostels, setUnlockedHostels] = useState(new Set());
  const unlockHostel = (id) => setUnlockedHostels(prev => new Set([...prev, id]));
  const lockHostel   = (id) => setUnlockedHostels(prev => { const s = new Set(prev); s.delete(id); return s; });
  const isUnlocked   = (id) => unlockedHostels.has(id);

  // Super admin — verified once per session via hardcoded passkey, never persisted
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => { injectPortalTheme(); }, []);

  const fetchHostels = async () => {
    try {
      const snap = await getDocs(collection(db, "hostels"));
      setHostels(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch { message.error("Failed to fetch hostels"); }
  };

  useEffect(() => { fetchHostels(); }, []);

  const addHostel = async () => {
    if (!newHostelName.trim()) { message.error("Hostel name required"); return; }
    setLoading(true);
    try {
      await addDoc(collection(db, "hostels"), { name: newHostelName.trim(), createdAt: new Date() });
      message.success("Hostel added");
      setNewHostelName("");
      fetchHostels();
    } catch { message.error("Failed to add hostel"); }
    setLoading(false);
  };

  return (
    <div className="pr">
      <div className="pr-bg" />

      <div className="pr-topbar">
        <div>
          <div className="pr-brand">IITK <span>Guest Rooms</span></div>
          <div className="pr-brand-sub">Admin Portal</div>
        </div>
        <div className="pr-topbar-right">
          <div style={{ textAlign: "right" }}>
            <div className="pr-user-name">
              Administrator
              {isSuperAdmin && (
                <span style={{
                  marginLeft: 8, fontSize: 10,
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  color: "var(--gold)", padding: "2px 8px",
                  borderRadius: 20, letterSpacing: 1,
                  verticalAlign: "middle",
                }}>SUPER ADMIN</span>
              )}
            </div>
            <div className="pr-user-role">Full Access</div>
          </div>
          <button className="pr-logout" onClick={() => { setIsSuperAdmin(false); logout(); }}>Sign Out</button>
        </div>
      </div>

      <div className="pr-body">
        <div className="pr-page-header pr-a1">
          <div className="pr-eyebrow">Admin Portal</div>
          <h1 className="pr-page-title">System Management</h1>
          <p className="pr-page-sub">Manage hostels, monitor bookings, and generate staff access codes</p>
        </div>

        <div className="pr-tabs pr-a2">
          {[
            { key: "rooms",    label: "Room Management" },
            { key: "bookings", label: "All Bookings" },
            { key: "invites",  label: "Invite Codes" },
          ].map(t => (
            <button key={t.key}
              className={`pr-tab ${tab === t.key ? "active" : ""}`}
              onClick={() => setTab(t.key)}>
              {t.label}
              {/* Lock icon on Invite Codes when super admin not verified */}
              {t.key === "invites" && !isSuperAdmin && (
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.6 }}>🔒</span>
              )}
            </button>
          ))}
        </div>

        <div className="pr-a3">
          {tab === "rooms" && (
            <RoomManagement
              hostels={hostels} newHostelName={newHostelName}
              setNewHostelName={setNewHostelName} addHostel={addHostel}
              loading={loading} fetchHostels={fetchHostels}
              isUnlocked={isUnlocked} unlockHostel={unlockHostel} lockHostel={lockHostel}
            />
          )}
          {tab === "bookings" && <BookingsPanel hostels={hostels} />}
          {tab === "invites" && (
            isSuperAdmin
              ? <InviteCodesPanel hostels={hostels} />
              : <SuperAdminGate onVerified={() => setIsSuperAdmin(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SUPER ADMIN GATE
   Shown in place of Invite Codes tab until passkey verified.
   Passkey lives only in this source file — never in database.
══════════════════════════════════════════════════════════ */
function SuperAdminGate({ onVerified }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy]   = useState(false);
  const [show, setShow]   = useState(false);

  const verify = () => {
    if (!input.trim()) { setError("Enter the super admin passkey"); return; }
    setBusy(true);
    // Artificial 600ms delay — prevents instant brute-force guessing
    setTimeout(() => {
      if (input.trim() === SUPER_ADMIN_KEY) {
        message.success("Super admin access granted for this session");
        onVerified();
      } else {
        setError("Incorrect passkey. This area is restricted to super administrators only.");
        setInput("");
      }
      setBusy(false);
    }, 600);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 48 }}>
      <div style={{
        background: "rgba(13,27,42,0.8)",
        border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 12, padding: "44px 52px",
        maxWidth: 460, width: "100%", textAlign: "center",
      }}>
        {/* Icon */}
        <div style={{
          width: 68, height: 68, borderRadius: "50%",
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.2)",
          display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 30,
          margin: "0 auto 24px",
        }}>🔐</div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 26, fontWeight: 600,
          color: "var(--cream)", marginBottom: 8,
        }}>Restricted Area</div>

        <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75, marginBottom: 32 }}>
          The <strong style={{ color: "var(--text)" }}>Invite Codes</strong> section contains
          staff passkeys and access codes. It is only accessible to the{" "}
          <strong style={{ color: "var(--gold)" }}>Super Administrator</strong>.
          <br /><br />
          Enter the super admin passkey to continue.
        </div>

        <div className="pr-field" style={{ textAlign: "left" }}>
          <label className="pr-label">Super Admin Passkey</label>
          <div className="pr-input-wrap">
            <input
              className="pr-input"
              type={show ? "text" : "password"}
              placeholder="Enter passkey"
              value={input}
              onChange={e => { setInput(e.target.value); setError(""); }}
              onKeyDown={e => e.key === "Enter" && !busy && verify()}
              style={{ paddingRight: 42, letterSpacing: show ? 2 : 4 }}
            />
            <button type="button" className="pr-input-icon" onClick={() => setShow(s => !s)}>
              {show ? "🙈" : "👁"}
            </button>
          </div>
          {error && (
            <div style={{ color: "#f87171", fontSize: 12, marginTop: 8, display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0 }}>⚠</span> {error}
            </div>
          )}
        </div>

        <button
          className="pb pb-gold pb-full pb-lg"
          style={{ marginTop: 8 }}
          disabled={busy}
          onClick={verify}
        >
          {busy ? "Verifying…" : "Unlock Invite Codes →"}
        </button>

        <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 16, opacity: 0.6 }}>
          Access is granted for this session only and clears on sign-out.
        </div>
      </div>
    </div>
  );
}

/* ── Room Management ── */
function RoomManagement({ hostels, newHostelName, setNewHostelName, addHostel, loading, fetchHostels, isUnlocked, unlockHostel, lockHostel }) {
  return (
    <>
      <div style={{
        background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.18)",
        borderRadius: 6, padding: "10px 16px", marginBottom: 24,
        fontSize: 13, color: "var(--gold)",
      }}>
        🔑 Each hostel requires its caretaker's <strong>passkey</strong> to unlock for editing.
        Passkeys are visible on the Caretaker dashboard. Unlocks last for the current session only.
      </div>

      <div className="pr-card" style={{ maxWidth: 440, marginBottom: 28 }}>
        <div className="pr-card-title">Add New Hostel</div>
        <div style={{ display: "flex", gap: 10 }}>
          <input className="pr-input" placeholder="Hostel name e.g. Hall 7"
            value={newHostelName} onChange={e => setNewHostelName(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addHostel()}
            style={{ flex: 1 }} />
          <button className="pb pb-gold" disabled={loading} onClick={addHostel}>
            {loading ? "…" : "+ Add"}
          </button>
        </div>
      </div>

      {hostels.length === 0 && (
        <div className="pr-empty"><div className="pr-empty-icon">🏠</div>No hostels added yet</div>
      )}
      {hostels.map(h => (
        <HostelCard key={h.id} hostel={h} refresh={fetchHostels}
          unlocked={isUnlocked(h.id)}
          onUnlock={() => unlockHostel(h.id)}
          onLock={() => lockHostel(h.id)} />
      ))}
    </>
  );
}

function HostelCard({ hostel, refresh, unlocked, onUnlock, onLock }) {
  const [rooms, setRooms]     = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]       = useState(false);
  const [delPop, setDelPop]       = useState(false);
  const [delStep, setDelStep]     = useState("passkey"); // "passkey" | "confirm"
  const [delKey, setDelKey]       = useState("");
  const [delKeyError, setDelKeyError] = useState("");
  const [delKeyBusy, setDelKeyBusy]   = useState(false);

  const [passkeyInput, setPasskeyInput] = useState("");
  const [passkeyError, setPasskeyError] = useState("");
  const [verifying, setVerifying]       = useState(false);

  const verifyPasskey = async () => {
    if (!passkeyInput.trim()) { setPasskeyError("Please enter the passkey"); return; }
    setVerifying(true);
    setPasskeyError("");
    try {
      const snap = await getDocs(
        query(collection(db, "invite_codes"),
          where("hostelId", "==", hostel.id),
          where("role", "==", "caretaker"))
      );
      const match = snap.docs.find(d => d.id === passkeyInput.trim().toUpperCase());
      if (match) {
        onUnlock();
        setPasskeyInput("");
        setPasskeyError("");
        message.success(`${hostel.name} unlocked for this session`);
      } else {
        setPasskeyError("Incorrect passkey. Check the caretaker's dashboard for the correct code.");
      }
    } catch { setPasskeyError("Verification failed. Please try again."); }
    setVerifying(false);
  };

  const [maintModal, setMaintModal]             = useState(null);
  const [maintNote, setMaintNote]               = useState("");
  const [maintDays, setMaintDays]               = useState(1);
  const [affectedBookings, setAffectedBookings] = useState([]);
  const [checkingBookings, setCheckingBookings] = useState(false);
  const [maintBusy, setMaintBusy]               = useState(false);
  const [turnOffPop, setTurnOffPop]             = useState(null);

  const fetchRooms = async () => {
    const snap = await getDocs(collection(db, "hostels", hostel.id, "rooms"));
    const roomData = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    const now = new Date();
    const batch = writeBatch(db);
    let autoOff = 0;
    roomData.forEach(r => {
      if (r.maintenance === true && r.maintenanceTo) {
        const to = r.maintenanceTo?.toDate?.() ?? new Date(r.maintenanceTo);
        if (to < now) {
          batch.update(doc(db, "hostels", hostel.id, "rooms", r.id), {
            maintenance: false, maintenanceNote: "", maintenanceFrom: null,
            maintenanceTo: null, maintenanceDays: null,
          });
          r.maintenance = false;
          autoOff++;
        }
      }
    });
    if (autoOff > 0) await batch.commit();
    setRooms(roomData);
  };

  useEffect(() => { fetchRooms(); }, []);

  const checkAffectedBookings = async (room, days) => {
    if (!days || days < 1) { setAffectedBookings([]); return; }
    setCheckingBookings(true);
    try {
      const maintFrom = new Date(); maintFrom.setHours(0, 0, 0, 0);
      const maintTo = new Date(maintFrom);
      maintTo.setDate(maintTo.getDate() + Number(days));
      const q = query(collection(db, "bookings"),
        where("roomId", "==", room.id),
        where("status", "in", ["pending", "approved", "conditional", "checked_in"])
      );
      const snap = await getDocs(q);
      const all = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setAffectedBookings(all.filter(b => {
        const bIn  = b.checkIn?.toDate?.()  ?? new Date(b.checkIn);
        const bOut = b.checkOut?.toDate?.() ?? new Date(b.checkOut);
        return bIn < maintTo && bOut > maintFrom;
      }));
    } catch { setAffectedBookings([]); }
    setCheckingBookings(false);
  };

  const handleMaintenanceToggle = async (room) => {
    if (room.maintenance === true) { setTurnOffPop(room); return; }
    setMaintNote(""); setMaintDays(1);
    setMaintModal(room);
    await checkAffectedBookings(room, 1);
  };

  const handleDaysChange = async (days) => {
    setMaintDays(days);
    if (maintModal) await checkAffectedBookings(maintModal, days);
  };

  const confirmMaintenance = async () => {
    if (!maintNote.trim()) { message.error("Please provide a maintenance reason"); return; }
    if (!maintDays || maintDays < 1) { message.error("Please set a valid number of days"); return; }
    setMaintBusy(true);
    try {
      const maintFrom = new Date(); maintFrom.setHours(0, 0, 0, 0);
      const maintTo = new Date(maintFrom);
      maintTo.setDate(maintTo.getDate() + Number(maintDays));
      const batch = writeBatch(db);
      affectedBookings.forEach(b => {
        batch.update(doc(db, "bookings", b.id), {
          status: "cancelled",
          wardenNote: `Room under maintenance: ${maintNote.trim()}`,
          cancelledAt: new Date(),
        });
      });
      batch.update(doc(db, "hostels", hostel.id, "rooms", maintModal.id), {
        maintenance: true, maintenanceNote: maintNote.trim(),
        maintenanceFrom: maintFrom, maintenanceTo: maintTo,
        maintenanceDays: Number(maintDays),
      });
      await batch.commit();
      setRooms(prev => prev.map(r =>
        r.id === maintModal.id
          ? { ...r, maintenance: true, maintenanceNote: maintNote.trim(),
              maintenanceFrom: maintFrom, maintenanceTo: maintTo, maintenanceDays: Number(maintDays) }
          : r
      ));
      message.success(
        affectedBookings.length > 0
          ? `Maintenance enabled for ${maintDays} day(s). ${affectedBookings.length} booking(s) cancelled.`
          : `Maintenance enabled for ${maintDays} day(s).`
      );
      setMaintModal(null);
    } catch { message.error("Failed to enable maintenance"); }
    setMaintBusy(false);
  };

  const confirmTurnOff = async () => {
    try {
      await updateDoc(doc(db, "hostels", hostel.id, "rooms", turnOffPop.id), {
        maintenance: false, maintenanceNote: "",
        maintenanceFrom: null, maintenanceTo: null, maintenanceDays: null,
      });
      setRooms(prev => prev.map(r =>
        r.id === turnOffPop.id
          ? { ...r, maintenance: false, maintenanceNote: "",
              maintenanceFrom: null, maintenanceTo: null, maintenanceDays: null }
          : r
      ));
      message.success("Maintenance cleared — room is active again");
      setTurnOffPop(null);
    } catch { message.error("Failed to clear maintenance"); }
  };

  const addRoom = async () => {
    try {
      const ref = await addDoc(collection(db, "hostels", hostel.id, "rooms"),
        { capacity: 2, ac: false, maintenance: false, createdAt: new Date() });
      setRooms(prev => [...prev, { id: ref.id, capacity: 2, ac: false, maintenance: false }]);
      message.success("Room added");
    } catch { message.error("Failed to add room"); }
  };

  const updateRoom = async (id, changes) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...changes } : r));
    try { await updateDoc(doc(db, "hostels", hostel.id, "rooms", id), changes); }
    catch { message.error("Update failed"); fetchRooms(); }
  };

  const deleteRoom = async (id) => {
    try {
      await deleteDoc(doc(db, "hostels", hostel.id, "rooms", id));
      setRooms(prev => prev.filter(r => r.id !== id));
      message.success("Room deleted");
    } catch { message.error("Delete failed"); }
  };

  const deleteHostel = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "hostels", hostel.id, "rooms"));
      for (const r of snap.docs) await deleteDoc(doc(db, "hostels", hostel.id, "rooms", r.id));
      await deleteDoc(doc(db, "hostels", hostel.id));
      message.success("Hostel deleted");
      refresh();
    } catch { message.error("Delete failed"); }
    setLoading(false);
    setDelPop(false);
  };

  const verifyDelPasskey = async () => {
    if (!delKey.trim()) { setDelKeyError("Please enter the passkey"); return; }
    setDelKeyBusy(true);
    setDelKeyError("");
    try {
      const snap = await getDocs(
        query(collection(db, "invite_codes"),
          where("hostelId", "==", hostel.id),
          where("role", "==", "caretaker"))
      );
      const match = snap.docs.find(d => d.id === delKey.trim().toUpperCase());
      if (match) {
        setDelStep("confirm");
        setDelKeyError("");
      } else {
        setDelKeyError("Incorrect passkey. Check the caretaker dashboard for the correct code.");
      }
    } catch { setDelKeyError("Verification failed. Please try again."); }
    setDelKeyBusy(false);
  };

  const fmt = ts => ts?.toDate?.().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) || "—";
  const maintenanceCount = rooms.filter(r => r.maintenance === true).length;

  return (
    <>
      <div className="pr-accordion">
        <div className={`pr-accordion-head ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
          <div className="pr-accordion-title">
            {hostel.name}
            <span className="pt pt-muted">{rooms.length} rooms</span>
            {maintenanceCount > 0 && <span className="pt pt-amber">{maintenanceCount} under maintenance</span>}
            {unlocked ? <span className="pt pt-green">🔓 Unlocked</span> : <span className="pt pt-muted">🔒 Locked</span>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {unlocked && (
              <button className="pb pb-ghost pb-sm"
                onClick={e => { e.stopPropagation(); onLock(); message.info(`${hostel.name} locked`); }}>
                🔒 Lock
              </button>
            )}
            <button className="pb pb-red pb-sm" disabled={loading}
              onClick={e => {
                e.stopPropagation();
                setDelStep("passkey");
                setDelKey("");
                setDelKeyError("");
                setDelPop(true);
              }}>
              Delete Hostel
            </button>
            <span className={`pr-chevron ${open ? "open" : ""}`}>▼</span>
          </div>
        </div>

        {open && (
          <div className="pr-accordion-body">
            {!unlocked ? (
              <div style={{ padding: "8px 0 16px" }}>
                <div style={{
                  background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 8, padding: "20px 24px", maxWidth: 420,
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: "var(--cream)", marginBottom: 6 }}>
                    🔒 Passkey Required
                  </div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                    Enter the caretaker passkey for <strong style={{ color: "var(--text)" }}>{hostel.name}</strong> to unlock management for this session.
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input className="pr-input" placeholder="e.g. CARETAKER-A3F9K2"
                      value={passkeyInput}
                      onChange={e => { setPasskeyInput(e.target.value.toUpperCase()); setPasskeyError(""); }}
                      onKeyDown={e => e.key === "Enter" && verifyPasskey()}
                      style={{ flex: 1, fontFamily: "monospace", letterSpacing: 2 }} />
                    <button className="pb pb-gold" disabled={verifying} onClick={verifyPasskey}>
                      {verifying ? "…" : "Unlock →"}
                    </button>
                  </div>
                  {passkeyError && (
                    <div style={{ color: "#f87171", fontSize: 13, marginTop: 10 }}>⚠ {passkeyError}</div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <button className="pb pb-ghost pb-sm" onClick={addRoom}>+ Add Room</button>
                </div>
                {rooms.length === 0 && <p style={{ color: "var(--muted)", fontSize: 13 }}>No rooms yet.</p>}
                {rooms.map((room, i) => {
                  const maintTo  = room.maintenanceTo?.toDate?.();
                  const daysLeft = maintTo ? Math.max(0, Math.ceil((maintTo - new Date()) / 86400000)) : null;
                  return (
                    <div key={room.id} className="pr-card" style={{ marginBottom: 10, padding: "14px 20px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 15, color: "var(--cream)", fontWeight: 600 }}>
                          Room {i + 1}
                        </span>
                        <button className="pb pb-red pb-sm" style={{ padding: "4px 10px", fontSize: 11 }}
                          onClick={() => deleteRoom(room.id)}>✕</button>
                      </div>
                      <div className="pr-room-controls">
                        <div className="pr-control">
                          <span>Capacity:</span>
                          <input type="number" className="pr-number" min={1} max={20} value={room.capacity}
                            onChange={e => updateRoom(room.id, { capacity: parseInt(e.target.value) || 1 })} />
                        </div>
                        <div className="pr-control">
                          <span>AC:</span>
                          <button className={`pr-toggle ${room.ac ? "on" : "off"}`}
                            onClick={() => updateRoom(room.id, { ac: !room.ac })} />
                          <span style={{ color: room.ac ? "var(--gold)" : "var(--muted)" }}>{room.ac ? "Yes" : "No"}</span>
                        </div>
                        <div className="pr-control">
                          <span>Maintenance:</span>
                          <button className={`pr-toggle ${room.maintenance === true ? "on" : "off"}`}
                            onClick={() => handleMaintenanceToggle(room)} />
                          <span style={{ color: room.maintenance === true ? "#f59e0b" : "var(--muted)" }}>
                            {room.maintenance === true ? "Active" : "Off"}
                          </span>
                        </div>
                      </div>
                      {room.maintenance === true && (
                        <div style={{
                          background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.25)",
                          borderRadius: 6, padding: "10px 14px", marginTop: 12,
                          display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12,
                        }}>
                          <div>
                            <div style={{ color: "#f59e0b", fontWeight: 600, fontSize: 13, marginBottom: 3 }}>
                              🔧 Under Maintenance
                              {daysLeft !== null && (
                                <span style={{ fontWeight: 400, marginLeft: 8 }}>
                                  · {daysLeft > 0 ? `${daysLeft} day(s) remaining` : "ends today"}
                                </span>
                              )}
                            </div>
                            {room.maintenanceNote && (
                              <div style={{ fontSize: 13, color: "var(--text)" }}>{room.maintenanceNote}</div>
                            )}
                            {maintTo && (
                              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>
                                {fmt(room.maintenanceFrom)} → {fmt(room.maintenanceTo)}
                                {" · "}auto-clears on {fmt(room.maintenanceTo)}
                              </div>
                            )}
                          </div>
                          <button className="pb pb-ghost pb-sm" style={{ flexShrink: 0 }}
                            onClick={() => setTurnOffPop(room)}>Turn Off Early</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>

      {delPop && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1" style={{ maxWidth: 440 }}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">
                {delStep === "passkey" ? "🔑 Verify Passkey" : "🗑 Delete Hostel"}
              </div>
              <button className="pr-modal-close" onClick={() => setDelPop(false)}>✕</button>
            </div>
            <div className="pr-modal-body">
              {/* Hostel summary */}
              <div style={{
                background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: 6, padding: "10px 14px", marginBottom: 20,
              }}>
                <div style={{ color: "var(--cream)", fontWeight: 600 }}>{hostel.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  {rooms.length} room{rooms.length !== 1 ? "s" : ""} · all data will be permanently deleted
                </div>
              </div>

              {delStep === "passkey" ? (
                <>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                    Enter the caretaker passkey for{" "}
                    <strong style={{ color: "var(--text)" }}>{hostel.name}</strong>{" "}
                    to authorise deletion.
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Passkey</label>
                    <input
                      className="pr-input"
                      placeholder="e.g. CARETAKER-A3F9K2"
                      value={delKey}
                      onChange={e => { setDelKey(e.target.value.toUpperCase()); setDelKeyError(""); }}
                      onKeyDown={e => e.key === "Enter" && !delKeyBusy && verifyDelPasskey()}
                      style={{ fontFamily: "monospace", letterSpacing: 2 }}
                    />
                    {delKeyError && (
                      <div style={{ color: "#f87171", fontSize: 12, marginTop: 8 }}>⚠ {delKeyError}</div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>
                  ✅ Passkey verified.<br /><br />
                  <span style={{ color: "#f87171" }}>This action cannot be undone.</span>{" "}
                  All rooms and associated data for{" "}
                  <strong style={{ color: "var(--text)" }}>{hostel.name}</strong>{" "}
                  will be permanently deleted.
                </div>
              )}
            </div>
            <div className="pr-modal-footer">
              <button className="pb pb-ghost pb-sm" onClick={() => setDelPop(false)}>Cancel</button>
              {delStep === "passkey" ? (
                <button className="pb pb-gold pb-sm" disabled={delKeyBusy} onClick={verifyDelPasskey}>
                  {delKeyBusy ? "Verifying…" : "Verify →"}
                </button>
              ) : (
                <button className="pb pb-red pb-sm" disabled={loading} onClick={deleteHostel}>
                  {loading ? "Deleting…" : "Yes, Delete Permanently"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {turnOffPop && (
        <div className="pr-pop">
          <div className="pr-pop-box pr-a1">
            <div className="pr-pop-title">Turn off maintenance early?</div>
            <div className="pr-pop-desc">
              The room will become available to students immediately.
              Scheduled auto-off date will be cleared.
            </div>
            <div className="pr-pop-actions">
              <button className="pb pb-ghost pb-sm" onClick={() => setTurnOffPop(null)}>Cancel</button>
              <button className="pb pb-gold pb-sm" onClick={confirmTurnOff}>Yes, Turn Off</button>
            </div>
          </div>
        </div>
      )}

      {maintModal && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1" style={{ maxWidth: 500 }}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">Enable Maintenance Mode</div>
              <button className="pr-modal-close" onClick={() => setMaintModal(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <div className="pr-field">
                <label className="pr-label">Duration (days) <span style={{ color: "#f87171" }}>*required</span></label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <input type="number" className="pr-input" min={1} max={365}
                    value={maintDays}
                    onChange={e => handleDaysChange(parseInt(e.target.value) || 1)}
                    style={{ width: 100 }} />
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>
                    {maintDays >= 1 && (() => {
                      const from = new Date(); from.setHours(0,0,0,0);
                      const to = new Date(from); to.setDate(to.getDate() + Number(maintDays));
                      return `${from.toLocaleDateString("en-IN", { day: "numeric", month: "short" })} → ${to.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
                    })()}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                  Maintenance starts today. Room will auto-activate after these many days.
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                {checkingBookings ? (
                  <div style={{ fontSize: 13, color: "var(--muted)", padding: "10px 0" }}>Checking for affected bookings…</div>
                ) : affectedBookings.length > 0 ? (
                  <div style={{
                    background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
                    borderRadius: 6, padding: "12px 16px",
                  }}>
                    <div style={{ color: "#f87171", fontWeight: 600, marginBottom: 8, fontSize: 13 }}>
                      ⚠️ {affectedBookings.length} booking{affectedBookings.length > 1 ? "s" : ""} will be cancelled
                    </div>
                    {affectedBookings.map(b => (
                      <div key={b.id} style={{ fontSize: 13, color: "var(--text)", padding: "6px 0", borderTop: "1px solid rgba(248,113,113,0.15)" }}>
                        <strong>{b.guestName}</strong>
                        <span style={{ color: "var(--muted)" }}> ({b.guestRelation} of {b.studentName})</span>
                        <span style={{ color: "#f87171", marginLeft: 8 }}>{fmt(b.checkIn)} → {fmt(b.checkOut)}</span>
                        <span className="pt pt-amber" style={{ marginLeft: 8, fontSize: 10 }}>{b.status}</span>
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8 }}>
                      These students will see the reason and can re-book another room.
                    </div>
                  </div>
                ) : (
                  <div style={{
                    background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)",
                    borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#4ade80",
                  }}>
                    ✓ No bookings in this maintenance window. Safe to proceed.
                  </div>
                )}
              </div>

              <div className="pr-field">
                <label className="pr-label">Maintenance Reason <span style={{ color: "#f87171" }}>*required</span></label>
                <textarea className="pr-textarea" value={maintNote}
                  onChange={e => setMaintNote(e.target.value)}
                  placeholder="e.g. Plumbing repair, Electrical work, Pest control…"
                  rows={3} />
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                  This reason will be shown to students whose bookings are cancelled.
                </div>
              </div>
            </div>
            <div className="pr-modal-footer">
              <button className="pb pb-ghost pb-sm" onClick={() => setMaintModal(null)}>Cancel</button>
              <button className="pb pb-amber pb-sm"
                disabled={maintBusy || !maintNote.trim() || !maintDays || maintDays < 1}
                onClick={confirmMaintenance}>
                {maintBusy
                  ? "Processing…"
                  : affectedBookings.length > 0
                    ? `Enable & Cancel ${affectedBookings.length} Booking${affectedBookings.length > 1 ? "s" : ""}`
                    : "Enable Maintenance"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Bookings Panel ── */
function BookingsPanel({ hostels }) {
  const [bookings, setBookings]         = useState([]);
  const [loading, setLoading]           = useState(true);
  const [filterHostel, setFilter]       = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [detail, setDetail]             = useState(null);

  const [cancelModal, setCancelModal]   = useState(null);
  const [cancelStep, setCancelStep]     = useState("passkey");
  const [passkeyInput, setPasskeyInput] = useState("");
  const [passkeyError, setPasskeyError] = useState("");
  const [cancelNote, setCancelNote]     = useState("");
  const [cancelBusy, setCancelBusy]     = useState(false);

  const STATUS_STYLE = {
    pending:     { cls: "pt-amber",  label: "Pending" },
    approved:    { cls: "pt-green",  label: "Approved" },
    conditional: { cls: "pt-green",  label: "Approved with Condition" },
    checked_in:  { cls: "pt-purple", label: "Checked In" },
    checked_out: { cls: "pt-muted",  label: "Checked Out" },
    rejected:    { cls: "pt-red",    label: "Rejected" },
    cancelled:   { cls: "pt-muted",  label: "Cancelled" },
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "bookings"));
      setBookings(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
      );
    } catch { message.error("Failed to fetch bookings"); }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, []);

  const openCancel = (booking) => {
    setCancelModal(booking); setCancelStep("passkey");
    setPasskeyInput(""); setPasskeyError(""); setCancelNote("");
  };

  const verifyPasskey = async () => {
    if (!passkeyInput.trim()) { setPasskeyError("Please enter the passkey"); return; }
    setCancelBusy(true); setPasskeyError("");
    try {
      const snap = await getDocs(
        query(collection(db, "invite_codes"),
          where("hostelId", "==", cancelModal.hostelId),
          where("role", "==", "caretaker"))
      );
      const match = snap.docs.find(d => d.id === passkeyInput.trim().toUpperCase());
      if (match) { setCancelStep("note"); }
      else { setPasskeyError("Incorrect passkey for this hostel."); }
    } catch { setPasskeyError("Verification failed. Try again."); }
    setCancelBusy(false);
  };

  const confirmCancel = async () => {
    if (!cancelNote.trim()) { message.error("Please enter a cancellation reason"); return; }
    setCancelBusy(true);
    try {
      await updateDoc(doc(db, "bookings", cancelModal.id), {
        status: "cancelled",
        wardenNote: `Cancelled by admin: ${cancelNote.trim()}`,
        cancelledAt: new Date(),
      });
      setBookings(prev => prev.map(b =>
        b.id === cancelModal.id
          ? { ...b, status: "cancelled", wardenNote: `Cancelled by admin: ${cancelNote.trim()}` }
          : b
      ));
      message.success("Booking cancelled");
      setCancelModal(null); setDetail(null);
    } catch { message.error("Failed to cancel"); }
    setCancelBusy(false);
  };

  const activeStatuses = ["pending", "approved", "conditional", "checked_in"];
  let filtered = filterHostel === "all" ? bookings : bookings.filter(b => b.hostelId === filterHostel);
  if (filterStatus !== "all") filtered = filtered.filter(b => b.status === filterStatus);

  const fmt     = ts => ts?.toDate?.().toLocaleDateString("en-IN") || "—";
  const fmtFull = ts => ts?.toDate?.().toLocaleString("en-IN") || "—";

  const counts = { pending: 0, approved: 0, checked_in: 0, total: bookings.length };
  bookings.forEach(b => {
    if (b.status === "pending") counts.pending++;
    if (["approved", "conditional"].includes(b.status)) counts.approved++;
    if (b.status === "checked_in") counts.checked_in++;
  });

  return (
    <>
      <div className="pr-stats" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))" }}>
        {[
          { num: counts.pending,    label: "Pending",    color: "#f59e0b" },
          { num: counts.approved,   label: "Approved",   color: "#4ade80" },
          { num: counts.checked_in, label: "Checked In", color: "#a78bfa" },
          { num: counts.total,      label: "Total",      color: "var(--gold)" },
        ].map(({ num, label, color }) => (
          <div key={label} className="pr-stat">
            <div className="pr-stat-num" style={{ color }}>{num}</div>
            <div className="pr-stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="pr-filters" style={{ marginBottom: 16 }}>
        <button className={`pr-filter ${filterHostel === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>All Hostels</button>
        {hostels.map(h => (
          <button key={h.id} className={`pr-filter ${filterHostel === h.id ? "active" : ""}`}
            onClick={() => setFilter(h.id)}>{h.name}</button>
        ))}
      </div>
      <div className="pr-filters" style={{ marginBottom: 20 }}>
        {["all", "pending", "approved", "conditional", "checked_in", "checked_out", "rejected", "cancelled"].map(s => (
          <button key={s} className={`pr-filter ${filterStatus === s ? "active" : ""}`}
            onClick={() => setFilterStatus(s)}>
            {s === "all" ? "All Statuses" : STATUS_STYLE[s]?.label || s}
          </button>
        ))}
        <button className="pb pb-ghost pb-sm" style={{ marginLeft: "auto" }} onClick={fetchBookings}>↻ Refresh</button>
      </div>

      {loading ? <div className="pr-spin" /> : (
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead>
              <tr><th>Guest</th><th>Hostel</th><th>Check-in</th><th>Check-out</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--muted)", padding: "40px" }}>No bookings found</td></tr>
              )}
              {filtered.map(b => {
                const st = STATUS_STYLE[b.status] || { cls: "pt-muted", label: b.status };
                return (
                  <tr key={b.id}>
                    <td>
                      <div style={{ color: "var(--cream)", fontWeight: 500 }}>{b.guestName}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{b.phone}</div>
                    </td>
                    <td>
                      <div>{b.hostelName}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)" }}>{b.roomAc ? "AC" : "Non-AC"} · Cap {b.roomCapacity}</div>
                    </td>
                    <td>{fmt(b.checkIn)}</td>
                    <td>{fmt(b.checkOut)}</td>
                    <td><span className={`pt ${st.cls}`}>{st.label}</span></td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button className="pb pb-ghost pb-sm" onClick={() => setDetail(b)}>View</button>
                        {activeStatuses.includes(b.status) && (
                          <button className="pb pb-red pb-sm" onClick={() => openCancel(b)}>Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {detail && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1">
            <div className="pr-modal-head">
              <div className="pr-modal-title">Booking Details</div>
              <button className="pr-modal-close" onClick={() => setDetail(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              {[
                ["Guest Name",  detail.guestName],
                ["Relation",    detail.guestRelation],
                ["Phone",       detail.phone],
                ["Hostel",      detail.hostelName],
                ["Room",        `${detail.roomAc ? "AC" : "Non-AC"} · Capacity ${detail.roomCapacity}`],
                ["Student",     detail.studentName],
                ["Purpose",     detail.purpose],
                ["Check-in",    fmt(detail.checkIn)],
                ["Check-out",   fmt(detail.checkOut)],
                ["Booked At",   fmtFull(detail.bookedAt)],
                ["Status",      STATUS_STYLE[detail.status]?.label || detail.status],
                ["Note",        detail.wardenNote || "—"],
              ].map(([label, value]) => (
                <div key={label} style={{
                  display: "flex", gap: 12,
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: 10, marginBottom: 10,
                }}>
                  <span style={{ width: 110, color: "var(--muted)", fontSize: 13, flexShrink: 0 }}>{label}</span>
                  <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 500 }}>{value || "—"}</span>
                </div>
              ))}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>
                  Submitted Documents
                </div>
                <DocumentViewer docs={detail.documents} />
              </div>
            </div>
            {activeStatuses.includes(detail.status) && (
              <div className="pr-modal-footer">
                <button className="pb pb-red pb-sm" onClick={() => { setDetail(null); openCancel(detail); }}>
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {cancelModal && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1" style={{ maxWidth: 460 }}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">
                {cancelStep === "passkey" ? "🔑 Verify Passkey" : "✕ Cancel Booking"}
              </div>
              <button className="pr-modal-close" onClick={() => setCancelModal(null)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <div style={{
                background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)",
                borderRadius: 6, padding: "10px 14px", marginBottom: 20,
              }}>
                <div style={{ color: "var(--cream)", fontWeight: 600 }}>{cancelModal.guestName}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>
                  {cancelModal.hostelName} · {fmt(cancelModal.checkIn)} → {fmt(cancelModal.checkOut)}
                </div>
              </div>
              {cancelStep === "passkey" ? (
                <>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                    Enter the caretaker passkey for <strong style={{ color: "var(--text)" }}>{cancelModal.hostelName}</strong> to authorise this cancellation.
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Passkey</label>
                    <input className="pr-input" placeholder="e.g. CARETAKER-A3F9K2"
                      value={passkeyInput}
                      onChange={e => { setPasskeyInput(e.target.value.toUpperCase()); setPasskeyError(""); }}
                      onKeyDown={e => e.key === "Enter" && verifyPasskey()}
                      style={{ fontFamily: "monospace", letterSpacing: 2 }} />
                    {passkeyError && (
                      <div style={{ color: "#f87171", fontSize: 13, marginTop: 6 }}>⚠ {passkeyError}</div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                    ✅ Passkey verified. Provide a reason — the student will see this.
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Cancellation Reason <span style={{ color: "#f87171" }}>*required</span></label>
                    <textarea className="pr-textarea" value={cancelNote}
                      onChange={e => setCancelNote(e.target.value)}
                      placeholder="e.g. Hostel under renovation, administrative issue…"
                      rows={3} />
                  </div>
                </>
              )}
            </div>
            <div className="pr-modal-footer">
              <button className="pb pb-ghost pb-sm" onClick={() => setCancelModal(null)}>Back</button>
              {cancelStep === "passkey" ? (
                <button className="pb pb-gold pb-sm" disabled={cancelBusy} onClick={verifyPasskey}>
                  {cancelBusy ? "Verifying…" : "Verify →"}
                </button>
              ) : (
                <button className="pb pb-red pb-sm"
                  disabled={cancelBusy || !cancelNote.trim()} onClick={confirmCancel}>
                  {cancelBusy ? "Cancelling…" : "Confirm Cancellation"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Invite Codes Panel ── */
function InviteCodesPanel({ hostels }) {
  const [codes, setCodes]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [generating, setGenerating] = useState(false);
  const [selectedRole, setRole]     = useState("warden");
  const [selectedHostel, setHostel] = useState("");
  const [delPop, setDelPop]         = useState(null);

  const ROLES = [
    { key: "warden",    label: "Warden" },
    { key: "caretaker", label: "Caretaker" },
  ];

  const fetchCodes = async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "invite_codes"));
      setCodes(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0))
      );
    } catch { message.error("Failed to load codes"); }
    setLoading(false);
  };

  useEffect(() => { fetchCodes(); }, []);

  const generateCode = async () => {
    if (!selectedRole) { message.error("Select a role"); return; }
    if (selectedRole !== "admin" && !selectedHostel) { message.error("Select a hostel"); return; }
    setGenerating(true);
    try {
      const rand   = Math.random().toString(36).substring(2, 8).toUpperCase();
      const codeId = `${selectedRole.toUpperCase()}-${rand}`;
      const hostel = hostels.find(h => h.id === selectedHostel);
      await setDoc(doc(db, "invite_codes", codeId), {
        role: selectedRole,
        hostelId:   selectedRole !== "admin" ? selectedHostel : null,
        hostelName: selectedRole !== "admin" ? hostel?.name   : null,
        used: false, createdAt: new Date(),
      });
      message.success(`Generated: ${codeId}`);
      fetchCodes();
    } catch { message.error("Failed to generate code"); }
    setGenerating(false);
  };

  const deleteCode = async (id) => {
    try {
      await deleteDoc(doc(db, "invite_codes", id));
      setCodes(prev => prev.filter(c => c.id !== id));
      message.success("Code deleted");
      setDelPop(null);
    } catch { message.error("Delete failed"); }
  };

  const copyCode = (id) => { navigator.clipboard.writeText(id); message.success("Copied!"); };

  const ROLE_TAG = { warden: "pt-blue", caretaker: "pt-purple", admin: "pt-red" };

  return (
    <>
      {/* Super admin context banner */}
      <div style={{
        background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.2)",
        borderRadius: 6, padding: "10px 16px", marginBottom: 24,
        display: "flex", alignItems: "center", gap: 10,
        fontSize: 13, color: "var(--gold)",
      }}>
        <span>🔐</span>
        <span>Viewing as <strong>Super Administrator</strong>. Invite codes and passkeys are not visible to regular admins.</span>
      </div>

      <div className="pr-card" style={{ maxWidth: 480, marginBottom: 28 }}>
        <div className="pr-card-title">Generate Invite Code</div>
        <div className="pr-field">
          <label className="pr-label">Role</label>
          <div style={{ display: "flex", gap: 8 }}>
            {ROLES.map(r => (
              <button key={r.key}
                className={`pb pb-sm ${selectedRole === r.key ? "pb-gold" : "pb-ghost"}`}
                onClick={() => { setRole(r.key); setHostel(""); }}>
                {r.label}
              </button>
            ))}
          </div>
        </div>
        {selectedRole !== "admin" && (
          <div className="pr-field">
            <label className="pr-label">Hostel</label>
            <select className="pr-select" value={selectedHostel} onChange={e => setHostel(e.target.value)}>
              <option value="">— Select hostel —</option>
              {hostels.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
            </select>
          </div>
        )}
        <button className="pb pb-gold pb-full pb-lg" disabled={generating} onClick={generateCode}>
          {generating ? "Generating…" : "🔑 Generate Code"}
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: "var(--cream)", margin: 0 }}>
          All Invite Codes
        </h2>
        <button className="pb pb-ghost pb-sm" onClick={fetchCodes}>↻ Refresh</button>
      </div>

      {loading ? <div className="pr-spin" /> : (
        <div className="pr-table-wrap">
          <table className="pr-table">
            <thead>
              <tr><th>Code</th><th>Role</th><th>Hostel</th><th>Status</th><th>Created</th><th>Action</th></tr>
            </thead>
            <tbody>
              {codes.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--muted)", padding: "40px" }}>No codes generated yet</td></tr>
              )}
              {codes.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span className="pr-code">{c.id}</span>
                      <button className="pb pb-ghost pb-sm" style={{ padding: "3px 8px" }} onClick={() => copyCode(c.id)}>📋</button>
                    </div>
                  </td>
                  <td><span className={`pt ${ROLE_TAG[c.role] || "pt-muted"}`}>{c.role?.toUpperCase()}</span></td>
                  <td style={{ color: c.hostelName ? "var(--text)" : "var(--muted)" }}>{c.hostelName || "—"}</td>
                  <td>{c.used ? <span className="pt pt-red">Used</span> : <span className="pt pt-green">Available</span>}</td>
                  <td style={{ color: "var(--muted)", fontSize: 12 }}>{c.createdAt?.toDate?.().toLocaleDateString("en-IN") || "—"}</td>
                  <td><button className="pb pb-red pb-sm" onClick={() => setDelPop(c)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {delPop && (
        <div className="pr-pop">
          <div className="pr-pop-box pr-a1">
            <div className="pr-pop-title">Delete code {delPop.id}?</div>
            <div className="pr-pop-desc">This cannot be undone.</div>
            <div className="pr-pop-actions">
              <button className="pb pb-ghost pb-sm" onClick={() => setDelPop(null)}>Cancel</button>
              <button className="pb pb-red pb-sm" onClick={() => deleteCode(delPop.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
