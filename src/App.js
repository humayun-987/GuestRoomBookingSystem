import React from "react";
import "bootstrap";
import "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BiLogoFacebook, BiLogoInstagram, BiLogoYoutube, BiLogoWhatsapp, BiLogoLinkedin, BiLogoTwitter } from "react-icons/bi";
import { Route, Routes } from "react-router-dom";
import FAQ from "./pages/FAQ.jsx";
import { IndividualLogin } from "./pages/IndividualLogin.jsx";
import { IndividualSignup } from "./pages/IndividualSignup.jsx";
import { ContingentSignup } from "./pages/Contingent_Signup.jsx";
import { ContingentLogin } from "./pages/Contingent_Login.jsx";
import IndividualProfilesContainer from "./pages/IndividualProfile.jsx";
import ContingentProfilesContainer from "./pages/ContingentProfile.jsx"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <div></div>
    </>
  );
}
export default App;
