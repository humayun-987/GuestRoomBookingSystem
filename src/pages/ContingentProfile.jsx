import React, { useEffect, useState } from "react";
import "./css/IndividualProfile.css"
import NavigationBar from "../components/NavigationBar";
import { db, auth } from "../comp/firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import ContingentProfileForm from "./ContingentProfileForm";

const ContingentProfilesContainer = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                const profileRef = doc(db, "Contingent Users'25", firebaseUser.uid);

                const unsubscribeSnap = onSnapshot(profileRef, async (docSnap) => {
                    if (!docSnap.exists()) {
                        await setDoc(profileRef, {
                            username: "contingent_" + firebaseUser.uid.substring(0, 6),
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
                    } else {
                        setProfiles([{ id: docSnap.id, ...docSnap.data() }]);
                        setLoading(false);
                    }
                });

                return () => unsubscribeSnap();
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    return (
        <div className="min-h-[100vh] w-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/login/background-white.jpeg')" }}>
            <NavigationBar />
            {loading ? (
                <div className="w-full h-screen flex justify-center items-center">
                    <div className="loading loading-spinner w-20 h-20 text-gray-300"></div>
                </div>
            ) : (
                <div className="profile-list">
                    {profiles.map((profile) => (
                        <ContingentProfileForm
                            key={profile.id}
                            profileId={profile.id}
                            initialData={profile}
                            user={user}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContingentProfilesContainer;
