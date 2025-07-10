import React, { useState, useEffect } from "react";
import { auth, db } from "../comp/firebaseConfig";
import { doc, updateDoc, getDocs, collection, where, query } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

const fields = [
    { id: "name", label: "Name", type: "text" },
    { id: "username", label: "Username", type: "text" },
    { id: "email", label: "Email", type: "email", disabled: true },
    { id: "age", label: "Age", type: "number" },
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

const IndividualProfileForm = ({ profileId, initialData, user }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [complete, setComplete] = useState(null);

    useEffect(() => {
        if (profileData) {
            setComplete(isProfileComplete());
        }
    }, [profileData]);

    const isIndianPhoneNumber = (phone) => /^[6-9]\d{9}$/.test(phone);

    const isProfileComplete = () => {
        const requiredFields = [
            "name", "username", "email", "age", "phone", "whatsapp",
            "address", "school", "dob", "parentsName", "class", "state", "city", "gender", "pool"
        ];
        return requiredFields.every((field) => profileData[field]?.toString().trim() !== "");
    };

    const handleInputChange = (e, id) => {
        setProfileData(prev => ({ ...prev, [id]: e.target.value }));
    };

    const handleGenderChange = (e) => {
        setProfileData(prev => ({ ...prev, gender: e.target.value }));
    };

    const handlePoolChange = (e) => {
        setProfileData(prev => ({ ...prev, pool: e.target.value }));
    };

    const isUsernameAvailable = async (username, profileId) => {
        const q = query(collection(db, "Individual Users'25"), where("username", "==", username));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty || (
            querySnapshot.docs.length === 1 && querySnapshot.docs[0].id === profileId
        );
    };

    const handleUpdate = async () => {
        if (!user) return;

        setIsSaving(true);

        if (profileData.phone && !isIndianPhoneNumber(profileData.phone)) {
            setIsSaving(false);
            toast.error("Please enter a valid Indian phone number.");
            return;
        }

        const available = await isUsernameAvailable(profileData.username, profileId);
        if (!available) {
            setIsSaving(false);
            toast.error("Username already taken. Please choose another.");
            return;
        }

        try {
            await updateDoc(doc(db, "Individual Users'25", user.uid), {
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

    const handleLogout = () => {
        signOut(auth)
            .then(() => navigate('/individual_login'))
            .catch((error) => console.error("Sign-out error:", error));
    };

    const handlePayment = () => {
        navigate('/individualPayment');
    };

    const generateAvatarUrl = () => {
        const genderPrefix = profileData.gender === "male" ? "boy" : "girl";
        return `https://avatar.iran.liara.run/public/${genderPrefix}?username=${profileData.username}`;
    };

    return (
        <div className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 shadow-xl rounded-xl md:w-[50%] w-[95%] mt-3 mb-0 p-6">
            {/* Avatar, Edit and Logout */}
            <div className="flex relative items-center gap-4">
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="relative border-4 border-yellow-600 rounded-full w-20 h-20 mb-2 transition-transform transform hover:scale-105">
                        <img
                            src={profileData.username ? generateAvatarUrl() : "/placeholder-profile.png"}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <button
                            className={`absolute bottom-[-6px] right-[-6px] rounded-full p-[6px] shadow-md ${isEditing ? "bg-red-600" : "bg-green-600"} text-white hover:bg-opacity-80`}
                            onClick={() => setIsEditing(!isEditing)}
                            disabled={isSaving}
                        >
                            <img src={isEditing ? "/cancel.png" : "/edit.png"} alt={isEditing ? "Cancel" : "Edit"} className="w-5 h-5" />
                        </button>
                    </div>
                </div>
                <div className="absolute top-10 lg:top-0 right-0">
                    <button onClick={handleLogout} className="p-2 rounded-lg">
                        <img src="/logout.png" alt="Logout" className="w-8 lg:w-10" />
                    </button>
                </div>
                <div>
                    <h2 className="md:text-3xl text-xl font-semibold text-white">{profileData.name}</h2>
                    <p className="text-white md:text-sm text-xs">UID: {profileId}</p>
                </div>
            </div>

            {/* Application Password */}
            <div className="mt-2">
                <p className="block text-sm text-white mb-2">Application Password:</p>
                <input
                    type="text"
                    value={profileData.applicationPassword}
                    disabled
                    className="w-full p-2 mb-4 rounded-lg border-2 border-gray-400 bg-white text-xs text-gray-900"
                />
            </div>

            {/* Form */}
            <form className="space-y-4 h-[45vh] overflow-y-auto px-2">
                {fields.map(({ id, label, type, disabled }) => (
                    <div key={id}>
                        <label className="block text-xs font-medium text-gray-200 mb-1">{label}</label>
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

                {/* Gender */}
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Gender</label>
                    <div className="flex space-x-6">
                        {["male", "female"].map((g) => (
                            <label key={g} className="flex items-center space-x-2 text-white cursor-pointer">
                                <input
                                    type="radio"
                                    name={`gender-${profileId}`}
                                    value={g}
                                    checked={profileData.gender === g}
                                    onChange={handleGenderChange}
                                    disabled={!isEditing}
                                    className="hidden peer"
                                />
                                <div className="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-4 peer-checked:border-yellow-700 peer-checked:bg-yellow-400" />
                                <span>{g.charAt(0).toUpperCase() + g.slice(1)}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Pool */}
                <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">Pool</label>
                    <select
                        value={profileData.pool}
                        onChange={handlePoolChange}
                        disabled={!isEditing}
                        className="w-full p-2 rounded-lg border border-gray-300 mb-2"
                    >
                        <option value="">Select Pool</option>
                        {validPools.map(pool => (
                            <option key={pool} value={pool}>{pool}</option>
                        ))}
                    </select>
                </div>
            </form>

            {/* Save Button */}
            {isSaving ? (
                <div className="flex justify-center items-center mt-2">
                    <div className="loading loading-dots loading-lg text-blue-500"></div>
                </div>
            ) : (
                <div className="mt-2 px-2">
                    <button
                        onClick={handleUpdate}
                        disabled={!isEditing || isSaving}
                        className={`w-full py-3 rounded-xl font-semibold ${isEditing ? "bg-blue-600 hover:bg-blue-700" : complete ? "bg-green-600 cursor-not-allowed" : "bg-red-600"} text-white`}
                    >
                        {isEditing ? "Save Changes" : complete ? "Your profile is Complete" : "Complete your profile"}
                    </button>
                </div>
            )}

            {/* Payment Button */}
            {complete && (
                <div className="mt-2 px-2">
                    <button
                        onClick={handlePayment}
                        disabled={isEditing || isSaving || profileData.paymentSuccessful}
                        className={`w-full py-3 rounded-xl font-semibold ${profileData.paymentSuccessful ? "bg-green-600 cursor-not-allowed" : "bg-red-500"} text-white`}
                    >
                        {profileData.paymentSuccessful ? "Payment Done" : "Make Payment"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default IndividualProfileForm;
