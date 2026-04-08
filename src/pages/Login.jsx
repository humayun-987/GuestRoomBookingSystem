// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
// import { auth } from "../firebaseConfig";
// import { useAuth, ROLE_HOME } from "./AuthContext";
// import { message } from "antd";
// import { injectPortalTheme } from "./PortalTheme";

// const injectLoginCSS = () => {
//   if (document.getElementById("login-css")) return;
//   const s = document.createElement("style");
//   s.id = "login-css";
//   s.textContent = `
//     .login-wrap { display: flex; min-height: 100vh; }

//     .login-left {
//       flex: 1; padding: 48px 60px;
//       display: flex; flex-direction: column;
//       border-right: 1px solid var(--border);
//       position: relative; z-index: 1;
//     }
//     .login-title {
//       font-family: 'Cormorant Garamond', serif;
//       font-size: clamp(52px, 6vw, 80px);
//       font-weight: 600; line-height: 1.05;
//       color: var(--cream); margin: 0 0 16px;
//     }
//     .login-desc {
//       font-size: 15px; color: var(--muted);
//       line-height: 1.7; max-width: 360px;
//       font-weight: 300; margin: 0;
//     }
//     .login-right {
//       width: 500px; display: flex;
//       align-items: center; justify-content: center;
//       padding: 48px; position: relative; z-index: 1;
//       background: rgba(13, 27, 42, 0.3);
//     }
//     .login-card { width: 100%; max-width: 420px; }

//     /* ── Unverified email banner ── */
//     .login-unverified-banner {
//       display: flex; flex-direction: column; gap: 10px;
//       background: rgba(248,113,113,0.06);
//       border: 1px solid rgba(248,113,113,0.25);
//       border-radius: 8px; padding: 14px 16px;
//       margin-bottom: 20px;
//       animation: fadeIn 0.25s ease;
//     }
//     .login-unverified-banner-row {
//       display: flex; gap: 10px; align-items: flex-start;
//     }
//     .login-unverified-banner-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
//     .login-unverified-banner-text { font-size: 12.5px; color: var(--muted); line-height: 1.6; }
//     .login-unverified-banner-text strong { color: #f87171; font-weight: 500; }
//     .login-resend-btn {
//       align-self: flex-start;
//       background: none; border: 1px solid rgba(248,113,113,0.3);
//       border-radius: 5px; padding: 5px 12px;
//       font-size: 12px; color: #f87171; cursor: pointer;
//       font-weight: 500; transition: background 0.15s;
//     }
//     .login-resend-btn:hover { background: rgba(248,113,113,0.08); }
//     .login-resend-btn:disabled { opacity: 0.5; cursor: default; }

//     @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: none } }

//     @media (max-width: 900px) {
//       .login-wrap { flex-direction: column; }
//       .login-left { flex: none; padding: 24px 24px 20px; border-right: none; border-bottom: 1px solid var(--border); }
//       .login-left-spacer { display: none; }
//       .login-left-footer { display: none !important; }
//       .login-title { font-size: 36px; margin-bottom: 8px; }
//       .login-desc  { font-size: 13px; }
//       .login-right { width: 100%; padding: 32px 24px 48px; align-items: flex-start; background: none; }
//       .login-card { max-width: 100%; }
//     }
//     @media (max-width: 480px) {
//       .login-left  { padding: 20px 18px 16px; }
//       .login-title { font-size: 30px; }
//       .login-right { padding: 24px 16px 40px; }
//     }
//   `;
//   document.head.appendChild(s);
// };

// export default function Login() {
//   const navigate = useNavigate();
//   const { user, role, loading } = useAuth();

//   const [email, setEmail]       = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [busy, setBusy]         = useState(false);

//   // Unverified state
//   const [unverified, setUnverified]         = useState(false);
//   const [resendCooldown, setResendCooldown] = useState(0);
//   const [resending, setResending]           = useState(false);

//   // Reset modal
//   const [resetModal, setResetModal] = useState(false);
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetBusy, setResetBusy]   = useState(false);

//   useEffect(() => { injectPortalTheme(); injectLoginCSS(); }, []);

//   // Only redirect if email is actually verified
//   useEffect(() => {
//     if (!loading && user && role && user.emailVerified) {
//       navigate(ROLE_HOME[role], { replace: true });
//     }
//   }, [user, role, loading]);

//   // Resend cooldown ticker
//   useEffect(() => {
//     if (resendCooldown <= 0) return;
//     const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendCooldown]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) { message.error("Fill in all fields"); return; }
//     setUnverified(false);
//     setBusy(true);
//     try {
//       const cred = await signInWithEmailAndPassword(auth, email, password);

//       if (!cred.user.emailVerified) {
//         // Sign them back out immediately — never let them reach the dashboard
//         await auth.signOut();
//         setUnverified(true);
//         setBusy(false);
//         return;
//       }

//       // Verified — AuthContext will detect role and redirect
//     } catch {
//       message.error("Invalid email or password");
//     }
//     setBusy(false);
//   };

