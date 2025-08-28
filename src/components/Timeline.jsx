import { Timeline } from "antd";
import { motion } from "motion/react";
import SizedBox from "./SizedBox";
import "./css/Timeline.css";

const TimelineObj = [
  { date: "10 July", event: "Registration Starts" },
  { date: "3 September", event: "Registration Ends" },
  { date: "5 September", event: "Exam Phase-1" },
  { date: "6 September", event: "Result Phase-1" },
  { date: "7 September", event: "Exam Phase-2" },
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