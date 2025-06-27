import React from "react";
import "bootstrap";
import "react-bootstrap";
import Section from "./comp/section/index";

import IndividualLogin from "./comp/IndividualLogin/IndividualLogin";
import IndividualSignup from "./comp/IndividualSignUp/IndividualSignup";
import IndividualProfilesContainer from "./comp/IndividualProfile/IndividualProfile";
import ContingentLogin from "./comp/ContingentLogin/ContingentLogin";
import ContingentSignup from "./comp/ContingentSignup/ContingentSignup";
import ContingentProfile from "./comp/ContingentProfile/ContingentProfile";
import FAQs from "./comp/FrequentlyAsked";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "./comp/RegistrationPortal/index";
import IndividualRegistrationForm from "./comp/RegistrationPortal/IndividualRegistration";
import ContingentRegistrationForm from "./comp/RegistrationPortal/ContigentRegistration";
import Brochure from "./comp/Brochure/Brochure";
import { RegistrationClosed } from "./comp/registrationClosed";
import Payment from "./comp/Payment";
import IndividualPayment from "./comp/Payment/individualpayment";
import ContingentPayment from "./comp/Payment/contingentpayment";
import DisplayResult from "./comp/DisplayResult/DisplayResult";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import Review from "./comp/reviews/index";

function App() {
  return (
    <>
      <ToastContainer />
      <div>
        {/* <Modal /> */}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Section />
              </>
            }
          />
          <Route
            exact
            path="/individualpayment"
            element={<IndividualPayment />}
          />
          <Route
            exact
            path="/individual_signup"
            element={<IndividualSignup />}
          />
          <Route
            exact
            path="/individual_login"
            element={<IndividualLogin />}
          />
          <Route
            path="/individual_profile/:uid"
            element={<IndividualProfilesContainer />}
          />
          <Route
            exact
            path="/contingent_signup"
            element={<ContingentSignup />}
          />
          <Route
            exact
            path="/contingent_login"
            element={<ContingentLogin />}
          />
          <Route
            path="/contingent_profile/:uid"
            element={<ContingentProfile />}
          />

          <Route
            exact
            path="/contingentpayment"
            element={<ContingentPayment />}
          />


          <Route
            exact
            path="/FAQs"
            element={
              <>
                <FAQs />
              </>
            }
          />

          <Route exact path="/register" element={<RegistrationClosed />} />
          <Route
            exact
            path="/individualregister"
            element={<IndividualRegistrationForm />}
          />
          <Route
            exact
            path="/contingentregister"
            element={<ContingentRegistrationForm />}
          />
          <Route exact path="/brochure" element={<Brochure />} />
          <Route exact path="/DisplayResult" element={<DisplayResult />} />

        </Routes>
      </div>
    </>
  );
}
export default App;
