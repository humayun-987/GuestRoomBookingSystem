import React from 'react'
import './style.css'

function Timeline() {
  return (
    <div>
        <section id="timeline">
  <div class='row' id='items'>
    <h1 class="col12 text-center pb-5" id='heading'>Timeline</h1>
  <div class="tl-item col-2 border-end border-start border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">16 August</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Registration Ends</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>
  </div>
  

  <div class="tl-item col-2 border-end border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">20 August</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Exam Phase-1</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>

  </div>

  <div class="tl-item col-2 border-end border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">24 August</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Result Phase-1</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>

  </div>

  <div class="tl-item col-2 border-end border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">3 September</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Exam Phase-2</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>

  </div>

  <div class="tl-item col-2 border-end border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">7 September</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Result Phase-2</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>

  </div>

  <div class="tl-item col-2 border-end border-bottom border-secondary">
    <div className="tl-date">
        <h5 class="text-center">8 October*</h5>
    </div>
    <div class="tl-year">
      <p class="f2 heading--sanSerif text-center">Felicitation</p>
    </div>

    <div class="tl-content">
      <h3 class="pt-5 text-center">Description</h3>
    </div>

  </div>
  </div>
</section>

    </div>
  )
}

export default Timeline