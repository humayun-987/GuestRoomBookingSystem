import React from 'react';
import pic from '../5251.jpg';
import uns from '../images/VECT1.png';
import ss from '../font/Poppins-Bold.otf';
import head from './head.png';
import tab from './RJ.png';
import hod from './HD.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Contact from './contact';

import 'bootstrap';
import 'react-bootstrap';

export default function Section() {
  return (
    <>


<div style={{marginTop: '2%'}} className='container'>
        <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <img  style={{width: '100%', alignItems: 'center', margin: 'auto'}} src='./PurpleTutor.png' />
          <img  style={{width: '100%', alignItems: 'center', margin: 'auto'}} src='./UNOSQ-01.png' />
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <h1 style={{fontFamily: '{ss}', fontWeight: 'bold', fontSize: '4rem'}} ><span style={{color: 'blue'}} >U</span>DGHOSH</h1>
          <h1 style={{fontFamily: '{ss}', fontWeight: 'bold', fontSize: '4rem'}}  ><span style={{color: 'blue'}}>N</span>ATIONAL</h1>
          <h1 style={{fontFamily: '{ss}', fontWeight: 'bold', fontSize: '4rem'}}  ><span style={{color: 'blue'}}>O</span>PEN</h1>
          <h1 style={{fontFamily: '{ss}', fontWeight: 'bold', fontSize: '4rem'}}  ><span style={{color: 'blue'}}>S</span>CHOOL</h1>
          <h1 style={{fontFamily: '{ss}', fontWeight: 'bold', fontSize: '4rem'}}  ><span style={{color: 'blue'}}>Q</span>uiz</h1>
          <a href="https://forms.gle/kxrY5TS9Ke85Utvf6"><button style={{margin: '2%', backgroundColor: '#0d6efd' , padding: '0.75rem 0.375rem', borderRadius: '0.375rem',color: 'white', border: 'none', fontWeight: '400'}} > Register Now</button> </a>

          {/* onClick={()=>{ alert('Registration Will Open Soon');}} */}
         </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <img  style={{width: '100%', alignItems: 'center', margin: 'auto'}} src={uns} />

        </div>
        </div>
      </div>
<div id='about' style={{padding: '6%'}} >
    <h1 className="d-flex justify-content-center header">ABOUT US</h1>
    <div className="back"
    style={{ backgroundImage:`url({pic})`,backgroundRepeat:"no-repeat" }}
    >
         <div className="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
      <button style={{backgroundColor: 'lightblue', fontWeight: 'bold'}} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        WHAT IS UDGHOSH?
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
      <div className="accordion-body">
      Udghosh is the annual sports Fest of IIT Kanpur. As a real sports showpiece, the meet has been validated by the success of many of its victors at the top of the sport's ladder. It serves as a venue for students from various colleges and universities around the country to showcase and improve their athletic abilities.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
      <button style={{backgroundColor: 'lightblue', fontWeight: 'bold'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        WHAT IS UNOSQ?
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
      <div className="accordion-body">
      Udghosh National Open School Quiz is an annual competition for classes 6th to 12th, conducted and organized by Udghosh, IIT Kanpur. The competition is divided into two halves, in which students fight for individual glory and the overall title. Phase 1 is a 90-minute online exam that students may take from the comfort of their own homes, and the questions cover a wide range of topics, including Mental Ability, Aptitude, and Puzzles. UNOSQ will contain three separate pools of students: Pool A (6th, 7th, and 8th graders), Pool B (9th and 10th graders), and Pool C (11th and 12th graders) (11th and 12th).To determine the overall victors, only the top 100 competitors in each of Pool A , B and C will advance to the final round, when they will be assessed on a variety of new tasks. For students in phase 2, there will also be online seminars. The sole criterion for participation is excitement and self-confidence.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
      <button style={{backgroundColor: 'lightblue', fontWeight: 'bold'}} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        WHY UNOSQ?
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
      <div className="accordion-body">
      At its most fundamental level, our primary mission is to fortify and cultivate the potential of our nation. Through a series of exercises that include mental capacity, reasoning, and examination, students will have the chance to gain fundamental knowledge and experience, improve their coordination, and think creatively and outside the box while offering solutions that have never been considered before.
      </div>
    </div>
  </div>
</div>
</div>
</div>

<section id='conduction' style={{marginTop:'2%'}}>
<h1 className="d-flex justify-content-center header">CONDUCTION</h1>
<div className="d-flex justify-content-center row"   >
<div class="card w-75 col-lg-12" style={{marginBottom: '5px'}}>
  <div class="card-body">
    <h5 class="card-title">Phase 1</h5>
    <p class="card-text">It will consist of an exam which will be held ONLINE this year, consisting of objective-type questions on reasoning, logical puzzles, and mental ability, the duration will be
90 mins. The top 100 participants will qualify for round 2 separately for all three pools.</p>
     </div>
</div>

<div  class="card w-50 col-lg-12">
  <div class="card-body">
    <h5 class="card-title">Phase 2</h5>
    <p class="card-text">This will consist of questions related to general awareness and riddles. Duration will be 60mins. There will be talks and exhibitions to increase the enthusiasm and excitement of the
winners of phase 1. This round will decide the top 10 winners of UNOSQ'22 who will be awarded exciting prizes and free passes for Pronite.</p>
    </div>
</div>

</div>

</section>
<section id='perks' style={{padding: '10%'}}>
<div  >
    <h1 className="d-flex justify-content-center header">PERKS </h1> </div>
    <div className='row'>
        <div  className='col-lg-4 col-md-4 col-sm-12'>

        <img style={{width: '300px' , float: 'center', margin: 'auto'}} src={tab}/>
        </div>
        <div className='col-lg-4 col-md-4 col-sm-12'><img style={{width: '300px', float: 'center', margin: 'auto'}} src={hod}/></div>
        <div className='col-lg-4 col-md-4 col-sm-12'>
        <img style={{width: '300px', float: 'center', margin: 'auto'}} src={head}/>

        </div>

    </div>

</section>
<section id='contact' style={{padding: '5%'}}>
  <h1 className="d-flex justify-content-center header">Contact Us</h1>
 <Contact />
</section>

    </>
  );
}
