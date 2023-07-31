import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './style.css';
import Footer from '../footer';
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
    <>
    <section className="register-sec">
      <Navbar />
      <div className="Background" style={{
        paddingTop: "70px",
      }}>

        <h2 className="Headingg">Registration Page</h2>
        <div className="parent-register">
          <div className="both both1">
            <div
              onClick={handleIndividualClick}
            >
              <div className="mid">
                <button className="hero1">
                  <p className="hero-text">
                    Register as Individual
                  </p>
                </button>
              </div>
            </div>
            <div className="title">
              <ol className="ordered1">
                <li>Students directly register on the UNOSQ portal</li>
                <li>Students fill in personal details by themselves</li>
                <li>Students pay the registration fee directly to UNOSQ</li>
                <li>After payment approval, further communication will be done with students </li>
              </ol></div>
          </div>


          <div className="both both2">
            <div
              onClick={handleContingentClick} >
              <div className="mid">
                <button id="registerBtn" className="hero2">
                  <p className="hero-text">
                    Register as Contingent
                  </p>
                </button>
              </div>
            </div>
            <div id="listContainer" class="hidden">
              <div className="title">
                <ol className="ordered2">
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
      <Footer />
    </section>
    </>
  );
};
export default RegistrationPage;

