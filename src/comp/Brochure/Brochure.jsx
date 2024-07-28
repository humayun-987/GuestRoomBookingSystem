import React, { useState } from "react";
import Navbar from "../Navbar";
import Footer from "../footer";
import "./Brochure.css";
import image1 from "./brochurePages/with sponsers brochure-images-0.jpg";
import image2 from "./brochurePages/with sponsers brochure-images-1.jpg";
import image3 from "./brochurePages/with sponsers brochure-images-2.jpg";
import image4 from "./brochurePages/with sponsers brochure-images-3.jpg";
import image5 from "./brochurePages/with sponsers brochure-images-4.jpg";
import image6 from "./brochurePages/with sponsers brochure-images-5.jpg";
import image7 from "./brochurePages/with sponsers brochure-images-6.jpg";
import image8 from "./brochurePages/with sponsers brochure-images-7.jpg";
import image9 from "./brochurePages/with sponsers brochure-images-8.jpg";
import image10 from "./brochurePages/with sponsers brochure-images-9.jpg";
import image11 from "./brochurePages/with sponsers brochure-images-10.jpg";
import image12 from "./brochurePages/with sponsers brochure-images-11.jpg";
import image13 from "./brochurePages/with sponsers brochure-images-12.jpg";
import image14 from "./brochurePages/with sponsers brochure-images-13.jpg";
import image15 from "./brochurePages/with sponsers brochure-images-14.jpg";
import image16 from "./brochurePages/with sponsers brochure-images-15.jpg";
import image17 from "./brochurePages/with sponsers brochure-images-16.jpg";

const Brochure = () => {
  const [slideSelected, setSlideSelected] = useState(1);
  const photos = [
    image1, image2, image3, image4, image5, image6, image7, image8,
    image9, image10, image11, image12, image13, image14, image15,
    image16, image17
  ];
  const noOfSlides = photos.length;

  const slideLeft = () => {
    if (slideSelected > 1) setSlideSelected(slideSelected - 1);
  };

  const slideRight = () => {
    if (slideSelected < noOfSlides) setSlideSelected(slideSelected + 1);
  };

  return (
    <>
      <Navbar />
      <div className="brochure-top"></div>
      <div className="brochure-body">
        <img className="brochure-background" src="/bg-head.jpg" alt="Background" />
        <div className="slide-pointer">
          PAGE {slideSelected} OF {noOfSlides}
        </div>
        <div className="slides-wrapper">
          {slideSelected > 1 && (
            <button className="slides-nav" id="slides-nav-left" onClick={slideLeft}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>
          )}
          <div className="slides-box">
            {photos.map((photo, index) => (
              <img
                key={index}
                className={slideSelected === index + 1 ? "brochure-img-active" : "brochure-img"}
                src={photo}
                alt={`Page ${index + 1}`}
              />
            ))}
          </div>
          {slideSelected < noOfSlides && (
            <button className="slides-nav" id="slides-nav-right" onClick={slideRight}>
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          )}
        </div>
        <div id="broch-down">
          <a
            className="brochure-download"
            href="https://drive.usercontent.google.com/u/0/uc?id=12eOYQRaA81OAGWeMCmwZ7xQnuFeAPvhW&export=download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Brochure;
