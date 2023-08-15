import React, { useEffect } from "react";

import head from "../../media/head.png";
import tab from "../../media/RJ.png";
import hod from "../../media/HD.png";
// import ResultTable from "../ResultTable";
import Timeline from "../Timeline";
import Reviews from "../reviews/card";
import "./section.css";
import { NavLink } from "react-router-dom";
import Contact from "../contact/contact";
import Footer from "../footer";
import Navbar from "../Navbar";
import Header from "../header";
import { Leftfade, Rightfade, Bottomfade, FadeSrub, NewRightfade } from "../ScrolltriggerFunc/ScrolltriggerFunc";
import AboutUs from "../About US/About";

import Highlights from "../Highlights";
import Partns from "../Partners";

// import "bootstrap";
// import "react-bootstrap";
const reviews = [
  {
    reviewerName: "John Doe",
    reviewerOrganization: "ABC School",
    reviewText: "This product is amazing! I couldn't be happier with my purchase.",
    imageUrl: "https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp",
  },
  {
    reviewerName: "Jane Smith",
    reviewerOrganization: "ABC School",
    reviewText: "Great product. It exceeded my expectations.",
    imageUrl: "https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp",
  },
  {
    reviewerName: "Mike Johnson",
    reviewerOrganization: "ABC School",
    reviewText: "Decent product. Could use some improvements.",
    imageUrl: "https://qph.cf2.quoracdn.net/main-qimg-134e3bf89fff27bf56bdbd04e7dbaedf.webp",
  },
];
export default function Section() {
  useEffect(() => {
    Leftfade();
    Rightfade();
    Bottomfade();
    // Discanim();
    FadeSrub();
  });

  return (
    <>
      <section className="complete-section" style={{
        width: "100%",
      }}>
        <Navbar />
        <Header />
        <AboutUs />
        <div className="mt-40 anim-fade-bot" style={{ padding: "6% 6% 0 6%" }}>
          <h1 className="d-flex justify-content-center header">Conduction</h1>
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
                    style={{ fontWeight: "bold" }}
                    className="accordion-button collapsed rounded-0 sub-header about-que"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Phase-1
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionPanelsStayOpenExample"
                >
                  <div className="accordion-body sub-content">
                    The Phase 1 exam for UNOSQ will be conducted ONLINE .It will encompass a syllabus that includes object-type questions covering
                    various aspects such  as Logical Reasoning ,Verbal Ability,Quantitative Aptitude,and Sports.The duration of the exam will be 90 minutes.
                    From Phase 1,the top 100 performers will qualify for the Phase 2 Exam in each of the four pools.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <p className="accordion-header d-flex justify-content-center">
                <button
                  style={{ fontWeight: "bold" }}
                  className="accordion-button collapsed rounded-0 sub-header about-que"
                  type="button"
                  data-mdb-toggle="collapse"
                  data-mdb-target="#panelsStayOpen-collapseTwo"
                  aria-expanded="false"
                  aria-controls="panelsStayOpen-collapseTwo"
                >
                  Phase-2
                </button>
              </p>
              <div
                id="panelsStayOpen-collapseTwo"
                className="accordion-collapse collapse show"
                aria-labelledby="panelsStayOpen-headingTwo"
              >
                <div className="accordion-body sub-content">
                  The syllabus for Phase 2 of UNOSQ will remain the same as Phase 1,with an increase of difficulty level.
                  The duration of the Phase 2 exam will be reduced to 75 minutes.Additionally,engaging talks and exhibitions
                  will enhance the enthusiasm and excitement  of the students who qualify for Phase2.This crucial round will determine
                  the top three winners of UNOSQ'23,who will receive exciting prizes and complimentary passes to Udghosh Pronite.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <section id="result" style={{ marginTop: "0%", padding: "0% 6%" }}>
          <h1 className="d-flex justify-content-center header" >PHASE-1 RESULT</h1>
          <ResultTable /> 
        </section> */}
      <Highlights />

      {/* Timeline Start */}
      <section id="timeline" className="anim-fade-bot">
        <Timeline />
      </section>

      {/* <div>
          <h1 className="d-flex justify-content-center header"> TESTIMONIALS </h1>{" "}
      </div>

      <div className="review-cards-container">
      {reviews.map((review, index) => (
        <Reviews
          key={index}
          reviewerName={review.reviewerName}
          reviewerOrganization={review.reviewer}
          reviewText={review.reviewText}
          imageUrl={review.imageUrl}
        />
      ))}
    </div> */}
      {/* Timeline End */}

      <Contact />
      <Partns />
      <Footer />
    </section >

    </>
  );
}