//   const handleResendVerification = async () => {
//     if (resendCooldown > 0 || resending) return;
//     setResending(true);
//     try {
//       // Sign in temporarily just to get the user object for resending
//       const cred = await signInWithEmailAndPassword(auth, email, password);
//       await sendEmailVerification(cred.user);
//       await auth.signOut(); // sign out again immediately
//       message.success("Verification email resent — check your inbox");
//       setResendCooldown(60);
//     } catch (err) {
//       message.error(err.message || "Could not resend email");
//     }
//     setResending(false);
//   };

//   const handleReset = async (e) => {
//     e.preventDefault();
//     if (!resetEmail) { message.error("Enter your email"); return; }
//     setResetBusy(true);
//     try {
//       await sendPasswordResetEmail(auth, resetEmail);
//       message.success("Reset link sent — check your inbox");
//       setResetModal(false);
//       setResetEmail("");
//     } catch (err) {
//       message.error(err.message);
//     }
//     setResetBusy(false);
//   };

//   return (
//     <div className="pr">
//       <div className="pr-bg" />
//       <div className="pr-glow" style={{ width: 500, height: 500, top: "-10%", left: "30%", opacity: 0.7 }} />

//       <div className="login-wrap">

//         {/* ── Left panel ── */}
//         <div className="login-left">
//           <div style={{ cursor: "pointer", color: "var(--muted)", fontSize: 13 }}
//             onClick={() => navigate("/")}>← Back to home</div>

//           <div className="login-left-spacer" style={{ flex: 1 }} />

//           <div style={{ paddingTop: 24 }}>
//             <div className="pr-eyebrow">IIT Kanpur · Hostel Administration</div>
//             <h1 className="login-title">
//               Welcome<br />
//               <em style={{ color: "var(--gold)", fontStyle: "italic" }}>back.</em>
//             </h1>
//             <p className="login-desc">
//               Sign in to access the guest room booking portal. One login for all roles.
//             </p>
//           </div>

//           <div className="login-left-spacer" style={{ flex: 1 }} />

//           <div className="login-left-footer" style={{ paddingTop: 40 }}>
//             <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.3px", marginBottom: 12 }}>
//               PORTAL ACCESS FOR
//             </p>
//             <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//               {["Student", "Warden", "Caretaker", "Admin"].map(r => (
//                 <span key={r} style={{
//                   fontSize: 11, padding: "4px 12px", borderRadius: 20,
//                   border: "1px solid var(--border)", color: "var(--muted)",
//                 }}>{r}</span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* ── Right: form ── */}
//         <div className="login-right">
//           <div className="pr-card pr-a1 login-card">

//             <div style={{ marginBottom: 32 }}>
//               <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 30, fontWeight: 600, color: "var(--cream)", marginBottom: 6 }}>
//                 Sign In
//               </div>
//               <div style={{ fontSize: 14, color: "var(--muted)", fontWeight: 300 }}>
//                 Enter your credentials to continue
//               </div>
//             </div>

//             {/* ── Unverified email banner ── */}
//             {unverified && (
//               <div className="login-unverified-banner">
//                 <div className="login-unverified-banner-row">
//                   <span className="login-unverified-banner-icon">✉️</span>
//                   <div className="login-unverified-banner-text">
//                     <strong>Email not verified.</strong> Please check your inbox and click the verification link before signing in.
//                   </div>
//                 </div>
//                 <button
//                   className="login-resend-btn"
//                   onClick={handleResendVerification}
//                   disabled={resendCooldown > 0 || resending}
//                 >
//                   {resending
//                     ? "Sending…"
//                     : resendCooldown > 0
//                     ? `Resend in ${resendCooldown}s`
//                     : "Resend verification email"}
//                 </button>
//               </div>
//             )}

//             <form onSubmit={handleLogin}>
//               <div className="pr-field">
//                 <label className="pr-label">Email Address</label>
//                 <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
//                   value={email}
//                   onChange={e => { setEmail(e.target.value); setUnverified(false); }} />
//               </div>

//               <div className="pr-field">
//                 <label className="pr-label">Password</label>
//                 <div className="pr-input-wrap">
//                   <input className="pr-input" type={showPass ? "text" : "password"}
//                     placeholder="••••••••" style={{ paddingRight: 42 }}
//                     value={password} onChange={e => setPassword(e.target.value)} />
//                   <button type="button" className="pr-input-icon"
//                     onClick={() => setShowPass(p => !p)}>
//                     {showPass ? "🙈" : "👁"}
//                   </button>
//                 </div>
//               </div>

//               <div style={{ textAlign: "right", marginBottom: 22, marginTop: -6 }}>
//                 <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
//                   onClick={() => setResetModal(true)}>
//                   Forgot password?
//                 </span>
//               </div>

//               <button type="submit" className="pb pb-gold pb-lg pb-full" disabled={busy}>
//                 {busy ? "Signing in…" : "Sign In →"}
//               </button>
//             </form>

