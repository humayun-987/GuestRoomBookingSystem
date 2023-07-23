import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { ProgressBar, Step } from "react-step-progress-bar";
import { toast, Toaster } from "react-hot-toast";
import "./individual.css";
import RegisterSuccess from "./Registersuccess";
import Navbar from "../Navbar"

const IndividualRegistrationForm = () => {
  // state for steps
  const [step, setstep] = useState(1);

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    dateofBirth: "",
    parentName: "",
    selectedClass: "",
    selectedPool: "",
    schoolName: "",
    studentMobile: "",
    parentMobile: "",
    whatsappNumber: "",
    parentEmail: "",
    selectedState: "",
    city: "",
  });

  let key, value;
  const handleInputData = (e) => {
    // input value from the form
    console.log(e.target.name);
    console.log(e.target.value);
    //updating for data state taking previous state and then adding new value to create new object
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
      doc(db, "individual registration", formData.fullName),
      formData
    );

    setFormData({
      fullName: "",
      dateofBirth: "",
      parentName: "",
      selectedClass: "",
      selectedPool: "",
      schoolName: "",
      studentMobile: "",
      parentMobile: "",
      whatsappNumber: "",
      parentEmail: "",
      selectedState: "",
      city: "",
    });
  };

  return (
    <>
      <section className="register-sec">
        <Toaster toastOptions={{ duration: 4000 }} />
        <Navbar />
        <div id="indHead" style={{
          paddingTop: "60px",
        }}>
          {step == 3 ? null :
            <div id="individualHead">
              <p>Individual Registration</p>
              <hr className="indHr" />
            </div>
          }
        </div>
        {step === 1 ? <PersonalDetails
          page={1}
          nextStep={nextStep}
          handleFormData={handleInputData}
          values={formData}
        />
          : step === 2 ? <ContactDetails
            page={2}
            nextStep={nextStep}
            prevStep={prevStep}
            handleFormData={handleInputData}
            handleSubmit={handleSubmit}
            values={formData}
          />
            : <RegisterSuccess />
        }

      </section>
    </>
  );
};

const PersonalDetails = ({ nextStep, handleFormData, values, page }) => {
  const validate = () => {
    if (
      !values.fullName ||
      !values.dateofBirth ||
      !values.parentName ||
      !values.selectedClass ||
      !values.selectedPool ||
      !values.schoolName
    ) {
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
    stepPercentage = 50;
  } else if (page === 2) {
    stepPercentage = 100;
  } else {
    stepPercentage = 0;
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div className="loginbody">
        <div className="container loginbox">
          <div className="row1">
            <div className="mx-auto">
              <div className="registercard border-0 my-5 con2">
                <div className="regimg">
                  <img src="/logo.png" alt="logo" className="reg-logo" />
                </div>
                <form className="register-card-body">
                  <p className="signin">Personal Details</p>
                  <div className="form">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleFormData}
                        placeholder="name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Full Name
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="date"
                        className="form-control"
                        name="dateofBirth"
                        value={values.dateofBirth}
                        onChange={handleFormData}
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Date of Birth
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="parentName"
                        value={values.parentName}
                        onChange={handleFormData}
                        placeholder="parents name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Parents Name
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        name="selectedClass"
                        value={values.selectedClass}
                        onChange={handleFormData}
                        required
                      >
                        <option value="">Select</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </select>
                      <label className="input" htmlFor="floatingInput">
                        Select Class:
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        name="selectedPool"
                        value={values.selectedPool}
                        onChange={handleFormData}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Youngsters(class 5-6)">
                          Pool Youngsters(class 5-6)
                        </option>
                        <option value="Rising Stars(class 7-8)">
                          Pool Rising Stars(class 7-8)
                        </option>
                        <option value="Champions(class 9-10)">
                          Pool Champions(class 9-10)
                        </option>
                        <option value="Pioneers(class 11-12)">
                          Pool Pioneers(class 11-12)
                        </option>
                      </select>
                      <label className="input" htmlFor="floatingInput">
                        Select Pool:
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="schoolName"
                        value={values.schoolName}
                        onChange={handleFormData}
                        placeholder="School name"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        School Name
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
      </div>
    </div>
  );
};

const ContactDetails = ({
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
    if (
      !values.studentMobile ||
      !values.parentMobile ||
      !values.parentEmail ||
      !values.selectedState ||
      !values.city ||
      !values.whatsappNumber
    ) {
      toast.error("All fields are compulsory");
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^\d{10}$/;
      if (!emailRegex.test(values.parentEmail)) {
        toast.error("Please enter a valid email address");
        return false;
      } else if (!phoneRegex.test(values.studentMobile)) {
        toast.error("Please enter a 10-digit phone number");
        return false;
      } else if (!phoneRegex.test(values.parentMobile)) {
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

  //creating error state for validation
  const submitFormData = (e) => {
    e.preventDefault();
    if (validate()) {
      handleSubmit();
      nextStep();
    }
  };

  var stepPercentage = 0;
  if (page === 1) {
    stepPercentage = 50;
  } else if (page === 2) {
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
              <div className="registercard border-0 shadow rounded-3 my-5 con2">
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
                        name="studentMobile"
                        value={values.studentMobile}
                        onChange={handleFormData}
                        placeholder="Student Mobile Number"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Student Mobile Number
                      </label>
                    </div>

                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        name="parentMobile"
                        value={values.parentMobile}
                        onChange={handleFormData}
                        placeholder="Parent Mobile Number"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Parent Mobile Number
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
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control"
                        name="parentEmail"
                        value={values.parentEmail}
                        onChange={handleFormData}
                        placeholder="Parents Email"
                        required="true"
                        autoComplete="off"
                      />
                      <label className="input" htmlFor="floatingInput">
                        Parents Email
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
        <div
          onClick={prevStep}
          className={`indexedStep ${page == 1 ? "accomplished" : null}`}
        >
          1
        </div>
        <div className={`indexedStep ${page == 2 ? "accomplished" : null}`}>
          2
        </div>
      </div>
    </>
  );
};

export default IndividualRegistrationForm;
