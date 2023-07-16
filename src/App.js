import React from 'react';
import 'bootstrap';
import 'react-bootstrap';
import Navbar from './comp/Navbar';
import Section from './comp/section/index';
import Footer from './comp/footer';
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
