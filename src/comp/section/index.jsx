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
import { Leftfade, Rightfade, Bottomfade, FadeSrub } from "../ScrolltriggerFunc/ScrolltriggerFunc";
import AboutUs from "../About US/About";

import Highlights from "../Highlights";

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
        <div className="mt-40 anim-fade-bot" style={{ padding: "6% 6% 0 6%"}}>
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
                    style={{ backgroundColor: "lightblue", fontWeight: "bold" }}
                    className="accordion-button collapsed rounded-0"
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
                    Phase-2
                  </button>
                </p>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse show"
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
        <Footer />
      </section>

    </>
  );
}