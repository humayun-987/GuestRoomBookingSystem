import React from 'react';
import './style.css';

function Papers() {
  return (
    <section id="paper">
      <div className="row" id="items">
        <h1 className="col-12 text-center pb-5" id="heading">Sample Papers</h1>
        <div className="sp-item col-2 border-end border-start border-bottom border-secondary">
          <div className="sp-date">
            <h5 className="text-center">Pool Little Champs</h5>
          </div>
          <div id="sp-down">
          <a
            className="sp-download"
            href="https://drive.usercontent.google.com/u/0/uc?id=1pzmCU9R1RwA9QTe0wVR3GWL7urIsKSbi&export=download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        </div>
        </div>
        <div className="sp-item col-2 border-end border-start border-bottom border-secondary">
          <div className="sp-date">
            <h5 className="text-center">Pool Super Nova</h5>
          </div>
          <div id="sp-down">
          <a
            className="sp-download"
            href="https://drive.usercontent.google.com/u/0/uc?id=1Us9O-aYHY8Vy3PUi8tEI95KqmS8LS5th&export=download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        </div>
        </div>

        <div className="sp-item col-2 border-end border-bottom border-secondary">
          <div className="sp-date">
            <h5 className="text-center">Pool The Titans</h5>
          </div>
          <div id="sp-down">
          <a
            className="sp-download"
            href="https://drive.usercontent.google.com/u/0/uc?id=1RoubVWjnbKc_evdgfMYJepY8bGE1tZvZ&export=download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        </div>
        </div>

        <div className="sp-item col-2 border-end border-bottom border-secondary">
          <div className="sp-date">
            <h5 className="text-center">Pool Elite Explorers</h5>
          </div>
  
          <div id="sp-down">
          <a
            className="sp-download"
            href="https://drive.usercontent.google.com/u/0/uc?id=1AJQNTa2aFwTzGgrptVsqX4W1yY8JTULX&export=download"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-download" aria-hidden="true"></i> Download
          </a>
        </div>
        </div>



      </div>
    </section>
  );
}

export default Papers;
