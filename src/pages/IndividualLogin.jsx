import { HiMail } from "react-icons/hi";
import "./css/IndividualLogin.css";
import { useState, useEffect } from "react";
import NavigationBar from "../components/NavigationBar";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { auth } from "../comp/firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function IndividualLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [sending, setSending] = useState(false);

  const handlePasswordReset = async () => {
    if (!resetEmail) {
      toast.error("Please enter your email");
      return;
    }
    setSending(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      toast.success("Password reset email sent!");
      setShowModal(false);
      setResetEmail('');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSending(false);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate(`/individual_profile/${user.uid}`);
      }
    });
    return () => unsubscribe();
  }, []);
  const handleSignin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await user.reload();
      if (!user.emailVerified) {
        toast.error("Email not verified. Please check your inbox.");
        await signOut(auth);
        setLoading(false);
        navigate("/login");
        return;
      }
      toast.success('Signup successful!');
      console.log("signed in successfully")
      navigate(`/individual_profile/${user.uid}`);
    } catch (error) {
      toast.error("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      const user = result.user;
      navigate(`/individual_profile/${uid}`);
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <>
      <div className="login-signup-box">
        <NavigationBar />
        <div>
          <div className="illustartion">
            <img
              className="illustartionImg"
              src={"/images/login/connected-illustration.svg"}
              alt="Connected Peoples"
            />
          </div>
          <div className="login-box">
            <div className="logo">
              <img src="/images/UNOSQ_logo.png" alt="logo" />
              <span>UNOSQ</span>
            </div>

            <form onSubmit={handleSignin}>
              <label htmlFor="email">
                <input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <HiMail />
              </label>
              <label htmlFor="password">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className="eyeBtn"
                  aria-label="Toggle password visibility"
                >
                  <img className="eyeImg" src={showPassword ? "/eye (1).png" : "/hidden.png"} alt="" />
                </button>
              </label>
              <div className="forgotDiv">
                <button className="forgotPass" type="button" onClick={() => setShowModal(true)}>Forgot Password?</button>
              </div>
              <input type="submit" className="primary-btn" value={"Login"} />
              <div class="divider">
                <span>Or continue with</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="googleBtn">
                <img src="/google.png" alt="Google" className="googleImg" />
                <span>Continue with Google</span>
              </button>
            </form>
            <span style={{ textAlign: "center", fontSize: "14px", width: "100%", display: "block", marginTop: "20px" }}>
              Don't Have an account?{" "}
              <span
                style={{ cursor: "pointer", color: "rgb(0, 51, 255)", fontSize: "14px", fontWeight: "500", textDecoration: "underline" }}
                onClick={() => { navigate("/individual_signup") }}
              >
                Signup
              </span>
            </span>
          </div>
        </div>
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 className="modal-title">Reset Password</h3>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="modal-input"
              />
              <div className="modal-actions">
                <button onClick={() => setShowModal(false)} className="modal-cancel">
                  Cancel
                </button>
                <button
                  onClick={handlePasswordReset}
                  disabled={sending}
                  className="modal-send"
                >
                  {sending ? "Sending..." : "Send Link"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}