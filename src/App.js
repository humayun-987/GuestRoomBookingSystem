import React from 'react';
import 'bootstrap';
import 'react-bootstrap';
import pic from "./images/VECT1.png";
import Navbar from './comp/navbar';
import Section from './comp/section';
import Footer from './comp/footer';
import Modal from './comp/modal';
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
      <Route exact path="/register" element={<RegistrationPage />} />
    </Routes>
    <Footer />
    </div>
  );
}
export default App;
