// import { HiMail } from "react-icons/hi";
// import "./css/IndividualSignup.css";
// import { useState, useEffect, useRef } from "react";
// import NavigationBar from "../components/NavigationBar";
// import {
//     createUserWithEmailAndPassword,
//     GoogleAuthProvider,
//     signInWithPopup,
//     sendEmailVerification,
//     signOut,
// } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../comp/firebaseConfig";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { Helmet } from "react-helmet";

// export function IndividualSignup() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const provider = new GoogleAuthProvider();
//     const [loading, setLoading] = useState(false);
//     const hasShownToast = useRef(false);

//     useEffect(() => {
//         if (!hasShownToast.current) {
//             toast.success("Sign up with a new email!");
//             toast.success("Login if already signed up!");
//             hasShownToast.current = true;
//         }
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!email || !password) {
//             toast.error('Please fill in all fields');
//             return;
//         }
//         setLoading(true);
//         try {
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;
//             await sendEmailVerification(user);
//             toast.success("Verification email sent. Please verify your email and then log in.");
//             await signOut(auth); // Sign out unverified user
//             console.log("Signed up successfully!");
//             navigate("/individual_login");
//         } catch (err) {
//             toast.error(err.message);
//             console.error(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGoogleSignup = async () => {
//         try {
//             const userCredential = await signInWithPopup(auth, provider);
//             const user = userCredential.user;

//             const userDocRef = doc(db, "Individual Users'25", user.uid);
//             await setDoc(userDocRef, {
//                 username: "",
//                 email: user.email,
//                 name: "",
//                 age: "",
//                 phone: "",
//                 whatsapp: "",
//                 address: "",
//                 school: "",
//                 dob: "",
//                 parentsName: "",
//                 class: "",
//                 state: "",
//                 city: "",
//                 gender: "",
//                 pool: "",
//                 applicationPassword: "Application Password will be provided after payment",
//                 paymentSuccessful: false,
//                 timestamp: new Date()
//             });

//             console.log("Signed up with Google successfully");
//             // toast.success('Signed in with Google!');
//             navigate(`/individual_profile/${user.uid}`);
//         } catch (err) {
//             toast.error(err.message);
//             console.error(err.message);
//         }
//     };

//     return (
//         <div className="login-signup-box">
//             <Helmet>
//                 <title>Individual Registration | UNOSQ'25</title>
//                 <meta
//                     name="description"
//                     content="Register individually for the Udghosh National Open Science Quiz 2025 hosted by IIT Kanpur."
//                 />
//             </Helmet>
//             <NavigationBar />
//             <div>
//                 <div className="illustartion">
//                     <img
//                         className="illustartionImg"
//                         src={"/images/login/connected-illustration.svg"}
//                         alt="Connected Peoples"
//                     />
//                 </div>
//                 <div className="login-box">
//                     <div className="logo">
//                         <img src="/images/UNOSQ_logo.png" alt="logo" />
//                         <span>UNOSQ</span>
//                     </div>

//                     <form onSubmit={handleSubmit}>
//                         <label htmlFor="email">
//                             <input
//                                 id="email"
//                                 type="email"
//                                 placeholder="Email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 required
//                             />
//                             <HiMail />
//                         </label>
//                         <label htmlFor="password">
//                             <input
//                                 id="password"
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(prev => !prev)}
//                                 className="eyeBtn"
//                                 aria-label="Toggle password visibility"
//                             >
//                                 <img className="eyeImg" src={showPassword ? "/eye (1).png" : "/hidden.png"} alt="" />
//                             </button>
//                         </label>

//                         <input type="submit" className="primary-btn" value="Signup" />
//                         <div className="divider">
//                             <span>Or continue with</span>
//                         </div>

//                         <button
//                             type="button"
//                             style={{ cursor: "pointer" }}
//                             onClick={handleGoogleSignup}
//                             className="googleBtn"
//                         >
//                             <img src="/google.png" alt="Google" className="googleImg" />
//                             <span>Continue with Google</span>
//                         </button>
//                     </form>

