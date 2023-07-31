import React, { useState } from 'react';
import "./navbar.css"
import { HashLink as Navlink } from "react-router-hash-link"
export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const toggle = () => setIsopen(!isOpen);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-basic">
          <div className="navbar-bg">
            <div className="left-attach">
              <Navlink className='link-Udg' to="https://udghosh.org.in">
                <img src="/logo.png" alt="" id="nav-logo" />
              </Navlink>
            </div>
            <Navlink className='nav-item' to="/#about" smooth duration={500}>
              <p className="nav-item-text">
                About
              </p>
            </Navlink>
            <Navlink className='nav-item' to="/brochure/#" smooth duration={500}>
              <p className="nav-item-text">
                Brochure
              </p>
            </Navlink>
            <Navlink className='nav-item' target='_self' to="/#" smooth duration={500}>
              <img src="/UNOSQ-01-removebg-preview.png" alt="" id="nav-logo" />
            </Navlink>
            <Navlink className='nav-item' to="/#contact" smooth duration={500}>
              <p className="nav-item-text">
                Contact
              </p>
            </Navlink>
            <Navlink className='nav-item' to="/FAQs/#FAQs-section" smooth duration={500}>
              <p className="nav-item-text">
                FAQs
              </p>
            </Navlink>
            <div className="right-attach">
              <Navlink className='bs-a-n register-button' to="/register" smooth duration={500}>
                <p className="nav-item-text">
                  Register
                </p>
              </Navlink>
            </div>
          </div>


          {/* Navbar for small screens */}
          <div className="navbar-bg-sm">
            <div className="left-attach">
              <Navlink className='link-Udg' to="https://udghosh.org.in">
                <img src="/logo.png" alt="" id="nav-logo" />
              </Navlink>
            </div>
            <div className="right-attach" onClick={toggle}>
              {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
            </div>
            <Navlink to="/" target='_self' smooth duration={500} className="nav-item">
              <img src="/UNOSQ-01-removebg-preview.png" alt="" id="nav-logo" />
            </Navlink>
          </div>
          <div className={`${isOpen ? "visible" : "not-visible"} navbar-bg-sm-2`}>
            <Navlink className='nav-item-sm' to="/#about" smooth duration={500}>
              <p className="nav-item-text">
                About
              </p>
            </Navlink>
            <Navlink className='nav-item-sm' to="/brochure/#" smooth duration={500}>
              <p className="nav-item-text">
                Brochure
              </p>
            </Navlink>
            <Navlink className='nav-item-sm' to="/#contact" smooth duration={500}>
              <p className="nav-item-text">
                Contact
              </p>
            </Navlink>
            <Navlink className='nav-item-sm' to="/FAQs/#FAQs-section" smooth duration={500}>
              <p className="nav-item-text">
                FAQs
              </p>
            </Navlink>
            <Navlink className='nav-item-sm' to="/register" smooth duration={500}>
              <Navlink className='bs-a-n register-button' to="/register" smooth duration={500}>
                <p className="nav-item-text">
                  Register
                </p>
              </Navlink>
            </Navlink>
          </div>

          {/* toggle by clicking anywhere in page */}
          <div className={`${isOpen ? "visible" : "not-visible"} makegreyeverything`} onClick={toggle}></div>
        </div>
      </nav>
    </>
  );
}