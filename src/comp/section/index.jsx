import React from "react";

import head from "../../media/head.png";
import tab from "../../media/RJ.png";
import hod from "../../media/HD.png";
// import ResultTable from "../ResultTable";
import "./section.css";
import { NavLink } from "react-router-dom";
import Contact from "../contact/contact";
import Footer from "../footer";
import Navbar from "../Navbar";
import Header from "../header";

import Highlights from "../Highlights";

// import "bootstrap";
// import "react-bootstrap";

export default function Section() {
  return (
    <>
      <section className="complete-section">
        <Navbar />
        <Header />
        <div id="about" className="mt-40" style={{ padding: "10% 6%" }}>
          <h1 className="d-flex justify-content-center header">ABOUT US</h1>
          <div
            className="back mt-4 mb-4"
            style={{
              backgroundImage: `url({pic})`,
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header d-flex justify-content-center" id="panelsStayOpen-headingOne">
                  <button
                    style={{ backgroundColor: "lightblue", fontWeight: "bold" }}
                    className="accordion-button collapsed rounded-0"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseOne"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    WHAT IS UDGHOSH?
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionPanelsStayOpenExample"
                >
                  <div className="accordion-body">
                    Udghosh, the annual sports festival of IIT Kanpur is a real display of sportsmanship;
                    many of its champions have gone on to greatness. It allows outstanding pupils
                    nationwide to showcase and improve their sports talents. Competing with our rivals
                    and raising awareness for all major sports was the task. They left a legacy for us to
                    carry on, and we can boast of the strongest growth curve a sports festival in the
                    nation has ever seen. Our vision is unimpaired by the respect we have gained as a
                    festival.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <p className="accordion-header d-flex justify-content-center">
                  <button
                    style={{ backgroundColor: "lightblue", fontWeight: "bold" }}
                    className="accordion-button collapsed rounded-0"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    WHAT IS UNOSQ?
                  </button>
                </p>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">
                    Udghosh proudly hosts UNOSQ, <b>an open school quiz tournament designed for
                      students in grades 5 - 12</b>. This quiz serves as a platform to promote sports among
                    schoolchildren. Through this examination, students not only gain knowledge about
                    sports but also have their mental, logical, and verbal abilities tested and receive
                    national recognition. As an added benefit, UNOSQ organises online seminars
                    conducted by notable academic and sports figures, further enriching the learning
                    experience for the participants.
                    <b>The primary objective of UNOSQ is to give school children a platform to showcase
                      their talents and abilities</b>. It allows them to compete with students nationwide,
                    challenging their intellect and fostering self-confidence for their future endeavours. .
                    Additionally, UNOSQ provides an invaluable opportunity for children to meet and
                    interact with celebrated figures from the fields of education and sports.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <p className="accordion-header d-flex justify-content-center">
                  <button
                    style={{ backgroundColor: "lightblue", fontWeight: "bold" }}
                    className="accordion-button collapsed rounded-0"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    WHY UNOSQ?
                  </button>
                </p>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                    At its most fundamental level, UNOSQ aims to provide school
                    students a platform to showcase their talent at the topmost
                    level. It provides them a opportunity to compete with students
                    all over the country giving them a exposure of competition
                    outside their comfort zone, challenges their mind, help them
                    gain self confidence so that they can be ready for the future
                    endeavours. UNOSQ will provide an exposure to SPORTS and its
                    importance in students' lives that they would otherwise be
                    unaware of. UNOSQ also provides the students' an opportunity
                    to interact with the renowned personalities in the field of
                    education and sports.{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Highlights />
        {/* <section id="result" style={{ marginTop: "0%", padding: "0% 6%" }}>
          <h1 className="d-flex justify-content-center header" >PHASE-1 RESULT</h1>
           <ResultTable /> 
        </section> */}
        <section id="conduction" style={{ marginTop: "0%", padding: "0% 6%" }}>
          <h1 className="d-flex justify-content-center header">CONDUCTION</h1>
          <div
            className="d-flex justify-content-center row mt-4 mb-4"
            style={{ margin: "0" }}
          >
            <div class="card col-lg-12" style={{ marginBottom: "50px", width: "90%" }}>
              <div class="card-body card-body-why">
                <h5 class="card-title">Phase 1</h5>
                <p class="card-text">
                  The Phase 1 exam for UNOSQ will be conducted ONLINE .It will encompass a syllabus that includes object-type questions covering
                  various aspects such  as Logical Reasoning ,Verbal Ability,Quantitative Aptitude,and Sports.The duration of the exam will be 90 minutes.
                  From Phase 1,the top 100 performers will qualify for the Phase 2 Exam in each of the four pools.
                </p>
              </div>
            </div>

            <div class="card col-lg-12" style={{ marginBottom: "50px", width: "90%" }}>
              <div class="card-body card-body-why">
                <h5 class="card-title">Phase 2</h5>
                <p class="card-text">
                  The syllabus for Phase 2 of UNOSQ will remain the same as Phase 1,with an increase of difficulty level.
                  The duration of the Phase 2 exam will be reduced to 75 minutes.Additionally,engaging talks and exhibitions
                  will enhance the enthusiasm and excitement  of the students who qualify for Phase2.This crucial round will determine
                  the top three winners of UNOSQ'23,who will receive exciting prizes and complimentary passes to Udghosh Pronite.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="perks" style={{ padding: "0% 10%" }}>
          <div>
            <h1 className="d-flex justify-content-center header">PERKS </h1>{" "}
          </div>
          <div className="row perkss mt-4 mb-4">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <img
                style={{ width: "300px", float: "center", margin: "auto" }}
                src={tab}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <img
                style={{ width: "300px", float: "center", margin: "auto" }}
                src={hod}
              />
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <img
                style={{ width: "300px", float: "center", margin: "auto" }}
                src={head}
              />
            </div>
          </div>
        </section>
        <Contact />
        <Footer />
      </section>

    </>
  );
}