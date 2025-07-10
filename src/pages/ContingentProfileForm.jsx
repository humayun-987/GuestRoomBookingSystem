import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDocs, collection, where, query } from "firebase/firestore";
import { db, auth } from "../comp/firebaseConfig";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import SizedBox from "../components/SizedBox";

const fields = [
    { id: "schoolName", label: "School Name", type: "text" },
    { id: "username", label: "Username", type: "text" },
    { id: "pocName", label: "POC Name", type: "text" },
    { id: "principalName", label: "Principal Name", type: "text" },
    { id: "schoolEmail", label: "School Email", type: "email" },
    { id: "pocEmail", label: "POC Email", type: "email" },
    { id: "pocPhone", label: "POC Phone Number", type: "tel" },
    { id: "principalPhone", label: "Principal Phone Number", type: "tel" },
    { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
    { id: "schoolAddress", label: "School Address", type: "text" },
    { id: "numberOfStudents", label: "Number of Students", type: "number" },
    { id: "state", label: "State", type: "text" },
    { id: "city", label: "City", type: "text" }
];

const ContingentProfileForm = ({ profileId, initialData, user }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [complete, setComplete] = useState(null);

    const handleInputChange = (e, id) => {
        setProfileData(prev => ({ ...prev, [id]: e.target.value }));
    };

    useEffect(() => {
        if (profileData) {
            setComplete(isProfileComplete());
        }
    }, [profileData]);

    const isIndianPhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

    const isProfileComplete = () => {
        const requiredFields = [
            "schoolName", "username", "pocName", "principalName", "schoolEmail", "pocEmail", "pocPhone", "principalPhone", "whatsapp",
            "schoolAddress", "numberOfStudents", "state", "city"
        ];
        return requiredFields.every((field) => profileData[field]?.toString().trim() !== "");
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/contingent_login'))
            .catch((error) => console.error("Sign-out error:", error));
    };

    const isUsernameAvailable = async (username, currentUid) => {
        const q = query(collection(db, "Contingent Users'25"), where("username", "==", username));
        const querySnapshot = await getDocs(q);

        return querySnapshot.empty || (
            querySnapshot.docs.length === 1 && querySnapshot.docs[0].id === currentUid
        );
    };

    const handlePayment = () => navigate('/contingentPayment');

    const handleUpdate = async () => {
        if (!user) return;
        setIsSaving(true);

        if (profileData.whatsapp && !isIndianPhoneNumber(profileData.whatsapp)) {
            setIsSaving(false);
            toast.error("Please enter a valid Indian phone number.");
            return;
        }

        const available = await isUsernameAvailable(profileData.username, user.uid);
        if (!available) {
            setIsSaving(false);
            toast.error("Username already taken. Please choose another.");
            return;
        }

        try {
            await updateDoc(doc(db, "Contingent Users'25", user.uid), {
                ...profileData,
                email: user.email,
            });

            setIsSaving(false);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            setIsSaving(false);
            toast.error("Error updating profile.");
            console.error("Update error:", error);
        }
    };

    return (
        <SizedBox>
            <div className="flex flex-col-reverse items-center lg:flex-row">
                <div className="bg-gradient-to-b from-gray-900 to-[#222631] shadow-xl rounded-xl md:w-[50%] w-[95%] mt-3 mb-0 p-6 pb-3">
                    <div className="flex items-center gap-4 relative mb-2">
                        <div className="flex flex-col justify-center items-center gap-2">
                            <div className="relative border-4 border-yellow-600 rounded-full w-20 h-20 mb-2 transition-transform transform hover:scale-105">
                                <img
                                    src={profileData.username ? "/school.png" : "/placeholder-profile.png"}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                />
                                <button
                                    className={`absolute bottom-[-6px] right-[-6px] m-0 rounded-full p-[6px] shadow-md transition-all ${isEditing ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
                                    onClick={() => setIsEditing(!isEditing)}
                                    disabled={isSaving}
                                >
                                    <img
                                        src={isEditing ? "/cancel.png" : "/edit.png"}
                                        alt={isEditing ? "Cancel" : "Edit"}
                                        className="w-5 h-5"
                                    />
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <h2 className="md:text-2xl text-xl font-semibold text-white mb-2">{profileData.schoolName}</h2>
                            <p className="text-white md:text-sm text-xs mb-2">UID: {user?.uid}</p>
                        </div>
                    </div>

                    <form className="space-y-4 h-[56vh] md:h-[52vh] overflow-y-auto mt-0 mb-2 px-2">
                        {fields.map(({ id, label, type, disabled }) => (
                            <div key={id}>
                                <label className="block text-sm font-medium text-gray-200 mb-1">{label}</label>
                                <input
                                    type={type}
                                    id={id}
                                    value={profileData[id] || ""}
                                    onChange={(e) => handleInputChange(e, id)}
                                    disabled={disabled || !isEditing || isSaving}
                                    placeholder={`Enter your ${label.toLowerCase()}`}
                                    className="w-full p-2 rounded-lg border border-gray-300 bg-white text-sm"
                                />
                            </div>
                        ))}
                    </form>
                </div>
                <div className="md:w-[50%] w-[95%] mt-3 mb-0 p-6">
                    <div className="image">
                        <img className="w-30" src="/profile.png" alt="" />
                    </div>
                    {/* Save Button */}
                    {isSaving ? (
                        <div className="flex justify-center items-center">
                            <div className="loading loading-dots loading-lg text-blue-500"></div>
                        </div>
                    ) : (
                        <div className="col-span-full mt-6 px-2">
                            <button
                                type="button"
                                onClick={handleUpdate}
                                disabled={!isEditing || isSaving}
                                className={`w-full py-3 rounded-xl font-semibold transition-colors ${isEditing && !isSaving
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : complete ? "bg-green-600 text-white cursor-not-allowed" : "bg-red-600 text-white"
                                    }`}
                            >
                                {isEditing ? "Save Changes" : complete ? "Your profile is Complete" : "Complete your profile"}
                            </button>
                        </div>
                    )}
                     <div className="mt-2 px-2">
                        <button
                            onClick={handleLogout}
                            className={`w-full py-3 flex text-center gap-2 justify-center items-center rounded-xl font-semibold bg-red-600 text-white`}>
                            <img src="/logout.png" alt="Logout" className="w-6" />
                            <span>Logout</span>
                        </button>
                    </div>
                    {complete && (
                        <div className="col-span-full mt-2 px-2">
                            <button
                                type="button"
                                onClick={handlePayment}
                                disabled={isEditing || isSaving || profileData.paymentSuccessful}
                                className={`w-full py-3 rounded-xl font-semibold transition-colors ${profileData.paymentSuccessful ? "bg-green-600 text-white cursor-not-allowed" : "bg-red-600 text-white"}`}
                            >
                                <p>{profileData.paymentSuccessful ? "Payment Done" : "Make Payment"}</p>
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </SizedBox>

    );
};

export default ContingentProfileForm;