//                     <span
//                         style={{
//                             textAlign: "center",
//                             fontSize: "14px",
//                             width: "100%",
//                             display: "block",
//                             marginTop: "20px"
//                         }}
//                     >
//                         Already Have an account?{" "}
//                         <span
//                             style={{
//                                 cursor: "pointer",
//                                 color: "rgb(0, 51, 255)",
//                                 fontSize: "14px",
//                                 fontWeight: "500",
//                                 textDecoration: "underline"
//                             }}
//                             onClick={() => { navigate("/individual_login") }}
//                         >
//                             Login
//                         </span>
//                     </span>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { HiMail } from "react-icons/hi";
import "./css/IndividualSignup.css";
import { useState, useEffect, useRef } from "react";
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
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const hasShownToast = useRef(false);

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formData, setFormData] = useState({
        name: "", username: "", email: "", age: "", phone: "", whatsapp: "",
        address: "", school: "", dob: "", parentsName: "", class: "",
        state: "", city: "", gender: "", pool: ""
    });

    const fields = [
        { id: "name", label: "Name", type: "text" },
        { id: "username", label: "Username", type: "text" },
        { id: "age", label: "Age", type: "text" },
        { id: "phone", label: "Phone Number", type: "tel" },
        { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
        { id: "address", label: "Address", type: "text" },
        { id: "school", label: "School", type: "text" },
        { id: "dob", label: "Date of Birth", type: "date" },
        { id: "parentsName", label: "Parent's Name", type: "text" },
        { id: "class", label: "Class", type: "text" },
        { id: "state", label: "State", type: "text" },
        { id: "city", label: "City", type: "text" },
    ];
    const validPools = ["Little Champs", "Super Nova", "The Titans", "Elite Explorers"];

    useEffect(() => {
        if (!hasShownToast.current) {
            toast.success("Sign up with a new email!");
            toast.success("Login if already signed up!");
            hasShownToast.current = true;
        }
    }, []);

    const handleNext = (e) => {
        e.preventDefault();

        const phoneRegex = /^[6-9]\d{9}$/;

        if (!formData.gender || !formData.pool) {
            toast.error("Please fill all fields including gender and pool");
            return;
        }

        if (!phoneRegex.test(formData.phone)) {
            toast.error("Invalid phone number. Enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (!phoneRegex.test(formData.whatsapp)) {
            toast.error("Invalid WhatsApp number. Enter a valid 10-digit Indian mobile number.");
            return;
        }
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please provide email and password');
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, "Individual Users'25", user.uid);
            await setDoc(userDocRef, {
                ...formData,
                email: user.email,
                applicationPassword: "Application Password will be provided after payment",
                paymentSuccessful: false,
                timestamp: new Date()
            });

            await sendEmailVerification(user);
            toast.success("Verification email sent. Please verify and then log in.");
            await signOut(auth);
            navigate("/individual_login");
        } catch (err) {
            toast.error(err.message);
            console.error(err);
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
                ...formData,
                email: user.email,
                applicationPassword: "Application Password will be provided after payment",
                paymentSuccessful: false,
                timestamp: new Date()
            });

            navigate(`/individual_profile/${user.uid}`);
        } catch (err) {
            toast.error(err.message);
            console.error(err);
        }
    };

    return (
        <div className="login-signup-box">
            <Helmet>
                <title>Individual Registration | UNOSQ'25</title>
            </Helmet>
            <NavigationBar />
            <div>
                <div className="illustartion">
                    <img className="illustartionImg" src="/images/login/connected-illustration.svg" alt="Connected" />
                </div>
                <div className="login-box relative overflow-hidden">
                    {/* Fixed Header */}
                    <div className="logo z-10 sticky top-0 left-0 py-4 flex items-center justify-center border-b mb-0 px-4 md:px-8">
                        <img src="/images/UNOSQ_logo.png" alt="logo" className="h-10 w-auto" />
                        <span className="text-2xl text-gray-800">UNOSQ</span>
                    </div>

                    {/* Scrollable Form Section */}
                    <div className="px-6 pb-20 space-y-6">

                        {step === 1 ? (
                            <form onSubmit={handleNext} className=" h-[calc(50vh-72px)] md:h-[calc(40vh)] overflow-y-auto space-y-4 w-full pb-8 px-2">
                                {fields.map(field => (
                                    <div className="w-full text-left" key={field.id}>
                                        <label className="block text-sm text-left font-medium text-gray-700 mb-1" htmlFor={field.id}>{field.label}</label>
                                        <input
                                            id={field.id}
                                            type={field.type}
                                            value={formData[field.id]}
                                            placeholder={`Enter your ${field.id}`}
                                            onChange={e => setFormData({ ...formData, [field.id]: e.target.value })}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                ))}

                                {/* Gender Selection */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                    <div className="flex justify-start items-start gap-0">
                                        {["male", "female"].map(g => (
                                            <label key={g} className="flex items-center space-x-2 cursor-pointer text-gray-900">
                                                <input
                                                    type="radio"
                                                    name="gender"
                                                    value={g}
                                                    checked={formData.gender === g}
                                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                                    className="hidden peer"
                                                />
                                                <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-4 peer-checked:border-yellow-500 peer-checked:bg-yellow-300" />
                                                <span className="capitalize text-gray-900">{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Pool Dropdown */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Pool</label>
                                    <select
                                        value={formData.pool}
                                        onChange={(e) => setFormData({ ...formData, pool: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Select Pool</option>
                                        {validPools.map(pool => (
                                            <option key={pool} value={pool}>{pool}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-[#FFF7EC] border-t">
                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">Continue to Signup</button>
                                     <span className="text-center text-sm block mt-4">
                                    Already have an account? <span className="text-blue-700 underline cursor-pointer" onClick={() => navigate("/individual_login")}>Login</span>
                                </span>
                                </div>
                            </form>
                        ) : (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="email">
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setFormData({ ...formData, email: e.target.value });
                                            }}
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
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            className="eyeBtn"
                                            aria-label="Toggle password visibility"
                                        >
                                            <img className="eyeImg" src={showPassword ? "/eye (1).png" : "/hidden.png"} alt="" />
                                        </button>
                                    </label>
                                    <input type="submit" className="primary-btn" value={loading ? "Signing up..." : "Signup"} disabled={loading} />
                                    <div className="divider"><span>Or continue with</span></div>
                                    <button type="button" onClick={handleGoogleSignup} className="googleBtn">
                                        <img src="/google.png" alt="Google" className="googleImg" />
                                        <span>Continue with Google</span>
                                    </button>
                                </form>
                                <span className="text-center text-sm block mt-4">
                                    Already have an account? <span className="text-blue-700 underline cursor-pointer" onClick={() => navigate("/individual_login")}>Login</span>
                                </span>
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
