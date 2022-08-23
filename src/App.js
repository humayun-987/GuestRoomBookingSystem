import React from 'react';
import 'bootstrap';
import 'react-bootstrap';
import pic from "./images/VECT1.png";
import Navbar from './comp/navbar';
import Section from './comp/section';
import Footer from './comp/footer';
import Modal from './comp/modal'


function App() {
  return (

    <div>
    <Navbar />
    <Modal />
    <Section/>
    <Footer />
    </div>
  );
}




export default App;
