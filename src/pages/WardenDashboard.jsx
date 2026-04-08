import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "./AuthContext";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";
import { DocumentViewer } from "./StudentDashboard";
import { useNavigate } from "react-router-dom";
const STATUS = {
  pending: { cls: "pt-amber", label: "Pending", bcard: "pending" },
  approved: { cls: "pt-green", label: "Approved", bcard: "approved" },
  conditional: { cls: "pt-green", label: "Approved with Condition", bcard: "conditional" },
  checked_in: { cls: "pt-purple", label: "Checked In", bcard: "checked_in" },
  checked_out: { cls: "pt-muted", label: "Checked Out", bcard: "checked_out" },
  rejected: { cls: "pt-red", label: "Rejected", bcard: "rejected" },
};

export default function WardenDashboard() {
  const { profile, logout } = useAuth();
  const [tab, setTab] = useState("pending");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => { injectPortalTheme(); }, []);

  const fetchBookings = async () => {
    if (!profile?.hostelId) return;
    setLoading(true);
    try {
      const q = query(collection(db, "bookings"), where("hostelId", "==", profile.hostelId));
      const snap = await getDocs(q);
      setBookings(
        snap.docs.map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => b.bookedAt?.toDate() - a.bookedAt?.toDate())
      );
    } catch { message.error("Failed to load bookings"); }
    setLoading(false);
  };

  useEffect(() => { fetchBookings(); }, [profile]);

  const pending = bookings.filter(b => b.status === "pending");
  const reviewed = bookings.filter(b => ["approved", "conditional", "rejected"].includes(b.status));
  const inProgress = bookings.filter(b => ["checked_in", "checked_out"].includes(b.status));

  return (
    <div className="pr">
      <div className="pr-bg" />

      <div className="pr-topbar">
        <div>
          <div className="pr-brand">IITK <span>Guest Rooms</span></div>
          <div className="pr-brand-sub">Warden Portal</div>
        </div>
        <div className="pr-topbar-right">
          <button
            className="pr-logout"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className="pr-logout"
            onClick={logout}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="pr-body">
        <div className="pr-page-header pr-a1">
          <div
            style={{
              marginBottom: 16,
              padding: "10px 14px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,76,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ lineHeight: 1.2 }}>
              <span style={{ fontSize: 14, fontWeight: 500 }}>
                {profile?.name}
              </span>
              <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>
                {profile?.hostelName}
              </span>
            </div>

            <span
              style={{
                fontSize: 11,
                color: "#4ade80",
                background: "rgba(74,222,128,0.08)",
                border: "1px solid rgba(74,222,128,0.25)",
                padding: "3px 8px",
                borderRadius: 999
              }}
            >
              ● Active
            </span>
          </div>
          <div className="pr-eyebrow">Warden Portal</div>
          <h1 className="pr-page-title">Booking Approvals</h1>
          <p className="pr-page-sub">{profile?.hostelName} — review and approve guest room requests</p>
        </div>

        <div className="pr-stats pr-a2">
          {[
            { num: pending.length, label: "Pending Review", color: "#f59e0b" },
            { num: reviewed.length, label: "Reviewed", color: "var(--gold)" },
            { num: inProgress.length, label: "Active Stays", color: "#a78bfa" },
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
            <div className="pr-tabs pr-a2">
              {[
                { key: "pending", label: "Pending", count: pending.length },
                { key: "reviewed", label: "Reviewed", count: null },
                { key: "active", label: "Active / History", count: null },
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
              {tab === "pending" && (loading
                ? <div className="pr-spin" />
                : pending.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">✅</div>No pending requests</div>
                  : pending.map(b => <WardenCard key={b.id} booking={b} onRefresh={fetchBookings} />)
              )}
              {tab === "reviewed" && (loading
                ? <div className="pr-spin" />
                : reviewed.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">📋</div>No reviewed bookings</div>
                  : reviewed.map(b => <WardenCard key={b.id} booking={b} onRefresh={fetchBookings} readOnly />)
              )}
              {tab === "active" && (loading
                ? <div className="pr-spin" />
                : inProgress.length === 0
                  ? <div className="pr-empty"><div className="pr-empty-icon">🏠</div>No active stays</div>
                  : inProgress.map(b => <WardenCard key={b.id} booking={b} onRefresh={fetchBookings} readOnly />)
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WardenCard({ booking, onRefresh, readOnly = false }) {
  const [noteModal, setNoteModal] = useState(false);
  const [noteAction, setNoteAction] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [popConfirm, setPopConfirm] = useState(false);
  const cfg = STATUS[booking.status] || { cls: "pt-muted", label: booking.status, bcard: "checked_out" };
  const fmt = ts => ts?.toDate?.().toLocaleDateString("en-IN") || "—";

  const applyDecision = async (status, wardenNote = "") => {
    setBusy(true);
    try {
      await updateDoc(doc(db, "bookings", booking.id), {
        status,
        wardenNote,
        reviewedAt: new Date(),
      });
      // NOTE: We no longer touch room.available here.
      // Availability is computed from date overlaps in the booking query.
      // room.available is only used by admin for maintenance purposes.
      message.success(`Booking ${status}`);
      onRefresh();
    } catch { message.error("Action failed"); }
    setBusy(false);
    setPopConfirm(false);
  };

  const openNote = (action) => { setNoteAction(action); setNote(""); setNoteModal(true); };

  return (
    <>
      <div className={`pr-bcard ${cfg.bcard}`}>
        <div className="pr-bcard-head">
          <div>
            <div className="pr-bcard-title">{booking.studentName}</div>
            <div className="pr-bcard-sub">{booking.phone} · Requested {fmt(booking.bookedAt)}</div>
          </div>
          <span className={`pt ${cfg.cls}`}>{cfg.label}</span>
        </div>
        <div className="pr-details">
          <div className="pr-detail-item"><span className="pr-dl">Guest:</span><span className="pr-dv">{booking.guestName} ({booking.guestRelation})</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Purpose:</span><span className="pr-dv">{booking.purpose}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Check-in:</span><span className="pr-dv">{fmt(booking.checkIn)}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Check-out:</span><span className="pr-dv">{fmt(booking.checkOut)}</span></div>
          <div className="pr-detail-item"><span className="pr-dl">Room:</span><span className="pr-dv">{booking.roomAc ? "AC" : "Non-AC"} · Cap {booking.roomCapacity}</span></div>
        </div>
        {booking.wardenNote && (
          <div className="pr-warden-note">💬 Your note: {booking.wardenNote}</div>
        )}

        {/* Documents */}
        <div style={{ marginTop: 12, marginBottom: 4 }}>
          <div style={{
            fontSize: 12, color: "var(--muted)", marginBottom: 8,
            textTransform: "uppercase", letterSpacing: 1
          }}>Submitted Documents</div>
          <DocumentViewer docs={booking.documents} />
        </div>
        {!readOnly && booking.status === "pending" && (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
            <button className="pb pb-green pb-sm" disabled={busy} onClick={() => setPopConfirm(true)}>
              ✓ Approve
            </button>
            <button className="pb pb-blue pb-sm" onClick={() => openNote("conditional")}>
              ~ Conditional
            </button>
            <button className="pb pb-red pb-sm" onClick={() => openNote("rejected")}>
              ✕ Reject
            </button>
          </div>
        )}
      </div>

      {popConfirm && (
        <div className="pr-pop">
          <div className="pr-pop-box pr-a1">
            <div className="pr-pop-title">Approve this booking?</div>
            <div className="pr-pop-desc">
              Guest: {booking.guestName} ({booking.guestRelation})<br />
              {fmt(booking.checkIn)} → {fmt(booking.checkOut)}
            </div>
            <div className="pr-pop-actions">
              <button className="pb pb-ghost pb-sm" onClick={() => setPopConfirm(false)}>Cancel</button>
              <button className="pb pb-green pb-sm" disabled={busy}
                onClick={() => applyDecision("approved")}>
                {busy ? "…" : "Confirm Approval"}
              </button>
            </div>
          </div>
        </div>
      )}

      {noteModal && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1" style={{ maxWidth: 440 }}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">
                {noteAction === "rejected" ? "Reason for Rejection" : "Conditional Approval"}
              </div>
              <button className="pr-modal-close" onClick={() => setNoteModal(false)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <div className="pr-field">
                <label className="pr-label">
                  Note {noteAction === "rejected" && <span style={{ color: "#f87171" }}>*required</span>}
                </label>
                <textarea className="pr-textarea" value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder={noteAction === "rejected"
                    ? "State reason for rejection — student will see this…"
                    : "Specify conditions e.g. Submit ID proof on arrival…"} />
                {noteAction === "rejected" && !note.trim() && (
                  <div style={{ fontSize: 12, color: "#f87171", marginTop: 4 }}>
                    A rejection reason is required so the student knows what to correct.
                  </div>
                )}
              </div>
            </div>
            <div className="pr-modal-footer">
              <button className="pb pb-ghost pb-sm" onClick={() => setNoteModal(false)}>Cancel</button>
              <button
                className={`pb pb-sm ${noteAction === "rejected" ? "pb-red" : "pb-blue"}`}
                disabled={busy || (noteAction === "rejected" && !note.trim())}
                onClick={async () => { await applyDecision(noteAction, note.trim()); setNoteModal(false); }}
              >
                {busy ? "…" : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
