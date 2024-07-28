import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ProgressBar, Step } from "react-step-progress-bar";
import { toast, Toaster } from "react-hot-toast";
import "./individual.css";
import RegisterSuccess from "./Registersuccess";
import Navbar from "../Navbar";

const ContingentRegistrationForm = () => {
  // state for steps
  const [step, setstep] = useState(1);

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const [formData, setFormData] = useState({
    schoolName: "",
    principalName: "",
    pocName: "",
    principalMobile: "",
    pocMobile: "",
    whatsappNumber: "",
    principalEmail: "",
    pocEmail: "",
    schoolAddress: "",
    selectedState: "",
    city: "",
  });

  let key, value;
  const handleInputData = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);

    key = e.target.name;
    value = e.target.value;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(formData);

    await setDoc(
      doc(db, "Contingent Registration 24", formData.schoolName),
      formData
    );

    setFormData({
      schoolName: "",
      principalName: "",
      pocName: "",
      principalMobile: "",
      pocMobile: "",
      whatsappNumber: "",
      principalEmail: "",
      pocEmail: "",
      schoolAddress: "",
      selectedState: "",
      city: "",
    });
  };

  return (
    <>
      <section className="register-sec">
        <Toaster toastOptions={{ duration: 4000 }} />
        <Navbar />
        <div
          id="indHead"
          style={{
            paddingTop: "60px",
          }}
        >
          {step == 4 ? null : (
            <div id="individualHead">
              <p>Contingent Registration</p>
              <hr className="indHr" />
            </div>
          )}
        </div>
        {step === 1 ? (
          <SchoolDetails
            page={1}
            nextStep={nextStep}
            handleFormData={handleInputData}
            values={formData}
          />
        ) : step === 2 ? (
          <ContactDetails
            page={2}
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormData={handleInputData}
            values={formData}
          />
        ) : step === 3 ? (
          <SchoolAddress
            Details
            page={3}
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormData={handleInputData}
            handleSubmit={handleSubmit}
            values={formData}
          />
        ) : (
          <RegisterSuccess />
        )}
      </section>
    </>
  );
};

const SchoolDetails = ({ nextStep, handleFormData, values, page }) => {
  const validate = () => {
    if (!values.schoolName || !values.principalName || !values.pocName) {
      return false;
    } else {
      return true;
    }
  };
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2

    if (validate()) nextStep();
    else toast.error("All fields are compulsory");
  };

  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 33;
  } else if (page === 2) {
    stepPercentage = 66;
  } else if (page === 3) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="registercard border-0 con2">
                <div className="regimg">
                  <img src="/logo.png" alt="logo" className="reg-logo" />
                </div>
                <form className="register-card-body">
                  <p className="signin">School Details</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="schoolName"
                        value={values.schoolName}
                        onChange={handleFormData}
                        placeholder="School Name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        School Name
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="principalName"
                        value={values.principalName}
                        onChange={handleFormData}
                        placeholder="Principal's Name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Principal's Name
                      </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="pocName"
                        value={values.pocName}
                        onChange={handleFormData}
                        placeholder="POC's Name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        POC's Name
                      </label>
                    </div>

                    <button
                      className="text-uppercase button-reg"
                      onClick={submitFormData}
                      id="next"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Steps">
        <div className={`indexedStep ${page == 1 ? "accomplished" : null}`}>
          1
        </div>
        <div
          onClick={submitFormData}
          className={`indexedStep ${page == 2 ? "accomplished" : null}`}
        >
          2
        </div>
        <div className={`indexedStep ${page == 3 ? "accomplished" : null}`}>
          3
        </div>
      </div>
    </>
  );
};

