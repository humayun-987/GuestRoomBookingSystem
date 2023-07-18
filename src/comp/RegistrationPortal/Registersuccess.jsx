import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterSuccess = () => {
  const Navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      Navigate("/");
    }, 20000); // 20 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [Navigate]);

  return (
    <div>
      <div className="message">
        <h1 className="finalmessage">Registration Successful</h1>
        <p className="waitmessage">
          You will be informed regarding login process later
        </p>
        <p className="waitmessage">
          You will be redirected to the main website in 20s
        </p>
      </div>
    </div>
  );
};

export default RegisterSuccess;
