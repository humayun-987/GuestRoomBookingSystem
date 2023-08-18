import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import './success.css';
import { NavLink } from "react-router-dom";

const RegisterSuccess = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <>
      {(location.pathname == "/individualregister") &&
        (<div className="register-success-body">
          <div className="register-success-cont">
          <h1 className="finalmessage">Thanks for registering for UNOSQ'23.</h1>
          <p className="waitmessage">
            Please make a payment of INR 120 to the following Portal:
            SBI Collect Portal: <a href="https://www.onlinesbi.sbi/sbicollect/icollecthome.htm" target="_blank">https://www.onlinesbi.sbi/sbicollect/icollecthome.htm</a>
            Find the Payment Procedure in the Document below:
            Google Doc: <a href="https://docs.google.com/document/d/1IoEzKILGNNdA3cVArrCam1oBJuUAHxMPwz9w65f0a_U/edit?usp=sharin" target="_blank">https://docs.google.com/document/d/1IoEzKILGNNdA3cVArrCam1oBJuUAHxMPwz9w65f0a_U/edit?usp=sharing</a>

          </p>
          <p className="waitmessage">
            After making the payment, please fill the Google Form along with the payment receipt otherwise your registration will not be considered.
            Google Form: <a href="https://forms.gle/tN1k4xHGknrvW6np9" target="_blank">https://forms.gle/tN1k4xHGknrvW6np9</a>
          </p>
          <p>
            Also, we wanted to inform you about an important update regarding UNOSQ'23. Due to unavoidable circumstances, the Phase 1 Exam has been Rescheduled to 27th August.
          </p>
          <h3>Important Dates:</h3>
          <ul>
            <li>Registration Deadline: 23 August</li>
            <li>Phase 1 Exam: 27 August</li>
            <li>Result Phase 1: 31 August</li>
            <li>Phase 2 Exam: 3 September</li>
            <li>Result Phase 2: 7 September</li>
            <li>Felicitation: 8 October</li>
          </ul>
          <p>To further assist your preparation, we are sharing a Sample Question Booklet through the Google Drive link below.
            Drive Link: <a href="https://drive.google.com/drive/folders/1WD0k6k4q7zsK_GH4pCTrI0EJ9Q5JSFwB" target="_blank">https://drive.google.com/drive/folders/1WD0k6k4q7zsK_GH4pCTrI0EJ9Q5JSFwB</a></p>
          <h3>Thank you for your attention to this matter.</h3>
         <div className="go-to-home-cont"><NavLink to="/"className="go-to-home" >Go to Home</NavLink></div>
        </div>
        </div>)
      }
      {(location.pathname == "/contingentregister") &&
        (<div className="register-success-body">
          <div className="register-success-cont">
          <h1 className="finalmessage">Thanks for registering for UNOSQ'23.</h1>
          <p className="waitmessage">
            Please make a payment of ₹120 × (no. of students) to the following Bank Account:
          <ul>
            <li>Account Number: 10426002126</li>
            <li>IFSC code: SBIN0001161</li>
            <li>Account Holder's Name: Registrar, IIT Kanpur</li>
            </ul>
          </p>
          {/* <p className="waitmessage">
            Please share the list of students registered for UNOSQ in the Excel file attached, along with the payment screenshot in the Google form below:
            Excel File:
          </p> */}
          {/* <a href="https://docs.google.com/spreadsheets/d/1kjPLZabqpykURKdNU06kNhEBVe_PUpQN/edit?usp=sharing&ouid=106799655325428579115&rtpof=true&sd=true">https://docs.google.com/spreadsheets/d/1kjPLZabqpykURKdNU06kNhEBVe_PUpQN/edit?usp=sharing&ouid=106799655325428579115&rtpof=true&sd=true</a> */}
          <p>Google Form: <a href="https://forms.gle/3i1BvQEr3jKPfu8o8" target="_blank">https://forms.gle/3i1BvQEr3jKPfu8o8</a></p>
          <div className="go-to-home-cont"><NavLink to="/" className="go-to-home">Go to Home</NavLink></div>
        </div>
        </div>)
      }
    </>
  );
};

export default RegisterSuccess;
