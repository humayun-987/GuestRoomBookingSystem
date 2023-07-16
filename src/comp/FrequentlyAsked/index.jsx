import React, { useState } from 'react';
import "./style.css"

export default function FrequentlyAsked() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  

  return (
    <>
    <div className='class1'>
        Write Code here and check in url/FAQs
    </div>
    </>
  );
}