import React, { useEffect, useState } from "react";
import "./css/IndividualProfile.css";
import NavigationBar from "../components/NavigationBar";
import { db, auth } from "../comp/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import IndividualProfileForm from "./IndividualProfileForm";

const IndividualProfilesContainer = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                const profileRef = doc(db, "Individual Users'25", firebaseUser.uid);

                const snapshot = await getDoc(profileRef);

                if (!snapshot.exists()) {
                    const defaultProfile = {
                        name: "",
                        username: "",
                        email: firebaseUser.email,
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
                        paymentSuccessful: false,
                        timestamp: new Date()
                    };
                    await setDoc(profileRef, defaultProfile);
                    setProfile({ id: firebaseUser.uid, ...defaultProfile });
                } else {
                    setProfile({ id: snapshot.id, ...snapshot.data() });
                }
                setLoading(false);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <div className="min-h-[100vh] w-screen bg-cover bg-center pb-4"
            style={{ backgroundImage: "url('/images/login/background-white.jpeg')" }}>
            <NavigationBar />
            {loading ? (
                <div className="loader-wrapper">
                    <div className="spinner"></div>
                </div>
            ) : (
                profile && (
                    <div className="profile-list">
                        <IndividualProfileForm
                            key={profile.id}
                            profileId={profile.id}
                            initialData={profile}
                            user={user}
                        />
                    </div>
                )
            )}
        </div>
    );
};

export default IndividualProfilesContainer;
