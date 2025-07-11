import { HiMail } from "react-icons/hi";
import "./css/IndividualSignup.css";
import { useState } from "react";
import NavigationBar from "../components/NavigationBar";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../comp/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";

export function IndividualSignup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(false);

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
            await signOut(auth); // Sign out unverified user
            console.log("Signed up successfully!");
            navigate("/individual_login");
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

            const userDocRef = doc(db, "Individual Users'25", user.uid);
            await setDoc(userDocRef, {
                username: "",
                email: user.email,
                name: "",
                age: "",
                phone: "",
                whatsapp: "",
                address: "",
                school: "",
                dob: "",
                parentsName: "",
                class: "",
                state: "",
                city: "",
                gender: "",
                pool: "",
                applicationPassword: "Application Password will be provided after payment",
                paymentSuccessful: false
            });

            console.log("Signed up with Google successfully");
            toast.success('Signed in with Google!');
            navigate(`/individual_profile/${user.uid}`);
        } catch (err) {
            toast.error(err.message);
            console.error(err.message);
        }
    };

    return (
        <div className="login-signup-box">
            <Helmet>
                <title>Individual Registration | UNOSQ'25</title>
                <meta
                    name="description"
                    content="Register individually for the Udghosh National Open Science Quiz 2025 hosted by IIT Kanpur."
                />
            </Helmet>
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
                        <div className="divider">
                            <span>Or continue with</span>
                        </div>

                        <button
                            type="button"
                            style={{ cursor: "pointer" }}
                            onClick={handleGoogleSignup}
                            className="googleBtn"
                        >
                            <img src="/google.png" alt="Google" className="googleImg" />
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <span
                        style={{
                            textAlign: "center",
                            fontSize: "14px",
                            width: "100%",
                            display: "block",
                            marginTop: "20px"
                        }}
                    >
                        Already Have an account?{" "}
                        <span
                            style={{
                                cursor: "pointer",
                                color: "rgb(0, 51, 255)",
                                fontSize: "14px",
                                fontWeight: "500",
                                textDecoration: "underline"
                            }}
                            onClick={() => { navigate("/individual_login") }}
                        >
                            Login
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