const ContactDetails = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  page,
}) => {
  const validate = () => {
    if (
      !values.principalMobile ||
      !values.pocMobile ||
      !values.principalEmail ||
      !values.pocEmail ||
      !values.whatsappNumber
    ) {
      toast.error("All fields are compulsory");
      return false;
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(values.principalMobile)) {
        toast.error("Please enter a 10-digit phone number");
        return false;
      } else if (!phoneRegex.test(values.pocMobile)) {
        toast.error("Please enter a 10-digit phone number");
        return false;
      } else if (!phoneRegex.test(values.whatsappNumber)) {
        toast.error("Please enter a 10-digit phone number");
        return false;
      } else {
        return true;
      }
    }
  };

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2

    if (validate()) nextStep();
  };

  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 33;
  } else if (page === 2) {
    stepPercentage = 66;
  } else if (page === 3) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="registercard border-0 rounded-3 con2">
                <div className="regimg">
                  <img src="/logo.png" alt="logo" className="reg-logo" />
                </div>
                <form className="register-card-body">
                  <p className="signin">Contact Details</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="principalMobile"
                        value={values.principalMobile}
                        onChange={handleFormData}
                        placeholder="Student Mobile Number"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Principal's Mobile Number
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="pocMobile"
                        value={values.pocMobile}
                        onChange={handleFormData}
                        placeholder="POC's Mobile Number"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        POC's Mobile Number
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="principalEmail"
                        value={values.principalEmail}
                        onChange={handleFormData}
                        placeholder="Principal Email"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Principal's Email
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="pocEmail"
                        value={values.pocEmail}
                        onChange={handleFormData}
                        placeholder="POC's Email"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        POC's Email
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="whatsappNumber"
                        value={values.whatsappNumber}
                        onChange={handleFormData}
                        placeholder="Whatsapp Number"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Whatsapp Number
                      </label>
                    </div>
                    <button
                      className="text-uppercase button-reg"
                      onClick={prevStep}
                      id="prev"
                    >
                      Prev
                    </button>
                    <button
                      className="text-uppercase button-reg"
                      onClick={submitFormData}
                      id="next"
                    >
                      Next
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Steps">
        <div
          onClick={prevStep}
          className={`indexedStep ${page == 1 ? "accomplished" : null}`}
        >
          1
        </div>
        <div className={`indexedStep ${page == 2 ? "accomplished" : null}`}>
          2
        </div>
        <div
          onClick={submitFormData}
          className={`indexedStep ${page == 3 ? "accomplished" : null}`}
        >
          3
        </div>
      </div>
    </>
  );
};

const SchoolAddress = ({
  nextStep,
  handleFormData,
  handleSubmit,
  prevStep,
  values,
  page,
}) => {
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const validate = () => {
    if (!values.schoolAddress || !values.selectedState || !values.city) {
      return false;
    } else {
      return true;
    }
  };

  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2

    if (validate()) {
      handleSubmit();
      nextStep();
    } else toast.error("All fields are compulsory");
  };

  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 33;
  } else if (page === 2) {
    stepPercentage = 66;
  } else if (page === 3) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="registercard border-0 rounded-3 con2">
                <div className="regimg">
                  <img src="/logo.png" alt="logo" className="reg-logo" />
                </div>
                <form className="register-card-body">
                  <p className="signin">Address</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <textarea
                        type="text"
                        className="form-control"
                        name="schoolAddress"
                        value={values.schoolAddress}
                        onChange={handleFormData}
                        placeholder="School's Address"
                        required="true"
                        autoComplete="off"
                      ></textarea>
                      <label className="input" htmlFor="floatingInput">
                        School's Address
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        name="selectedState"
                        value={values.selectedState}
                        onChange={handleFormData}
                        required
                      >
                        <option value="">Select</option>
                        {states.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <label className="input" htmlFor="floatingInput">
                        Select State:
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={values.city}
                        onChange={handleFormData}
                        placeholder="City"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        City
                      </label>
                    </div>

                    <button
                      className="text-uppercase button-reg"
                      onClick={prevStep}
                      id="prev"
                    >
                      Prev
                    </button>
                    <button
                      className="text-uppercase button-reg"
                      onClick={submitFormData}
                      id="next"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Steps">
        <div className={`indexedStep ${page == 1 ? "accomplished" : null}`}>
          1
        </div>
        <div
          onClick={prevStep}
          className={`indexedStep ${page == 2 ? "accomplished" : null}`}
        >
          2
        </div>
        <div
          onClick={submitFormData}
          className={`indexedStep ${page == 3 ? "accomplished" : null}`}
        >
          3
        </div>
      </div>
    </>
  );
};

export default ContingentRegistrationForm;
