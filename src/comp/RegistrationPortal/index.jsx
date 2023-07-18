import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; 
import './RegistriationPortal.css';
import Footer from '../footer';

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
    <div className="Background" style={{
      height:"100vh"
    }}>
      
      <h2 className="Heading">Registration Page</h2>
      <div className="udghosh">
        <div className="both">
      <span 
        onClick={handleIndividualClick} 
        
      >
        <div className="mid1">
          <button className="hero1">Register as Individual</button>
        </div>
        </span>
        <div className="tittle">
        <ol className="ordered1">
           <li>Students directly register on the UNOSQ portal</li>
        <li>Students fill in personal details by themselves</li>
        <li>Students pay the registration fee directly to UNOSQ</li>
        <li>After payment approval, further communication will be done with students </li>
        </ol></div>
        </div>
      
      
        <div className="both">  
      <div
        onClick={handleContingentClick} > 
       

      <div className="mid2">
      <button id="registerBtn" className="hero2">Register as Contingent</button>
      </div>
       </div>
<div id="listContainer" class="hidden">
  <div className="title2"><ol className="ordered2">
    <li>Schools have to register on the UNOSQ portal</li>
    <li>Schools collect the information of students and send to UNOSQ</li>
    <li>Schools collect the fees from students and send to UNOSQ</li>
    <li>After payment approval, further communication will be done with students</li>
    </ol>
  </div>
</div>
</div>

      </div>
    </div>
  );
};
export default RegistrationPage;

