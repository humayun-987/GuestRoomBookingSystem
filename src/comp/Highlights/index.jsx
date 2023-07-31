import "./style.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Highlights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photo.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  

  const icon1 = windowWidth < 500 ? faChevronLeft : faChevronUp;
  const icon2 = windowWidth < 500 ? faChevronRight : faChevronDown;

  const photo = [
    {
      head: "Exciting Prizes",
      text: "Medals & gadgets worth ₹50k+ for top 3 winners - Over 4000 participants competed last year!",
      id: "53079516743",
      secret: "48c58757e0",
      server: "65535",
      farm: 66,
      title: "unosq-01 (1)",
      isprimary: "0",
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    },
    {
      head: "Guest Lectures",
      text: "Inspiring talks by distinguished teachers - Last year, we had veteran Teacher M.S. Chauhan sir!",
      id: "53063770743",
      secret: "bd7ca6566a",
      server: "65535",
      farm: 66,
      title: "8B0066D9-E13F-41A1-BF5E-D06149DF41E4_",
      isprimary: "0",
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    },
    {
      head: "Felicitation Ceremony",
      text: "Honor and fame at IIT Kanpur - Olympic Silver Medalist Sakhshi Malik mam graced us last year!",
      id: "53063459699",
      secret: "f6876c71af",
      server: "65535",
      farm: 66,
      title: "Day 03, Udghosh'22 (69)",
      isprimary: "1",
      ispublic: 1,
      isfriend: 0,
      isfamily: 0,
    }
  ];

  const handlePrevClick = () => {
    let newIndex = currentIndex - 1;
    if(newIndex<0) newIndex+=3;

    newIndex=newIndex%3;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1)%3;
    setCurrentIndex(newIndex);
  };

  return (
    <>
    <h1 className="d-flex justify-content-center header">Perks and Rewards</h1>
    <div id="highlights">
      <div id="highlights-text-bg"></div>
      <div id="highlights-container">
        <div id="highlights-text">
          <div className="highlights-text-arrowBtns">
            <button
              id="highlights-prevBtn"
              onClick={handlePrevClick}
            >
              <FontAwesomeIcon icon={icon1} />
            </button>
          </div>
          <div id="highlights-text-title-parent">
            <div id="highlights-text-title">
              <h3>{photo[currentIndex].head}</h3>
            </div>
            <div id="highlights-text-text">
              <p>{photo[currentIndex].text}</p>
            </div>
          </div>
          <div className="highlights-text-arrowBtns">
            <button
              id="highlights-nextBtn"
              onClick={handleNextClick}
            >
              <FontAwesomeIcon icon={icon2} />
            </button>
          </div>
        </div>
        <div id="highlights-img">
          <img
            src={`https://live.staticflickr.com/${photo[currentIndex].server}/${photo[currentIndex].id}_${photo[currentIndex].secret}.jpg`}
            alt={photo[currentIndex].head}
          />
        </div>
      </div>
    </div>
    </>
    
  );
};

export default Highlights;
