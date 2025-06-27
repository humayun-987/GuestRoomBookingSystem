import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import google from "./google.png"; 
import "./style.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { sendPasswordResetEmail } from "firebase/auth";
import { signOut } from "firebase/auth";

const IndividualLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const uid = userCredential.user.uid;
      const user = userCredential.user;
      await user.reload();
      if (!user.emailVerified) {
        toast.error("Email not verified. Please check your inbox.");
        await signOut(auth);
        setLoading(false);
        return;
      }
      toast.success('Signed in with Google!');
      await user.reload();
      navigate(`/individual_profile/${uid}`);
    } catch (error) {
      alert("Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      navigate(`/individual_profile/${uid}`);
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <div className="backgroundDiv min-h-screen flex items-center justify-center">
      <div className="bg-gray-600 bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl px-6 py-8 w-[380px] shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Login</h2>

        <form onSubmit={handleSignin} className="myForm">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-transparent border border-white text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
               type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-transparent border border-white text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute right-4 top-2 text-white text-xl"
              aria-label="Toggle password visibility"
            >
              <img className="w-6" src={showPassword ? "/hidden.png" : "/eye (1).png"} alt="" />
            </button>
            <p className="text-xs text-white mt-1 ml-2">
              <button type="button" onClick={() => setShowModal(true)} className="text-blue-300 underline">Forgot Password?</button>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-100"
          >
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </button>

          <p className="text-center text-sm text-white mt-4">
            Don't have an account?{" "}
            <Link to="/individual_signup" className="underline text-blue-300">
              Sign up
            </Link>
          </p>

          <div className="text-white text-center my-4">OR</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="py-2 flex justify-center gap-4 items-center px-2 bg-white bg-opacity-20 border border-white text-gray-700 font-semibold rounded-full hover:bg-opacity-30 transition"
          >
            <img src={google} alt="Google" className="w-8 h-8" />
            <span>Continue with Google</span>
          </button>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm mx-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordReset}
                disabled={sending}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {sending ? "Sending..." : "Send Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualLogin;
