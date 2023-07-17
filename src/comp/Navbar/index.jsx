import React, { useState } from 'react';
import "./navbar.css"
import { HashLink as Navlink } from "react-router-hash-link"
export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen(!isOpen);
  return (
    <>
    <nav className="navbar">
      <div className="navbar-basic navbar-bg">

        <Navlink className='nav-item' to="/#" smooth duration={500}>
          <p className="nav-item-text">
            Home
          </p>
        </Navlink>
        <Navlink className='nav-item' to="/#about" smooth duration={500}>
          <p className="nav-item-text">
            About
          </p>
        </Navlink>
        <Navlink className='nav-item' target='_blank' to="https://unosq.udghosh.org.in/" smooth duration={500}>
          <img src="/UNOSQ-01-removebg-preview.png" alt="" id="nav-logo" />
        </Navlink>
        <Navlink className='nav-item'  to="/#contact" smooth duration={500}>
          <p className="nav-item-text">
            Contact
          </p>
        </Navlink>
        <Navlink className='nav-item' to="/#FAQs" smooth duration={500}>
          <p className="nav-item-text">
            FAQs
          </p>
        </Navlink>
        <div className="reg-btn">
          <Navlink className='bs-a-n register-button' to="/register" smooth duration={500}>
            <p className="nav-item-text">
              Register
            </p>
          </Navlink>
        </div>
      </div>


      {/* Navbar for small screens */}
      {/* <div className="navbar-basic navbar-bg-sm">
        <Navlink to="https://udghosh.org.in" smooth duration={500} className="logo">
          <img src="/logo.png" alt="" id="udg-logo" />
        </Navlink>
        <div className="nav-item-sm" onClick={toggle}>
          {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </div>

      </div> */}
    </nav>
    </>
  );
}