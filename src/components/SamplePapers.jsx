import React from "react";
import "./SamplePapers.css"; // Add styles separately
import SizedBox from "./SizedBox";
const samplePapers = [
  { title: "Pool Little Champs", link: "#" },
  { title: "Pool Super Nova", link: "#" },
  { title: "Pool The Titans", link: "#" },
  { title: "Pool Elite Explorers", link: "#" },
];

const SamplePapers = () => {
  return (
    <SizedBox>
      {/* <section className="sample-section"> */}
      {/* <h2 className="section-title">📚 Sample Papers</h2> */}
      <div className="text-left mt-8 flex items-start ml-4">
        <div className="section-name md-6 md:mb-14">Sample Papers</div>
      </div>
      <div className="card-grid md:mb-10 text-center">
        {samplePapers.map((paper, index) => (
          <div className="paper-card" key={index}>
            <div className="paper-icon">📝</div>
            <h3>{paper.title}</h3>
            <a href={paper.link} className="download-btn" download>
              ⬇️ Download
            </a>
          </div>
        ))}
      </div>
      {/* </section> */}
    </SizedBox>
  );
};

export default SamplePapers;
