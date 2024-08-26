import React, { useState ,useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Payment = () => {
  // const [showIndividualDetails, setShowIndividualDetails] = useState(false);
  // const [showContingentDetails, setShowContingentDetails] = useState(false);

  // const toggleIndividualDetails = () => {
  //   setShowIndividualDetails(!showIndividualDetails);
  // };

  // const toggleContingentDetails = () => {
  //   setShowContingentDetails(!showContingentDetails);
  // };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="register-success-body">
      <div className="register-success-cont">
        <h1 className="finalmessage">Thanks for registering for UNOSQ'24.</h1>

        <div className="dropdown-section">
        <button
            onClick={() => toggleDropdown("individual")}
            className="dropdown-button"
          >
            Individual Payment Details
          </button>
          <div
            className={`dropdown-content ${
              activeDropdown === "individual" ? "show" : ""
            }`}
          >
          Please make a payment of <b>₹120</b> through SBI Collect:<br></br>
            <a href="https://www.onlinesbi.sbi/sbicollect/">https://www.onlinesbi.sbi/sbicollect/</a>
            <br></br> <br></br>

              You can refer to the payment instructions in the following pdf:<br></br>
            <a
              href="https://drive.usercontent.google.com/u/0/uc?id=1wF9mecPl7X6vojg-1GW6UySEZN9I9MYZ&export=download"
              target="_blank"
              rel="noopener noreferrer"
            >
              How To Pay
            </a> 
            <br></br>


            Once the payment is done, kindly fill the following google form: <br></br>
            <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSddliZouSgy-m3n45-dEXD0OYj6Ht7CmMqRrqqByiCOMzd3EQ/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Individual Receipt Form
          </a><br /> <br/>
          <strong>Note:</strong> Filling out the form is mandatory for your registration to be considered.

          </div>
        </div>

        <div className="dropdown-section">
        <button
            onClick={() => toggleDropdown("contingent")}
            className="dropdown-button"
          >
            Contingent Payment Details
          </button>
          <div
            className={`dropdown-content ${
              activeDropdown === "contingent" ? "show" : ""
            }`}
          >
          Please make a payment to the following Bank Account:<br></br>
              Account Number: <b>37926189366</b> <br></br>
              IFSC code: <b>SBIN0001161</b> <br></br>
              Account Holder's Name:  <b>CDTE, IIT Kanpur</b> <br></br>
              Branch: <b>IIT KANPUR</b> <br></br>
              Amount: <b>₹120 x (no. of students)</b> <br></br> <br></br>

              You can refer to the follwing pdf for payment:<br></br>
            <a
              href="https://drive.usercontent.google.com/u/0/uc?id=1SvDOjNgqun4kpXLZY19wk-B__UQyETcx&export=download"
              target="_blank"
              rel="noopener noreferrer"
            >
              How To Pay
            </a> 
            <br></br>


            Once the payment is done, kindly fill the following google form: <br></br>
            <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdSZRsXqZDPpDjtMdzmKVaBLulNah5XYXd9JBL9qhV4Q7ngyQ/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contingent Receipt Form
          </a> <br /> <br/>
          <strong>Note:</strong> Filling out the form is mandatory for your registration to be considered.
          </div>
        </div>


        {/* <div className="go-to-home-cont">
          <NavLink to="/" className="go-to-home">
            Go to Home
          </NavLink>
        </div> */}
      </div>
    </div>
  );
};

export default Payment;
