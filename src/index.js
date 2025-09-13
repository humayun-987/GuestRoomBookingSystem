// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./css/index.css";
import "./css/utils.css";
import FAQ from "./pages/FAQ.jsx";
import { IndividualLogin } from "./pages/IndividualLogin.jsx";
import { IndividualSignup } from "./pages/IndividualSignup.jsx";
import { ContingentSignup } from "./pages/Contingent_Signup.jsx";
import { ContingentLogin } from "./pages/Contingent_Login.jsx";
import ClosedRegistrationModal from "./pages/ClosedRegistrationModal.jsx";
// import Brochure from "./comp/Brochure/Brochure.jsx";
import IndividualProfilesContainer from "./pages/IndividualProfile.jsx";
import ContingentProfilesContainer from "./pages/ContingentProfile.jsx";
import IndividualPayment from "./comp/Payment/individualpayment";
import ContingentPayment from "./comp/Payment/contingentpayment";
import ContingentApplicationForm from "./pages/school_contingent_form.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Close } from "@mui/icons-material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/FAQ" element={<FAQ />} />
        {/* <Route path="/brochure" element={<Brochure />} /> */}
        <Route path="/individual_login" element={<IndividualLogin />} />
        {/* <Route path="/individual_signup" element={<IndividualSignup />} /> */}
        <Route path="/individual_signup" element={<ClosedRegistrationModal />} />
        {/* <Route path="/contingent_signup" element={<ContingentSignup />} /> */}
        <Route path="/contingent_signup" element={<ClosedRegistrationModal />} />
        <Route path="/contingent_login" element={<ContingentLogin />} />
        <Route path="/contingentPayment" element={<ContingentPayment />} />
        <Route path="/individualPayment" element={<IndividualPayment />} />
        <Route path="/individual_profile/:uid" element={<IndividualProfilesContainer />} />
        <Route path="/contingent_profile/:uid" element={<ContingentProfilesContainer />} />
        <Route path="/school_contingent_form" element={<ContingentApplicationForm />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
