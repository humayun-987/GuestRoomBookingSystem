// import React, { useEffect, useState } from "react";
// import "./css/IndividualProfile.css";
// import NavigationBar from "../components/NavigationBar";
// import { db, auth } from "../comp/firebaseConfig";
// import {
//     collection,
//     doc,
//     deleteDoc,
//     setDoc,
//     onSnapshot,
//     addDoc
// } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import IndividualProfileForm from "./IndividualProfileForm";

// const IndividualProfilesContainer = () => {
//     const [profiles, setProfiles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
//             if (firebaseUser) {
//                 setUser(firebaseUser);
//                 const profilesRef = collection(db, "Individual Users'25", firebaseUser.uid, "profiles");

//                 const unsubscribeSnap = onSnapshot(profilesRef, async (snapshot) => {
//                     if (snapshot.empty) {
//                         const defaultProfileRef = doc(profilesRef);
//                         await setDoc(defaultProfileRef, {
//                             name: "",
//                             username: `user_${firebaseUser.uid.substring(0, 6)}`,
//                             email: firebaseUser.email,
//                             age: "",
//                             phone: "",
//                             whatsapp: "",
//                             address: "",
//                             school: "",
//                             dob: "",
//                             parentsName: "",
//                             class: "",
//                             state: "",
//                             city: "",
//                             gender: "",
//                             pool: "",
//                             applicationPassword: "Application Password will be provided after payment",
//                             paymentSuccessful: false
//                         });
//                     } else {
//                         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                         setProfiles(data);
//                         setLoading(false);
//                     }
//                 });

//                 return () => unsubscribeSnap();
//             } else {
//                 setLoading(false);
//             }
//         });

//         return () => unsubscribeAuth();
//     }, []);

//     return (
//         <div className="container">
//             <NavigationBar />
//             {loading ? (
//                 <div className="loader-wrapper">
//                     <div className="spinner"></div>
//                 </div>
//             ) : (
//                 <div className="profile-list">
//                     {profiles.map((profile) => (
//                         <IndividualProfileForm
//                             key={profile.id}
//                             profileId={profile.id}
//                             initialData={profile}
//                             user={user}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default IndividualProfilesContainer;

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
                        username: `user_${firebaseUser.uid.substring(0, 6)}`,
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
                        paymentSuccessful: false
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
        <div className="container">
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