//             <div style={{ textAlign: "center", marginTop: 28 }}>
//               <span style={{ fontSize: 13, color: "var(--muted)" }}>New student? </span>
//               <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
//                 onClick={() => navigate("/signup")}>Register here</span>
//             </div>
//             <div style={{ textAlign: "center", marginTop: 8 }}>
//               <span style={{ fontSize: 13, color: "var(--muted)" }}>Staff / Warden? </span>
//               <span style={{ fontSize: 13, color: "var(--gold)", cursor: "pointer", fontWeight: 500 }}
//                 onClick={() => navigate("/signup?staff=1")}>Staff signup</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ── Reset password modal ── */}
//       {resetModal && (
//         <div className="pr-overlay">
//           <div className="pr-modal pr-a1" style={{ maxWidth: 420 }}>
//             <div className="pr-modal-head">
//               <div className="pr-modal-title">Reset Password</div>
//               <button className="pr-modal-close" onClick={() => setResetModal(false)}>✕</button>
//             </div>
//             <div className="pr-modal-body">
//               <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 20 }}>
//                 Enter your registered IITK email and we'll send a reset link.
//               </p>
//               <form onSubmit={handleReset}>
//                 <div className="pr-field">
//                   <label className="pr-label">Email</label>
//                   <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
//                     value={resetEmail} onChange={e => setResetEmail(e.target.value)} />
//                 </div>
//                 <button type="submit" className="pb pb-gold pb-full pb-lg"
//                   disabled={resetBusy} style={{ marginTop: 8 }}>
//                   {resetBusy ? "Sending…" : "Send Reset Link"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } from "firebase/auth";
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

    /* ── Unverified email banner ── */
    .login-unverified-banner {
      display: flex; flex-direction: column; gap: 10px;
      background: rgba(248,113,113,0.06);
      border: 1px solid rgba(248,113,113,0.25);
      border-radius: 8px; padding: 14px 16px;
      margin-bottom: 20px;
      animation: fadeIn 0.25s ease;
    }
    .login-unverified-banner-row {
      display: flex; gap: 10px; align-items: flex-start;
    }
    .login-unverified-banner-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
    .login-unverified-banner-text { font-size: 12.5px; color: var(--muted); line-height: 1.6; }
    .login-unverified-banner-text strong { color: #f87171; font-weight: 500; }
    .login-resend-btn {
      align-self: flex-start;
      background: none; border: 1px solid rgba(248,113,113,0.3);
      border-radius: 5px; padding: 5px 12px;
      font-size: 12px; color: #f87171; cursor: pointer;
      font-weight: 500; transition: background 0.15s;
    }
    .login-resend-btn:hover { background: rgba(248,113,113,0.08); }
    .login-resend-btn:disabled { opacity: 0.5; cursor: default; }

    @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: none } }

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);

  // Unverified state
  const [unverified, setUnverified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  // Reset modal
  const [resetModal, setResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetBusy, setResetBusy] = useState(false);

  useEffect(() => { injectPortalTheme(); injectLoginCSS(); }, []);

  // Only redirect if email is actually verified
  useEffect(() => {
    if (!loading && user && role) {

      // 🚫 Block only STUDENTS if not verified
      if (role === "student" && !user.emailVerified) {
        setUnverified(true);
        return;
      }

      // ✅ Allow everyone else
      navigate(ROLE_HOME[role], { replace: true });
    }
  }, [user, role, loading]);

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      message.error("Fill in all fields");
      return;
    }

    setBusy(true);
    setUnverified(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // ✅ Do NOTHING here
      // redirect handled by useEffect
    } catch {
      message.error("Invalid email or password");
    }

    setBusy(false);
  };

  const handleResendVerification = async () => {
    if (role !== "student") return;
    if (resendCooldown > 0 || resending) return;

    const currentUser = auth.currentUser;

    if (!currentUser) {
      message.error("Please login again to resend verification");
      return;
    }

    setResending(true);

    try {
      await sendEmailVerification(currentUser);

      message.success("Verification email resent — check your inbox");
      setResendCooldown(60);
    } catch (err) {
      message.error(err.message || "Could not resend email");
    }

    setResending(false);
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
    } catch (err) {
      message.error(err.message);
    }
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

            {/* ── Unverified email banner ── */}
            {unverified && (
              <div className="login-unverified-banner">
                <div className="login-unverified-banner-row">
                  <span className="login-unverified-banner-icon">✉️</span>
                  <div className="login-unverified-banner-text">
                    <strong>Email not verified.</strong> Please check your inbox and click the verification link before signing in.
                  </div>
                </div>
                <button
                  className="login-resend-btn"
                  onClick={handleResendVerification}
                  disabled={resendCooldown > 0 || resending}
                >
                  {resending
                    ? "Sending…"
                    : resendCooldown > 0
                      ? `Resend in ${resendCooldown}s`
                      : "Resend verification email"}
                </button>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="pr-field">
                <label className="pr-label">Email Address</label>
                <input className="pr-input" type="email" placeholder="you@iitk.ac.in"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setUnverified(false); }} />
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
