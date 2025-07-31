import React, { useState } from "react";
import { db } from "../comp/firebaseConfig";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from "../components/NavigationBar";

const initialState = {
  schoolName: "",
  username: "",
  principalName: "",
  pocName: "",
  schoolEmail: "",
  pocEmail: "",
  principalPhone: "",
  pocPhone: "",
  email: "",
  whatsapp: "",
  schoolAddress: "",
  numberOfStudents: "",
  state: "",
  city: ""
};

const fields = [
  { id: "schoolName", label: "School Name", type: "text" },
  { id: "username", label: "Username", type: "text" },
  { id: "principalName", label: "Principal Name", type: "text" },
  { id: "pocName", label: "POC Name", type: "text" },
  { id: "schoolEmail", label: "School Email", type: "email" },
  { id: "pocEmail", label: "POC Email", type: "email" },
  { id: "principalPhone", label: "Principal Phone Number", type: "tel" },
  { id: "pocPhone", label: "POC Phone Number", type: "tel" },
  { id: "whatsapp", label: "WhatsApp Number", type: "tel" },
  { id: "email", label: "Other Email", type: "email" },
  { id: "schoolAddress", label: "School Address", type: "text" },
  // { id: "numberOfStudents", label: "Number of Students", type: "number" },
  { id: "state", label: "State", type: "text" },
  { id: "city", label: "City", type: "text" }
];

const isValidIndianPhone = (num) => /^[6-9]\d{9}$/.test(num);

const isUsernameAvailable = async (username) => {
  const q = query(
    collection(db, "Contingent Users'25"),
    where("username", "==", username)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty; // true if not found
};


const ContingentApplicationForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, id) => {
    setFormData({ ...formData, [id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key].toString().trim() === "") {
        toast.error(`Please fill out ${key}`);
        return;
      }
    }

    if (!isValidIndianPhone(formData.whatsapp)) {
      toast.error(`Invalid phone number in whatsapp field`);
      return;
    }

    const available = await isUsernameAvailable(formData.username);
    if (!available) {
      toast.error("Username already in use. Please choose another.");
      return;
    }

    try {
      setIsSubmitting(true);
      await addDoc(collection(db, "Contingent Users'25"), {
        ...formData,
        paymentSuccessful: false,
        applicationPassword: "Application Password will be provided after payment",
        timestamp: new Date()
      });
      toast.success("Form submitted successfully!");
      setFormData(initialState);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen pb-10"
      style={{
        backgroundImage: "url('/images/login/background-white-mirrored.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh"
      }}
    >
      <NavigationBar />
      <div className="max-w-4xl bg-[#1f2937] shadow-lg mt-2 rounded-xl p-6 mx-4 md:mx-auto">
        <h1 className="text-2xl font-bold text-center text-white mb-6 md:text-3xl py-2">
          Contingent Application Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
        >
          {fields.map(({ id, label, type }) => (
            <div key={id} className="flex flex-col">
              <label htmlFor={id} className="text-sm font-semibold mb-1 text-gray-200">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={(e) => handleChange(e, id)}
                className="border border-gray-600 rounded px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
          <div className="col-span-full mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 text-white font-semibold rounded-lg transition-all ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-600 hover:bg-yellow-700"
                }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContingentApplicationForm;