import React from "react";
import "bootstrap";
import "react-bootstrap";
import Section from "./comp/section/index";
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
// import Review from "./comp/reviews/index";
import Homepage from "./comp/section2";
import { Home } from "@mui/icons-material";
function App() {
  return (
    <div>
      {/* <Modal /> */}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Homepage />
            </>
          }
        />
        {/* <Route
          exact
          path="/individualpayment"
          element={<IndividualPayment />}
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
        <Route exact path="/DisplayResult" element={<DisplayResult />} /> */}

      </Routes>
    </div>
  );
}
export default App;
