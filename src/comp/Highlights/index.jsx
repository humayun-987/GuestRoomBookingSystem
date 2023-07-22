import "./style.css";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Highlights = () => {
  const [isPrevEnabled, setIsPrevEnabled] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const photo = [
    {
        "head":"1st Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063766478",
        "secret": "d98c207823",
        "server": "65535",
        "farm": 66,
        "title": "Day 03, Udghosh'22 (66)",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    },
    {
        "head":"2nd Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063459699",
        "secret": "f6876c71af",
        "server": "65535",
        "farm": 66,
        "title": "Day 03, Udghosh'22 (69)",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    },
    {
        "head":"3rd Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063664270",
        "secret": "3d99261925",
        "server": "65535",
        "farm": 66,
        "title": "Day 03, Udghosh'22 (64)",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    },
    {
        "head":"4th Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063274976",
        "secret": "aeb2a47a3f",
        "server": "65535",
        "farm": 66,
        "title": "Day 03, Udghosh'22 (65)",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    },
    {
        "head":"5th Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063770743",
        "secret": "bd7ca6566a",
        "server": "65535",
        "farm": 66,
        "title": "8B0066D9-E13F-41A1-BF5E-D06149DF41E4_",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    },
    {
        "head":"6th Image",
        "text":"I am just some dummy text for the dummy image shown in a dummy page",
        "id": "53063789548",
        "secret": "5b1f575a91",
        "server": "65535",
        "farm": 66,
        "title": "istockphoto-1245120028-612x612",
        "isprimary": "0",
        "ispublic": 1,
        "isfriend": 0,
        "isfamily": 0
    }
];

  // Click event handler for the previous button
  const handlePrevClick = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsPrevEnabled(newIndex > 0);
    setIsNextEnabled(true);
  };

  // Click event handler for the next button
  const handleNextClick = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsNextEnabled(newIndex < photo.length - 1);
    setIsPrevEnabled(true);
  };

  return (
    <div id="highlights">
      <div id="highlights-text-bg"></div>
      <div id="highlights-container">
        <div id="highlights-text">
          <div className="highlights-text-arrowBtns">
            <button id="highlights-prevBtn" disabled={!isPrevEnabled} onClick={handlePrevClick}>
              <FontAwesomeIcon icon={faChevronUp} />
            </button>
          </div>
          <div id="highlights-text-title">
            <h3>{photo[currentIndex].head}</h3>
          </div>
          <div id="highlights-text-text">
            <p>{photo[currentIndex].text}</p>
          </div>
          <div className="highlights-text-arrowBtns">
            <button id="highlights-nextBtn" disabled={!isNextEnabled} onClick={handleNextClick}>
              <FontAwesomeIcon icon={faChevronDown} />
            </button>
          </div>
        </div>
        <div id="highlights-img">
          <img src={`https://live.staticflickr.com/${photo[currentIndex].server}/${photo[currentIndex].id}_${photo[currentIndex].secret}.jpg`} alt={photo[currentIndex].head} />
        </div>
      </div>
    </div>
  );
};

export default Highlights;
