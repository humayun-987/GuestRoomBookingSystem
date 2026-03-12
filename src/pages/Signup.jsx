import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth, ROLE_HOME } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";

const injectSignupCSS = () => {
  if (document.getElementById("signup-css")) return;
  const s = document.createElement("style");
  s.id = "signup-css";
  s.textContent = `
    .signup-wrap {
      display: flex;
      min-height: 100vh;
    }

    /* ── Left decorative panel ── */
    .signup-left {
      flex: 1;
      padding: 48px 60px;
      display: flex;
      flex-direction: column;
      border-right: 1px solid var(--border);
      position: relative;
      z-index: 1;
    }
    .signup-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(48px, 5.5vw, 72px);
      font-weight: 600;
      line-height: 1.05;
      color: var(--cream);
      margin: 0 0 16px;
    }
    .signup-desc {
      font-size: 15px;
      color: var(--muted);
      line-height: 1.7;
      max-width: 360px;
      font-weight: 300;
    }

    /* ── Right form panel ── */
    .signup-right {
      width: 520px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 48px 40px;
      position: relative;
      z-index: 1;
      background: rgba(13, 27, 42, 0.3);
    }
    .signup-card {
      width: 100%;
      max-width: 460px;
    }

    /* ── Profile grid: 2 cols on desktop ── */
    .signup-profile-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 16px;
    }

    /* ── Tablet (≤ 900px) ── */
    @media (max-width: 900px) {
      .signup-wrap { flex-direction: column; }

      .signup-left {
        flex: none;
        padding: 24px 24px 20px;
        border-right: none;
        border-bottom: 1px solid var(--border);
      }
      .signup-left-spacer { display: none; }
      .signup-left-roles  { display: none !important; }
      .signup-title { font-size: 34px; margin-bottom: 8px; }
      .signup-desc  { font-size: 13px; }

      .signup-right {
        width: 100%;
        padding: 28px 24px 48px;
        align-items: flex-start;
        background: none;
      }
      .signup-card { max-width: 100%; }

      /* single column on tablet for profile fields */
      .signup-profile-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ── Mobile (≤ 480px) ── */
    @media (max-width: 480px) {
      .signup-left  { padding: 18px 16px 14px; }
      .signup-title { font-size: 28px; }
      .signup-right { padding: 20px 14px 40px; }
    }
  `;
  document.head.appendChild(s);
};

