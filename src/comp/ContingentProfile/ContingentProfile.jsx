import React, { useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, doc, deleteDoc, setDoc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "react-router-dom";
import ContingentProfileForm from "./ContingentProfileForm";

const ContingentProfilesContainer = () => {
  const { uid } = useParams();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Real-time listener to profiles subcollection
  useEffect(() => {
    if (!uid) return;

    const profilesRef = collection(db, "Contingent Users'25", uid, "profiles");

    const unsubscribe = onSnapshot(profilesRef, async (snapshot) => {
      if (snapshot.empty) {
        // If no profile, create default
        const defaultProfileRef = doc(profilesRef);
        await setDoc(defaultProfileRef, {
          username: "contingent_" + uid.substring(0, 6),
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
        });
      } else {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProfiles(data);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const deleteProfile = async (profileId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmDelete || !uid) return;

    try {
      await deleteDoc(doc(db, "Contingent Users'25", uid, "profiles", profileId));
      setProfiles(prev => prev.filter(profile => profile.id !== profileId));
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="min-h-[100vh] w-screen bg-gradient-to-r from-black via-gray-600 to-black pb-4">
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="loading loading-spinner w-20 h-20 text-gray-300"></div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center gap-10">
          {profiles.map((profile) => (
            <ContingentProfileForm
              key={profile.id}
              profileId={profile.id}
              initialData={profile}
              user={user}
              onDelete={() => deleteProfile(profile.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContingentProfilesContainer;
