
import React, { useState } from 'react';
import '../FrequentlyAsked/style.css';
import Navbar from '../Navbar';
import Footer from '../footer';

export default function FrequentlyAsked() {
  const faqsData = [
    {
      question: 'Q1. Is the exam free of cost?',
      answer: 'No. The Registration Fee for UNOSQ is ₹120 per participant including all taxes.',
    },
    {
      question: 'Q2. What is the registration procedure',
      answer:
        'If Your school participates as a contingent, then the school has to register as a contingent on the UNOSQ Website, collect data and registration fees from the students and send them to us. If the students participate by themselves Individually, then they have to register directly on the UNOSQ website.',
    },
    {
      question: 'Q3. In how many phases will the exam be conducted?',
      answer:
        '2 PHASES:\nRegistration- 15 July - 15 August\nPhase I exam - 25 August\nPhase II exam – 1 September',
    },
    {
      question: 'Q4. How will the exam be conducted?',
      answer: 'Online mode',
    },
    {
      question: 'Q5. How many students will be qualified for Phase 2.',
      answer: '100 students from each pool',
    },
    {
      question: 'Q6. Exam will be of which type: subjective or objective?',
      answer: 'Objective MCQ questions',
    },
    {
      question: 'Q7. In which medium will the exam be conducted?',
      answer: 'English and Hindi',
    },
    {
      question: 'Q8. How many pools are there?',
      answer:
        '4 Pools:\nPool LITTLE CHAMPS - Class 5-6\nPool SUPER NOVA - Class 7-8\nPool THE TITANS - Class 9-10\nPool ELITE EXPLORERS - Class 11-12',
    },
    // Add more FAQs here...
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleFaqClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <Navbar />
      <section id="FAQs-section">
        <div className="lower-layer" style={{
                    position: "absolute",
                    width: "100vw",
                    zIndex: "-20",
                    opacity: "0.1",
                    position: "fixed",
                    minHeight: "100vh",
                }}>
                    <img src="/bg-head.jpg" alt="" style={{
                        width: "100%"
                    }} />
                </div>
        <h2 className="Faq-title">FAQs</h2>
        {faqsData.map((faq, index) => (
          <div className={`faq ${activeIndex === index ? 'active' : ''}`} onClick={() => handleFaqClick(index)} key={index}>
            <div className="faq-question" >
              <h3>{faq.question}</h3>
              {/* <svg width="15" height="10" viewBox="0 0 42 25" className={`arrow fa fa-chevron-up ${activeIndex === index ? 'rotate' : ''}`}>
                <path d="M3 3L21 21L39 3" stroke="white" strokeWidth="7" strokeLinecap="round" />
              </svg>
               */}
               <i className={`arrow fa fa-chevron-down ${activeIndex === index ? 'rotate' : ''}`} aria-hidden="true"></i>

            </div>
            <div className="faq-answer" style={{
              paddingLeft: "20px",
            }}>
              <p><span style={{
                color: "Black",
              }}></span> {faq.answer.split('\n').map((line) => {
                return (
                  <>
                    {line}
                    <br />
                  </>
                );
              })}</p>
            </div>
          </div>
        ))}
        <div id="break">
          <p></p>
        </div>
      </section>
        <Footer />
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