import React, { useEffect } from "react";

import ResultTable from "../Result/ResultTable";
import Result2 from "../Result2/ResultTable";
import Timeline from "../Timeline";
import "./section.css";
import { NavLink } from "react-router-dom";
import Contact from "../contact/contact";
import Footer from "../footer";
import Navbar from "../Navbar";
import Header from "../header";
import { Leftfade, Rightfade, Bottomfade, FadeSrub, NewRightfade } from "../ScrolltriggerFunc/ScrolltriggerFunc";
import AboutUs from "../About US/About";
// import ReviewCard from "../reviews/card";
import Highlights from "../Highlights";
import Partns from "../Partners";
import Papers from "../SamplePaper";
import NotificationBar from "../NotificationBar";

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
        <NotificationBar message="The deadline has been extended to 20th August, and the fee payment portal will be accessible from 19th to 20th August." duration={5000} />
        <Header />
        <section id="result" style={{ marginTop: "40px", padding: "0% 6%" }}>
          <h2 style={{
            textAlign: "center",
            margin: "40px 0 0 0"
          }}>
            Notices
          </h2>
          <div className="notices" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontSize: "1rem",
            textAlign: "left",
            margin: "0 0 0 0"
          }}>
            <ul>
              <li>
                {/* <p className="notif1">
                  Phase 2 & Phase 1 Results of UNOSQ'23 are displayed below.
                </p> */}

                <p className="notif1">
                Reminder !! There is a session scheduled today, 16th August, at 5 PM with Aditya Srivastav, UPSC AIR 1
                </p>
                <p className="notif2">
                <b>Session Links:</b> <a href="https://iitk-ac-in.zoom.us/j/95950506632?pwd=7Fyh99Q6cYN9Rqk9BQaRCXbydtkLJh.1">Zoom</a> <a href="https://www.youtube.com/@Udghoshiitk">Youtube</a>
                </p>
              </li>
            </ul>


          </div>
          <div className="phase2ress" style={{
            margin: "80px 0"
          }}>
            <h1 className="d-flex justify-content-center header" > <span style={{
              color: "var(--bg-result-highligh2)"
            }}>PHASE-2 RESULT</span></h1>
            <Result2 />
          </div>
          <h1 className="d-flex justify-content-center header" ><span style={{
            color: "var(--bg-result-highligh1)"
          }}>PHASE-1 RESULT</span></h1>
          <ResultTable />

        </section>
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
                    The Phase 1 exam for UNOSQ will be conducted ONLINE. It will encompass a syllabus that includes object-type questions covering
                    various aspects such  as Logical Reasoning, Verbal Ability, Quantitative Aptitude and Sports Trivia.The duration of the exam will be 90 minutes.
                    From Phase 1, the top 100 performers will qualify for the Phase 2 Exam in each of the four pools.
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
                    The syllabus for Phase 2 of UNOSQ will remain the same as Phase 1, with an increase of difficulty level.
                    The duration of the Phase 2 exam will be reduced to 75 minutes. Additionally,engaging talks and exhibitions
                    will enhance the enthusiasm and excitement  of the students who qualify for Phase2. This crucial round will determine
                    the top three winners of UNOSQ'24, who will receive exciting prizes and complimentary passes to Udghosh Pronite.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Highlights />

        {/* Timeline Start */}
        <section id="timeline" className="anim-fade-bot">
          <Timeline />
        </section>
        <section id="paper" className="anim-fade-bot">
          <Papers />
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