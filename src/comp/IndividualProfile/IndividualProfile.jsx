import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  onSnapshot,
  addDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import IndividualProfileForm from "./IndividualProfileForm";

const IndividualProfilesContainer = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const deleteProfile = async (profileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Individual Users'25", user.uid, "profiles", profileId));
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const addNewProfile = async () => {
    const newProfile = {
      name: "",
      username: `user_${Math.random().toString(36).substr(2, 8)}`,
      email: user.email,
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
    };

    const docRef = await addDoc(collection(db, "Individual Users'25", user.uid, "profiles"), newProfile);
    // No need to manually update state; onSnapshot handles it
  };

  // 🔁 Real-time listener + default profile creation
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const profilesRef = collection(db, "Individual Users'25", firebaseUser.uid, "profiles");

        const unsubscribeSnap = onSnapshot(profilesRef, async (snapshot) => {
          if (snapshot.empty) {
            const defaultProfileRef = doc(profilesRef);
            await setDoc(defaultProfileRef, {
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
            });
          } else {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProfiles(data);
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
    <div className="min-h-[100vh] w-screen bg-gradient-to-r from-black via-gray-500 via-gray-600 via-gray-500 to-black pb-4">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="loading loading-spinner w-20 h-20 text-gray-300"></div>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col justify-center items-center gap-10">
            {profiles.map((profile) => (
              <IndividualProfileForm
                key={profile.id}
                profileId={profile.id}
                initialData={profile}
                user={user}
                onDelete={() => deleteProfile(profile.id)}
              />
            ))}
          </div>
          <div className="absolute bottom-0 right-0">
            <button onClick={addNewProfile} className="flex gap-2 items-center justify-center [box-shadow:inset_0_4px_16px_rgba(0,0,0,0.6)] bg-gray-300 py-2 px-3 font-semibold text-lg rounded-lg m-2">
              <img className="w-8" src="/add.png" alt="Add" />
              <p>Add Profile</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualProfilesContainer;
