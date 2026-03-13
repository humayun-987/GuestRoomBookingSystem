import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth, ROLE_HOME } from "./AuthContext";
import { message } from "antd";
import { injectPortalTheme } from "./PortalTheme";

const injectLoginCSS = () => {
  if (document.getElementById("login-css")) return;
  const s = document.createElement("style");
  s.id = "login-css";
  s.textContent = `
    .login-wrap { display: flex; min-height: 100vh; }

    .login-left {
      flex: 1; padding: 48px 60px;
      display: flex; flex-direction: column;
      border-right: 1px solid var(--border);
      position: relative; z-index: 1;
    }
    .login-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: clamp(52px, 6vw, 80px);
      font-weight: 600; line-height: 1.05;
      color: var(--cream); margin: 0 0 16px;
    }
    .login-desc {
      font-size: 15px; color: var(--muted);
      line-height: 1.7; max-width: 360px;
      font-weight: 300; margin: 0;
    }
    .login-right {
      width: 500px; display: flex;
      align-items: center; justify-content: center;
      padding: 48px; position: relative; z-index: 1;
      background: rgba(13, 27, 42, 0.3);
    }
    .login-card { width: 100%; max-width: 420px; }

    @media (max-width: 900px) {
      .login-wrap { flex-direction: column; }
      .login-left { flex: none; padding: 24px 24px 20px; border-right: none; border-bottom: 1px solid var(--border); }
      .login-left-spacer { display: none; }
      .login-left-footer { display: none !important; }
      .login-title { font-size: 36px; margin-bottom: 8px; }
      .login-desc  { font-size: 13px; }
      .login-right { width: 100%; padding: 32px 24px 48px; align-items: flex-start; background: none; }
      .login-card { max-width: 100%; }
    }
    @media (max-width: 480px) {
      .login-left  { padding: 20px 18px 16px; }
      .login-title { font-size: 30px; }
      .login-right { padding: 24px 16px 40px; }
    }
  `;
  document.head.appendChild(s);
};

export default function Login() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy]         = useState(false);
  const [resetModal, setResetModal]   = useState(false);
  const [resetEmail, setResetEmail]   = useState("");
  const [resetBusy, setResetBusy]     = useState(false);

  useEffect(() => { injectPortalTheme(); injectLoginCSS(); }, []);
  useEffect(() => {
    if (!loading && user && role) navigate(ROLE_HOME[role], { replace: true });
  }, [user, role, loading]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { message.error("Fill in all fields"); return; }
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // AuthContext detects the session and redirects automatically
    } catch {
      message.error("Invalid email or password");
    }
    setBusy(false);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) { message.error("Enter your email"); return; }
    setResetBusy(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      message.success("Reset link sent — check your inbox");
      setResetModal(false);
      setResetEmail("");
    } catch (err) { message.error(err.message); }
    setResetBusy(false);
  };

  return (
    <div className="pr">
      <div className="pr-bg" />
      <div className="pr-glow" style={{ width: 500, height: 500, top: "-10%", left: "30%", opacity: 0.7 }} />

      <div className="login-wrap">

        {/* ── Left panel ── */}
        <div className="login-left">
          <div style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}
            onClick={() => navigate("/")}>← Back to home</div>

          <div className="login-left-spacer" style={{ flex: 1 }} />

          <div style={{ paddingTop: 24 }}>
            <div className="pr-eyebrow">IIT Kanpur · Hostel Administration</div>
            <h1 className="login-title">
              Welcome<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>back.</em>
            </h1>
            <p className="login-desc">
              Sign in to access the guest room booking portal. One login for all roles.
            </p>
          </div>

          <div className="login-left-spacer" style={{ flex: 1 }} />

          <div className="login-left-footer" style={{ paddingTop: 40 }}>
            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3px", marginBottom: 12 }}>
              PORTAL ACCESS FOR
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Student", "Warden", "Caretaker", "Admin"].map(r => (
                <span key={r} style={{
                  fontSize: 11, padding: "4px 12px", borderRadius: 20,
                  border: "1px solid var(--border)", color: "var(--muted)",
                }}>{r}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className="login-right">
          <div className="pr-card pr-a1 login-card">

            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: "var(--cream)", marginBottom: 6 }}>
                Sign In
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>
                Enter your credentials to continue
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <div className="pr-field">
                <label className="pr-label">Email Address</label>
                <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="pr-field">
                <label className="pr-label">Password</label>
                <div className="pr-input-wrap">
                  <input className="pr-input" type={showPass ? "text" : "password"}
                    placeholder="••••••••" style={{ paddingRight: 42 }}
                    value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="pr-input-icon"
                    onClick={() => setShowPass(p => !p)}>
                    {showPass ? "🙈" : "👁"}
                  </button>
                </div>
              </div>

              <div style={{ textAlign: "right", marginBottom: 22, marginTop: -6 }}>
                <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
                  onClick={() => setResetModal(true)}>
                  Forgot password?
                </span>
              </div>

              <button type="submit" className="pb pb-gold pb-lg pb-full" disabled={busy}>
                {busy ? "Signing in…" : "Sign In →"}
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: 28 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>New student? </span>
              <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/signup")}>Register here</span>
            </div>
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Staff / Warden? </span>
              <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
                onClick={() => navigate("/signup?staff=1")}>Staff signup</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Reset password modal ── */}
      {resetModal && (
        <div className="pr-overlay">
          <div className="pr-modal pr-a1" style={{ maxWidth: 420 }}>
            <div className="pr-modal-head">
              <div className="pr-modal-title">Reset Password</div>
              <button className="pr-modal-close" onClick={() => setResetModal(false)}>✕</button>
            </div>
            <div className="pr-modal-body">
              <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
                Enter your registered IITK email and we'll send a reset link.
              </p>
              <form onSubmit={handleReset}>
                <div className="pr-field">
                  <label className="pr-label">Email</label>
                  <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
                    value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
                </div>
                <button type="submit" className="pb pb-gold pb-full pb-lg"
                  disabled={resetBusy} style={{ marginTop: 8 }}>
                  {resetBusy ? "Sending…" : "Send Reset Link"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
