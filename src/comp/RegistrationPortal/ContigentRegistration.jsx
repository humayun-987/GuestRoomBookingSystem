import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const ContingentRegistrationForm = () => {
    const [schoolName, setSchoolName] = useState("");
    const [principalName, setPrincipalName] = useState("");
    const [pocName, setPocName] = useState("");
    const [principalMobile, setPrincipalMobile] = useState("");
    const [pocMobile, setPocMobile] = useState("");
    const [whatsappNumber, setWhatsappNumber] = useState("");
    const [principalEmail, setPrincipalEmail] = useState("");
    const [pocEmail, setPocEmail] = useState("");
    const [schoolAddress, setSchoolAddress] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [city, setCity] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {
        schoolName,
        principalName,
        pocName,
        principalMobile,
        pocMobile,
        whatsappNumber,
        principalEmail,
        pocEmail,
        schoolAddress,
        selectedState,
        city,
      };
  
      await setDoc(doc(db, "Contingent reistration", schoolName), formData);
      console.log(formData);
  
      setSchoolName("");
      setPrincipalName("");
      setPocName("");
      setPrincipalMobile("");
      setPocMobile("");
      setWhatsappNumber("");
      setPrincipalEmail("");
      setPocEmail("");
      setSchoolAddress("");
      setSelectedState("");
      setCity("");
    };
  
    const states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          School's Name:
          <input
            type="text"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          Principal's Name:
          <input
            type="text"
            value={principalName}
            onChange={(e) => setPrincipalName(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          POC's Name:
          <input
            type="text"
            value={pocName}
            onChange={(e) => setPocName(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          Principal's Mobile Number:
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={principalMobile}
            onChange={(e) => setPrincipalMobile(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          POC's Mobile Number:
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={pocMobile}
            onChange={(e) => setPocMobile(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          WhatsApp Number:
          <input
            type="tel"
            pattern="[0-9]{10}"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          Principal's Email Address:
          <input
            type="email"
            value={principalEmail}
            onChange={(e) => setPrincipalEmail(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          POC's Email Address:
          <input
            type="email"
            value={pocEmail}
            onChange={(e) => setPocEmail(e.target.value)}
            required
          />
        </label>
        <br />
  
        <label>
          School Address:
          <textarea
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
            required
          ></textarea>
        </label>
        <br />
  
        <label>
          Select State:
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            required
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <br />
  
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <br />
  
        <button type="submit">Submit</button>
      </form>
    );
  };

export default ContingentRegistrationForm;