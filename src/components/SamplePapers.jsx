import React from "react";
import "./SamplePapers.css"; // Add styles separately
import SizedBox from "./SizedBox";
const samplePapers = [
  { title: "Pool Little Champs", link: "https://drive.google.com/uc?export=download&id=1RgffuHXWgvX3UNwqYY85b4jVv4IFl7y9" },
  { title: "Pool Super Nova", link: "https://drive.google.com/uc?export=download&id=1GYz96DG6TKNDiR58jCRphU8MXRC_r5ji" },
  { title: "Pool The Titans", link: "https://drive.google.com/uc?export=download&id=13TLSFRkANqOVIiYN2gE79NBko7aZ47RY" },
  { title: "Pool Elite Explorers", link: "https://drive.google.com/uc?export=download&id=13ksousfiKmWl-VXVvILIpkQLmJ_Jk8ui" },
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
