import React from 'react';
import './style.css';

function Timeline() {
  return (
    <section id="timeline">
      <div className="row" id="items">
        <h1 className="col-12 text-center pb-5" id="heading">Timeline</h1>
        <div className="tl-item col-2 border-end border-start border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">15 July</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Registration Starts</p>
          </div>
        </div>
        <div className="tl-item col-2 border-end border-start border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">28 August</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Registration Ends</p>
          </div>
        </div>

        <div className="tl-item col-2 border-end border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">1 September</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Exam Phase-1</p>
          </div>
        </div>

        <div className="tl-item col-2 border-end border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">5 September</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Result Phase-1</p>
          </div>
        </div>

        <div className="tl-item col-2 border-end border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">8 September</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Exam Phase-2</p>
          </div>
        </div>

        <div className="tl-item col-2 border-end border-bottom border-secondary">
          <div className="tl-date">
            <h5 className="text-center">10 September</h5>
          </div>
          <div className="tl-year">
            <p className="f2 heading--sanSerif text-center">Result Phase-2</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;
