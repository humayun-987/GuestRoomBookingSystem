// import React from 'react';
// import "./Timeline.css";
// const InfographicTimeline = () => {
//   const data = [
//     {
//       icon: '📝', // Registration start
//       title: 'Registration Begins',
//       date: '15 July',
//       text: 'Online form opens for all eligible candidates.',
//       color: '#4caf50', // green
//     },
//     {
//       icon: '⏳', // Registration ends
//       title: 'Registration Closes',
//       date: '28 August',
//       text: 'Final date to submit the application form.',
//       color: '#f44336', // red
//     },
//     {
//       icon: '📝', // Exam Phase 1
//       title: 'Phase 1 Examination',
//       date: '1 September',
//       text: 'First stage of the test is conducted.',
//       color: '#3f51b5', // blue
//     },
//     {
//       icon: '📊', // Result Phase 1
//       title: 'Phase 1 Results',
//       date: '5 September',
//       text: 'Scores and qualified candidates are announced.',
//       color: '#ff9800', // orange
//     },
//     {
//       icon: '📋', // Exam Phase 2
//       title: 'Phase 2 Examination',
//       date: '8 September',
//       text: 'Final round for shortlisted candidates.',
//       color: '#9c27b0', // purple
//     },
//     {
//       icon: '🏆', // Result Phase 2
//       title: 'Final Results Declared',
//       date: '10 September',
//       text: 'List of selected candidates is published.',
//       color: '#009688', // teal
//     }
//   ];


//   return (
//     <>
//       {/* <div className='heading'>
//       <h2 className="text-center mx-auto font-bold mb-10">Timeline</h2>
//     </div> */}
//       <div className="timeline-container">
//         <div className='timeline-heading'>
//           <div className="section-name">Timeline</div>
//         </div>
//         {data.map((item, idx) => (
//           <div className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`} key={idx}>
//             <div className="content" style={{ borderColor: item.color }}>
//               <div className="icon-circle" style={{ borderColor: item.color }}>
//                 <span className="icon">{item.icon}</span>
//               </div>
//               <h3>{item.date}</h3>
//               <h3 className='item-title'>{item.title}</h3>
//               {/* <p className='description'>{item.text}</p> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default InfographicTimeline;

import { Timeline } from "antd";
import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import "./css/Timeline.css";

const TimelineObj = [
  { date: "15 July", event: "Registration Starts" },
  { date: "28 August", event: "Registration Ends" },
  { date: "1 September", event: "Exam Phase-1" },
  { date: "5 September", event: "Result Phase-1" },
  { date: "8 September", event: "Exam Phase-2" },
  { date: "10 September", event: "Result Phase-2" },
];

const App = () => (
  <>
    <SizedBox>
      <div className="timeline section-box">
        <div className="image">
          <div>
            <div className="section-name">Timeline</div>
            <div className="img">
              <img src="/images/timeline/time-work.svg" alt="Timework" />
            </div>
          </div>
        </div>
        <div className="content">
          <Timeline
            className="timeline-comp"
            mode="left"
            items={TimelineObj.map((e) => {
              return {
                label: (
                  <div className="timeline-date">
                    <div>{e.date}</div>
                  </div>
                ),
                children: (
                  <motion.div
                    initial={{
                      opacity: 0,
                      translateY: "100%",
                    }}
                    whileInView={{
                      opacity: 1,
                      translateY: 0,
                    }}
                    viewport={{ once: false }}
                    className="timeline-event"
                  >
                    {e.event}
                  </motion.div>
                ),
              };
            })}
          />
        </div>
      </div>
    </SizedBox>
  </>
);
export default App;