export default function Signup() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isStaffMode = searchParams.get("staff") === "1";
  const { user, role, loading } = useAuth();

  useEffect(() => { injectPortalTheme(); injectSignupCSS(); }, []);
  useEffect(() => {
    if (!loading && user && role) navigate(ROLE_HOME[role], { replace: true });
  }, [user, role, loading]);

  const [step, setStep]         = useState(0);
  const [mode, setMode]         = useState(isStaffMode ? "staff" : "student");
  const [inviteCode, setInviteCode] = useState("");
  const [codeData, setCodeData] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Profile fields
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [rollNo, setRollNo]   = useState("");
  const [hostel, setHostel]   = useState("");
  const [department, setDept] = useState("");

  // Credential fields
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");

  /* ── Verify invite code ── */
  const verifyCode = async () => {
    if (!inviteCode.trim()) { message.error("Enter invite code"); return; }
    setVerifying(true);
    try {
      const snap = await getDoc(doc(db, "invite_codes", inviteCode.trim()));
      if (!snap.exists()) { message.error("Invalid invite code"); setVerifying(false); return; }
      const data = snap.data();
      if (data.used) { message.error("This code has already been used"); setVerifying(false); return; }
      setCodeData(data);
      message.success(`Code verified — signing up as ${data.role.toUpperCase()}`);
      setStep(1);
    } catch { message.error("Failed to verify code"); }
    setVerifying(false);
  };

  /* ── Validate step 1 ── */
  const validateProfile = () => {
    if (!name.trim()) { message.error("Enter your full name"); return false; }
    if (!/^[0-9]{10}$/.test(phone)) { message.error("Enter a valid 10-digit phone number"); return false; }
    if (mode === "student" && !rollNo.trim()) { message.error("Enter your roll number"); return false; }
    if (mode === "student" && !hostel.trim()) { message.error("Enter your hostel name"); return false; }
    return true;
  };

  /* ── Final signup ── */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email) { message.error("Enter email"); return; }
    if (password.length < 6) { message.error("Password must be at least 6 characters"); return; }
    if (password !== confirm) { message.error("Passwords don't match"); return; }
    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      if (mode === "student") {
        await setDoc(doc(db, "users_student", uid), {
          email, role: "student", createdAt: new Date(),
          name: name.trim(), phone: phone.trim(),
          rollNo: rollNo.trim(), hostel: hostel.trim(), department: department.trim(),
        });
        message.success("Account created!");
        navigate("/student/dashboard");
        return;
      }

      const roleMap = { warden: "users_warden", caretaker: "users_caretaker", admin: "users_admin" };
      await updateDoc(doc(db, "invite_codes", inviteCode.trim()), {
        used: true, usedBy: uid, usedAt: new Date(),
      });
      await setDoc(doc(db, roleMap[codeData.role], uid), {
        email, role: codeData.role, createdAt: new Date(),
        name: name.trim(), phone: phone.trim(),
        hostelId: codeData.hostelId || null,
        hostelName: codeData.hostelName || null,
      });
      message.success("Account created!");
      const routes = { warden: "/warden/dashboard", caretaker: "/caretaker/dashboard", admin: "/admin/hostels" };
      navigate(routes[codeData.role] || "/login");
    } catch (err) {
      message.error(err.message || "Signup failed");
    }
    setSubmitting(false);
  };

  /* ── Google signup (students only) ── */
  const handleGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, new GoogleAuthProvider());
      await setDoc(doc(db, "users_student", cred.user.uid), {
        email: cred.user.email, role: "student", createdAt: new Date(),
        name: name.trim(), phone: phone.trim(),
        rollNo: rollNo.trim(), hostel: hostel.trim(), department: department.trim(),
      });
      message.success("Signed up with Google!");
    } catch { message.error("Google signup failed"); }
  };

  const stepLabels = [
    mode === "student" ? "Role" : "Invite Code",
    "Your Info",
    "Credentials",
  ];

  return (
    <div className="pr">
      <div className="pr-bg" />
      <div className="pr-glow" style={{ width: 500, height: 500, top: "5%", right: "10%", opacity: 0.6 }} />

      <div className="signup-wrap">

        {/* ── Left panel ── */}
        <div className="signup-left">
          <div style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}
            onClick={() => navigate("/")}>
            ← Back to home
          </div>

          <div className="signup-left-spacer" style={{ flex: 1 }} />

          <div style={{ paddingTop: 24 }}>
            <div className="pr-eyebrow">IIT Kanpur · Hostel Administration</div>
            <h1 className="signup-title">
              Create<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Account.</em>
            </h1>
            <p className="signup-desc">
              Join the guest room booking portal. Students sign up freely — staff require an invite code from the admin.
            </p>
          </div>

          <div className="signup-left-spacer" style={{ flex: 1 }} />

          {/* Role list — hidden on mobile via CSS */}
          <div className="signup-left-roles" style={{ paddingTop: 40 }}>
            {[
              { icon: "🎓", label: "Student — Self-register" },
              { icon: "🏠", label: "Warden — Invite code required" },
              { icon: "👤", label: "Caretaker — Invite code required" },
              { icon: "⚙️", label: "Admin — Invite code required" },
            ].map(({ icon, label }) => (
              <div key={label} style={{ display: "flex", gap: 10, fontSize: 13, color: "var(--muted)", marginBottom: 10 }}>
                <span>{icon}</span><span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="signup-right">
          <div className="pr-card pr-a1 signup-card">

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 600, color: "var(--cream)", marginBottom: 6 }}>
                Create Account
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>
                Hostel Guest Room System · IIT Kanpur
              </div>
            </div>

            {/* ── Step indicator ── */}
            <div className="pr-steps" style={{ marginBottom: 28 }}>
              {stepLabels.map((label, i) => (
                <div key={i} className="pr-step" style={{ flex: i < stepLabels.length - 1 ? 1 : "none" }}>
                  <div className={`pr-step-dot ${i < step ? "done" : i === step ? "active" : ""}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`pr-step-label ${i === step ? "active" : ""}`}>{label}</span>
                  {i < stepLabels.length - 1 && <div className="pr-step-line" />}
                </div>
              ))}
            </div>

            {/* ══ STEP 0: Role / Invite code ══ */}
            {step === 0 && (
              <div className="pr-a1">
                <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                  <button className={`pb pb-full ${mode === "student" ? "pb-gold" : "pb-ghost"}`}
                    onClick={() => setMode("student")}>
                    🎓 Student
                  </button>
                  <button className={`pb pb-full ${mode === "staff" ? "pb-gold" : "pb-ghost"}`}
                    onClick={() => setMode("staff")}>
                    🔑 Staff
                  </button>
                </div>

                {mode === "student" ? (
                  <button className="pb pb-gold pb-full pb-lg" onClick={() => setStep(1)}>
                    Continue as Student →
                  </button>
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>
                      Enter the invite code provided by your administrator:
                    </p>
                    <div className="pr-field">
                      <label className="pr-label">Invite Code</label>
                      <input className="pr-input" placeholder="e.g. WARDEN-A3F9K2"
                        value={inviteCode}
                        onChange={e => setInviteCode(e.target.value.toUpperCase())}
                        style={{ letterSpacing: "0.5px", fontWeight: 500 }} />
                    </div>
                    <button className="pb pb-gold pb-full pb-lg" disabled={verifying} onClick={verifyCode}>
                      {verifying ? "Verifying…" : "Verify Code →"}
                    </button>
                  </>
                )}

                {codeData && (
                  <div className="pr-a1" style={{
                    background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)",
                    borderRadius: 6, padding: "12px 16px", marginTop: 16,
                  }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>VERIFIED CODE</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span className="pt pt-gold">{codeData.role?.toUpperCase()}</span>
                      {codeData.hostelName && <span className="pt pt-blue">{codeData.hostelName}</span>}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══ STEP 1: Profile info ══ */}
            {step === 1 && (
              <div className="pr-a1">
                {/* Name + Phone always side-by-side if there's room */}
                <div className="signup-profile-grid">
                  <div className="pr-field">
                    <label className="pr-label">Full Name</label>
                    <input className="pr-input" placeholder="Your full name"
                      value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="pr-field">
                    <label className="pr-label">Phone Number</label>
                    <input className="pr-input" placeholder="10-digit mobile" maxLength={10}
                      value={phone} onChange={e => setPhone(e.target.value.replace(/\D/, ""))} />
                  </div>
                </div>

                {mode === "student" && (
                  <>
                    <div className="signup-profile-grid">
                      <div className="pr-field">
                        <label className="pr-label">Roll Number</label>
                        <input className="pr-input" placeholder="e.g. 220101"
                          value={rollNo} onChange={e => setRollNo(e.target.value)} />
                      </div>
                      <div className="pr-field">
                        <label className="pr-label">Your Hostel</label>
                        <input className="pr-input" placeholder="e.g. Hall 5"
                          value={hostel} onChange={e => setHostel(e.target.value)} />
                      </div>
                    </div>
                    <div className="pr-field">
                      <label className="pr-label">
                        Department{" "}
                        <span style={{ color: "var(--muted)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                      </label>
                      <input className="pr-input" placeholder="e.g. Computer Science"
                        value={department} onChange={e => setDept(e.target.value)} />
                    </div>
                  </>
                )}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button className="pb pb-ghost pb-full" onClick={() => setStep(0)}>← Back</button>
                  <button className="pb pb-gold pb-full"
                    onClick={() => { if (validateProfile()) setStep(2); }}>
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEP 2: Credentials ══ */}
            {step === 2 && (
              <form className="pr-a1" onSubmit={handleSignup}>
                <div className="pr-field">
                  <label className="pr-label">Email Address</label>
                  <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="pr-field">
                  <label className="pr-label">Password</label>
                  <div className="pr-input-wrap">
                    <input className="pr-input" type={showPass ? "text" : "password"}
                      placeholder="Minimum 6 characters" style={{ paddingRight: 42 }}
                      value={password} onChange={e => setPassword(e.target.value)} />
                    <button type="button" className="pr-input-icon"
                      onClick={() => setShowPass(p => !p)}>
                      {showPass ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <div className="pr-field">
                  <label className="pr-label">Confirm Password</label>
                  <div className="pr-input-wrap">
                    <input className="pr-input" type={showConfirm ? "text" : "password"}
                      placeholder="Repeat password" style={{ paddingRight: 42 }}
                      value={confirm} onChange={e => setConfirm(e.target.value)} />
                    <button type="button" className="pr-input-icon"
                      onClick={() => setShowConfirm(p => !p)}>
                      {showConfirm ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                  <button type="button" className="pb pb-ghost pb-full" onClick={() => setStep(1)}>← Back</button>
                  <button type="submit" className="pb pb-gold pb-full" disabled={submitting}>
                    {submitting ? "Creating…" : "Create Account →"}
                  </button>
                </div>

                {mode === "student" && (
                  <>
                    <div className="pr-divider">
                      <div className="pr-divider-line" />
                      <span className="pr-divider-text">or</span>
                      <div className="pr-divider-line" />
                    </div>
                    <button type="button" className="pb pb-ghost pb-full"
                      style={{ padding: "11px", fontSize: 14, gap: 10 }}
                      onClick={handleGoogle}>
                      <span style={{ fontWeight: 700, fontFamily: "serif", fontSize: 16, color: "#4285F4" }}>G</span>
                      Continue with Google
                    </button>
                  </>
                )}
              </form>
            )}

            <div style={{ textAlign: "center", marginTop: 24 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Already have an account? </span>
              <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/login")}>Sign in</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
