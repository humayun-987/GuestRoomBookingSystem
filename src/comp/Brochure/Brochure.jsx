import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import "./Brochure.css";
import brochure from "./imageUrl.json";

const Brochure = () => {
  const [slideselected, setSideSelected] = useState(1);
  const noofslides = 16;
  const photos = brochure.photos.photo;
  let slidesArray = photos.map(
    (slide, index) =>
      `https://live.staticflickr.com/${slide.server}/${slide.id}_${slide.secret}_b.jpg`
  );
  slidesArray.reverse();
  const slideleftcom = () => {
    if (slideselected > 1) setSideSelected(slideselected - 1);
  };
  const sliderightcom = () => {
    if (slideselected < noofslides) setSideSelected(slideselected + 1);
  };

  return (
    <>
      <Navbar />
      <div className="brochure-top"></div>
      <div className="brochure-body">
        <img className="brochure-background" src="/bg-head.jpg" />
        <div className="slide-pointer">
          PAGE {slideselected} OF {noofslides}
        </div>
        <div className="slides-wrapper">
          {slideselected > 1 ? (
            <button
              className="slides-nav"
              id="slides-nav-left"
              onClick={slideleftcom}
            >
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
          ) : null}
          <div className="slides-box">
            {slidesArray.map((slide, index) => (
              <img
                className={
                  slideselected === index + 1
                    ? "brochure-img-active"
                    : "brochure-img"
                }
                src={slide}
              />
            ))}
          </div>
          {slideselected < noofslides ? (
            <button
              className="slides-nav"
              id="slides-nav-right"
              onClick={sliderightcom}
            >
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          ) : null}
        </div>
        <div id="broch-down">
          <a
            className="brochure-download"
            href="https://drive.google.com/file/d/1LAUErlGdS46a96NVp4WfaC3qEe7qkXr_/view?usp=drive_link"
          >
            <i class="fa fa-download" aria-hidden="true"></i>Download
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Brochure;
