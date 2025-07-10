import React from "react";
import "./SamplePapers.css"; // Add styles separately
import SizedBox from "./SizedBox";
const samplePapers = [
  { title: "Pool Little Champs", link: "https://drive.usercontent.google.com/u/0/uc?id=1pzmCU9R1RwA9QTe0wVR3GWL7urIsKSbi&export=download" },
  { title: "Pool Super Nova", link: "https://drive.usercontent.google.com/u/0/uc?id=1Us9O-aYHY8Vy3PUi8tEI95KqmS8LS5th&export=download" },
  { title: "Pool The Titans", link: "https://drive.usercontent.google.com/u/0/uc?id=1RoubVWjnbKc_evdgfMYJepY8bGE1tZvZ&export=download" },
  { title: "Pool Elite Explorers", link: "https://drive.usercontent.google.com/u/0/uc?id=1Cz3PwK3tg4e9F6u7r17GWFe6XK7OP4au&export=download" },
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
