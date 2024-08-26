import React, { useState } from "react";
import "./style.css";

const ContingentPayment = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="register-success-body">
      <img className="brochure-background" src="/bg-head.jpg" alt="Background" />
      <div className="register-success-cont">
        <h1 className="finalmessage">Thanks for registering for UNOSQ'24.</h1>
        <p className="payment-heading">Please refer to the PDF below for payment instructions:</p>

        <div className="payment-container">
          <div className="pdf-container">
            <iframe
              src="https://drive.google.com/file/d/1SvDOjNgqun4kpXLZY19wk-B__UQyETcx/preview"
              className="pdf-frame"
              title="Payment Instructions"
            ></iframe>
          </div>
          <div className="details-and-buttons">
            <div className="payment-details">
              <h2 className="payment-heading">Contingent Payment Details</h2>
              <p>
                Please make a payment to the following Bank Account:<br />
                Account Number: <strong>37926189366</strong><br />
                IFSC code: <strong>SBIN0001161</strong><br />
                Account Holder's Name: <strong>CDTE, IIT Kanpur</strong><br />
                Branch: <strong>IIT KANPUR</strong><br />
                Amount: <strong>₹120 x (no. of students)</strong><br /><br />
              </p>
            </div>
            <div className="buttons-container">
              {/* Form Submission Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdSZRsXqZDPpDjtMdzmKVaBLulNah5XYXd9JBL9qhV4Q7ngyQ/viewform?usp=sf_link"
                className="payment-button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Click Here to Submit Payment Receipt
              </a>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="payment-info-section" style={{fontSize: "20px"}}>
          <p><strong>Note:</strong> Filling out the form is mandatory for your registration to be considered.</p>
        </div>
      </div>
    </div>
  );
};

export default ContingentPayment;
