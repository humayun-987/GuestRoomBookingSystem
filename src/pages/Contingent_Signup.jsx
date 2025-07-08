import { HiMail } from "react-icons/hi";
import "./css/IndividualSignup.css";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../comp/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function ContingentSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            toast.success("Verification email sent. Please verify your email and then log in.");
            await signOut(auth);
            navigate("/contingent_login");
        } catch (err) {
            toast.error(err.message);
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;

            const defaultProfileRef = doc(db, "Contingent Users'25", user.uid);
            await setDoc(defaultProfileRef, {
                username: "contingent_" + user.uid.substring(0, 6),
                schoolName: "",
                pocName: "",
                principalName: "",
                schoolEmail: "",
                pocEmail: "",
                principalPhone: "",
                pocPhone: "",
                whatsapp: "",
                schoolAddress: "",
                numberOfStudents: "",
                state: "",
                city: "",
                applicationPassword: "Application Password will be provided after payment",
                paymentSuccessful: false
            });

            toast.success('Signed in with Google!');
            navigate(`/contingent_profile/${user.uid}`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="login-signup-box">
            <NavigationBar />
            <div>
                <div className="illustartion">
                    <img className="illustartionImg" src={"/images/login/connected-illustration.svg"} alt="Connected Peoples" />
                </div>
                <div className="login-box">
                    <div className="logo">
                        <img src="/images/UNOSQ_logo.png" alt="logo" />
                        <span>UNOSQ</span>
                    </div>

                    <form onSubmit={handleSubmit}>
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

                        <input type="submit" className="primary-btn" value="Signup" />
                        <div className="divider"><span>Or continue with</span></div>
                        <button type="button" onClick={handleGoogleSignup} className="googleBtn">
                            <img src="/google.png" alt="Google" className="googleImg" />
                            <span>Continue with Google</span>
                        </button>
                    </form>
                    <span className="text-link">
                        Already Have an account?{" "}
                        <span onClick={() => navigate("/contingent_login")}>
                            Login
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
