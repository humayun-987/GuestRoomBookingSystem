import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import './RegistriationPortal.css'
import Footer from "../footer";
import Navbar from "../Navbar";


export const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isSelectedIndividual, setIsSelectedIndividual] = useState(false);
  const [isSelectedContingent, setIsSelectedContingent] = useState(false);

  const handleIndividualClick = () => {
    navigate("/individualregister");
  };

  const handleContingentClick = () => {
    navigate("/contingentregister");
  };

  return (
    <div className="Background">
      <Navbar />
      <h2 className="Heading">Registration Page</h2>
      <div className="udghosh">
      <span
        onClick={handleIndividualClick} className="hero"
        
      >
        Register as Individual
      </span>
 
      <span
        onClick={handleContingentClick}

      >
        Register as Contingent
      </span>
      </div>
      <Footer />
    </div>
  );
};
export default RegistrationPage;

