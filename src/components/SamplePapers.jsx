import React from "react";
import "./SamplePapers.css"; // Add styles separately

const samplePapers = [
  { title: "Pool Little Champs", link: "#" },
  { title: "Pool Super Nova", link: "#" },
  { title: "Pool The Titans", link: "#" },
  { title: "Pool Elite Explorers", link: "#" },
];

const SamplePapers = () => {
  return (
    <section className="sample-section">
      <h2 className="section-title">📚 Sample Papers</h2>
      <div className="card-grid">
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
    </section>
  );
};

export default SamplePapers;
