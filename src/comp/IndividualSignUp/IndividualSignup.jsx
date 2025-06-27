import React, { useState, useEffect } from 'react';
import "./style.css";
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { sendEmailVerification } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';
import google from './google.png';
import { signOut } from 'firebase/auth';

const IndividualSignup = () => {
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();
    const [showPassword, setShowPassword] = useState(false); // 👈 New state
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            toast.error('Please fill in all fields');
            return;
        }
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, inputs.email, inputs.password);
            const user = userCredential.user;
            await sendEmailVerification(user);
            toast.success("Verification email sent. Please verify your email and then log in.");
            await signOut(auth); // Sign out unverified user
            navigate("/individual_login");
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            const user = userCredential.user;
            const defaultProfileRef = doc(collection(db, "Individual Users'25", user.uid, "profiles"));
            await setDoc(defaultProfileRef, {
                username: "user_" + user.uid.substring(0, 6),
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
            });

            toast.success('Signed in with Google!');
            navigate(`/individual_profile/${user.uid}`);
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="backgroundDiv min-h-screen flex items-center justify-center">
            <div className="bg-gray-600 bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl px-6 py-8 w-[380px] shadow-xl">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Sign Up</h2>

                <form className='myForm' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={inputs.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-full bg-transparent border border-1 border-white text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                             type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-full bg-transparent border border-1 border-white text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(prev => !prev)}
                            className="absolute right-4 top-2 text-white text-xl"
                            aria-label="Toggle password visibility"
                        >
                            <img className="w-6" src={showPassword ? "/hidden.png" : "/eye (1).png"} alt="" />
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-gray-700 font-semibold py-2 rounded-full hover:bg-gray-100"
                    >
                        {loading ? <span className="loading loading-spinner"></span> : 'Sign up'}
                    </button>

                    <p className="text-center text-sm text-white mt-4">
                        Already have an account?{" "}
                        <Link to="/individual_login" className="underline text-blue-300">
                            Login
                        </Link>
                    </p>

                    <div className="text-white text-center my-4">OR</div>

                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="py-2 flex justify-center gap-4 items-center px-2 bg-white bg-opacity-20 border border-white text-gray-700 font-semibold rounded-full hover:bg-opacity-30 transition">
                        <img src={google} alt="" className='w-8 h-8' />
                        <span>Continue with Google</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IndividualSignup;
