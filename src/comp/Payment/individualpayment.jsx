import React from "react";
import "./style.css";
import NavigationBar from "../../components/NavigationBar";
const IndividualPayment = () => {
  return (
    <div className="register-success-body">
      {/* <img className="brochure-background" src="/bg-head.jpg" alt="Background" /> */}
      <NavigationBar/>
      <div className="register-success-cont">
        <h1 className="finalmessage">Thanks for registering for UNOSQ'24.</h1>

        <p className="payment-heading">Please refer to the PDF below for payment instructions:</p>
        <p>Please make a payment of <strong>₹120</strong> through SBI Collect.</p>

        <div className="payment-container">
          <div className="pdf-container">
            <iframe
              src="https://drive.google.com/file/d/1wF9mecPl7X6vojg-1GW6UySEZN9I9MYZ/preview"
              className="pdf-frame"
              title="Payment Instructions PDF"
            ></iframe>
          </div>
          <div className="buttons-container">
            {/* Payment Link Button */}
            <a
              href="https://www.onlinesbi.sbi/sbicollect/"
              className="payment-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Here to Pay via SBI Collect
            </a>

            {/* Form Submission Button */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSddliZouSgy-m3n45-dEXD0OYj6Ht7CmMqRrqqByiCOMzd3EQ/viewform?usp=sf_link"
              className="payment-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click Here to Submit Payment Receipt
            </a>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="payment-info-section" style={{fontSize: "20px"}}>
          <p>
            <strong>Note:</strong> Filling out the form is mandatory for your
            registration to be considered.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualPayment;
