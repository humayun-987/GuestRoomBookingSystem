import React from 'react';
import 'bootstrap';
import 'react-bootstrap';
import Navbar from './comp/Navbar/index';
import Section from './comp/section/index';
import Reviews from './comp/Reviews/card';
import Footer from './comp/footer';
import FAQs from './comp/FrequentlyAsked';

import {Route, Routes } from "react-router-dom";
import RegistrationPage from './comp/RegistrationPortal'


function App() {
  return (
    <div>
    {/* <Modal /> */}
    <Routes>



      <Route exact path="/" element={
      <> 
        <Navbar />
        <Section />
      </>
    } />



      <Route exact path="/FAQs" element={
      <> 
        <Navbar />
        <FAQs />
      </>
    } />


      <Route exact path="/register" element={<RegistrationPage />} />


    </Routes>




    <Footer />
    </div>
  );
}
export default App;
