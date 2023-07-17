import React, { useState } from 'react';
import "../FrequentlyAsked/style.css"
import { Collapse } from 'react-bootstrap';


export default function FrequentlyAsked() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);



const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  const arrowClassName = open ? 'arrow up' : 'arrow down';
  const renderAnswer = () => {
    const boldTextRegex = /\*\*(.*?)\*\*/g;
    const lines = answer.split('%BR%');
    return lines.map((line, index) => (
      <React.Fragment key={index}>
        {line.replace(boldTextRegex, '<strong>$1</strong>')}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className='question-box'>
      
      <h5 className="question" onClick={handleToggle}>{question}</h5>
      <Collapse in={open}>
        <div className={`answer ${open ? 'open' : ''}`}>
          {renderAnswer()}
        </div>
      </Collapse>
    </div>
  );
};
  
  

  return (
    <>
    {/* <div className='class1'>
        Write Code here and check in url/FAQs
    </div> */}




    <div className='faq-box'>
      <div className='faq-container'>
      <h2 className='faq-head'>FAQs</h2>
      <FAQItem
        question="Q1. Is the exam free of cost?"
        answer="No. Registration Fee for UNOSQ is ₹120 per participant including all taxes."
      />
      <FAQItem
        question=" Q2. What is the registration procedure?"
        answer="If Your school participates as a contingent, then the school has to register as a contingent on the UNOSQ Website, collect data and registration fees from the students and send them to us. If the students participate by themselves Individually, they have to register directly on the UNOSQ website."
      />
      <FAQItem
        question="Q3. How will the exam be conducted? "
        answer="ONLINE "
      />
      <FAQItem
        question="Q4. In how many phases will the exam be conducted?"
        answer="2 PHASES %BR%
          Registration- 17 July - 16 August %BR%
          Phase I exam- 20 August %BR%
          Phase II exam– 3 September"
      />
      <FAQItem
        question="Q5. How many students will be qualified for Phase 2."
        answer="100 students from each pool"
      />
      <FAQItem
        question="Q6. Exam will be of which type is subjective or objective?"
        answer="Objective MCQ questions"
      />
      <FAQItem
        question="Q7. In which medium will the exam be conducted?"
        answer="English and Hindi"
      />
      <FAQItem
        question="Q8. How many pools are there?"
        answer="4 Pools %BR% Pool Youngsters - Class 5-6 %BR%
        Pool Rising Stars - Class 7-8 %BR%
        Pool Champions - Class 9-10 %BR%
        Pool Pioneers - Class 11-12"
      />
      {/* Add more FAQItems as needed */}
    </div>
    </div>








    </>
  );
}


{/*<div className='faq-container'>
      <div className='faq'>
        <div className='que one'>{/*<a data-toggle='collapse' href="#ansone"></a><span class="arrow">▼</span>Q1. Is the exam free of cost?</div> 
        <div className='ans one' id='ansone'><p>No. Registration Fee for UNOSQ is ₹120 per participant including all taxes.</p></div>
        
        <div className='que two'><span class="arrow">▼</span> Q2. What is the registration procedure?</div>
        <div className='ans two'>If Your school participates as a contingent, then the school has to register as a contingent on the UNOSQ Website, collect data and registration fees from the students and send them to us. If the students participate by themselves Individually, they have to register directly on the UNOSQ website.</div>

        <div className='que three'><span class="arrow">▼</span> Q3. How will the exam be conducted? </div>
        <div className='ans three'>ONLINE </div>

        <div className='que four'><span class="arrow">▼</span>Q4. In how many phases will the exam be conducted?</div>
        <div className='ansfour four'>2 PHASES 
          Registration- 17 July - 16 August
          Phase I exam- 20 August
          Phase II exam– 3 September</div> 
        </div>

        <div className='que five'><span class="arrow">▼</span>Q5. How many students will be qualified for Phase 2.</div>
        <div className='ans five'>100 students from each pool</div>

        <div className='que six'><span class="arrow">▼</span>Q6. Exam will be of which type is subjective or objective?</div>
        <div className='ans six'>Objective MCQ questions</div>

        <div className='que seven'><span class="arrow">▼</span>Q7. In which medium will the exam be conducted?</div>
        <div className='ans seven'>English and Hindi</div>

        <div className='que eight'><span class="arrow">▼</span>Q8. How many pools are there?</div>
        <div className='anseight eight'>4 Pools
Pool Youngsters - Class 5-6
Pool Rising Stars - Class 7-8
Pool Champions - Class 9-10
Pool Pioneers - Class 11-12
</div>
    </div> */}