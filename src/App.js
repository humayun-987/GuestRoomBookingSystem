import React from 'react';
import 'bootstrap';
import 'react-bootstrap';
import Navbar from './comp/Navbar/index';
import Section from './comp/section/index';
import Footer from './comp/footer';
import FAQs from './comp/FrequentlyAsked';
import {Route, Routes } from "react-router-dom";
import RegistrationPage from './comp/RegistrationPortal/index';
import IndividualRegistrationForm from './comp/RegistrationPortal/IndividualRegistration';
import ContingentRegistrationForm from './comp/RegistrationPortal/ContigentRegistration';


function App() {
  return (
    <div>
    {/* <Modal /> */}
    <Routes>



      <Route exact path="/" element={
      <> 
        <Navbar />
        <Section />
        <Footer />
      </>
    } />



      <Route exact path="/FAQs" element={
      <> 
        <Navbar />
        <FAQs />
        <Footer />
      </>
    } />


      <Route exact path="/register" element={<RegistrationPage />} />
      <Route exact path="/individualregister" element={<IndividualRegistrationForm />} />
      <Route exact path="/contingentregister" element={<ContingentRegistrationForm />} />


    </Routes>




    
    </div>
  );
}
export default App;
