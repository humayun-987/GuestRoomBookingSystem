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
import './section.css';

import 'bootstrap';
import 'react-bootstrap';

export default function Section() {
  return (
    <>


<div id='sponsor_front' style={{margin: 'auto'}} className='container'>
        <div className='row'>
        <div className='col-lg-6 col-md-6 col-sm-12 center'>
          <div className='row'>
          <img className='col-lg-12 col-md-12 col-sm-12' style={{ width: '100%' ,margin: 'auto', alignItems: 'center', display: 'block'}} src='./PurpleTutor.png' />
          <h2 style={{marginBottom: '5%', textAlign: 'center'}}>Presents</h2>
          <img className='col-lg-12 col-md-12 col-sm-12' style={{ width: '100%' , margin: 'auto', display: 'block'}} src='./UNOSQ-01.png' />
        </div>
        </div>
        
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <img  style={{width: '100%', alignItems: 'center', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}} src={uns} />

        </div>
        </div>
        <a href="https://forms.gle/kxrY5TS9Ke85Utvf6" ><button  style={{margin: 'auto', backgroundColor: 'rgb(13, 110, 253)', padding: '0.75rem 0.375rem',display: 'flex', borderRadius: '0.375rem', color: 'white', border: 'none', fontWeight: '400'}}> Register Now</button> </a>
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
      Udghosh is the annual sports Festival of IIT Kanpur. As a real sports showpiece, the Festival has been validated by the success of many of its victors at the top of the sport's ladder. It serves as a place for students from various colleges and universities around the country to showcase and improve their sports knowledge and mental aptitude.
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
      Udghosh National Open School Quiz is an annual sports quiz competition for classes 6th to 12th, conducted and organized by Udghosh, IIT Kanpur. The competition is divided into two halves, in which students fight for individual glory and the overall title. Phase 1 is a 90-minute online exam that students may take from the comfort of their own homes, and the questions cover a wide range of topics, like Sports Trivia,Sports facts and Mental Ability. UNOSQ will contain three separate pools of students: Pool A (6th, 7th, and 8th graders), Pool B (9th and 10th graders), and Pool C (11th and 12th graders) (11th and 12th).To determine the overall victors, only the top 100 competitors in each of Pool A , B and C will advance to the final round, when they will be assessed on a variety of new tasks. For students in phase 2, there will also be online seminars. The sole criterion for participation is to learn some new things and increase your sports
knowledge.
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
      At its most fundamental level, our primary mission is to help the students to inculcate sports knowledge and culture and thus increase the reach of different sports to various parts of the country.Through a series of questions that include sports facts,mental aptitude, and reasoning.Students will have the chance to gain self confidence and improve their thinking ability so that they can be ready for the future endeavours.
      </div>
    </div>
  </div>
</div>
</div>
</div>

<section id='conduction' style={{marginTop:'2%', padding: '6%'}} >
<h1 className="d-flex justify-content-center header">CONDUCTION</h1>
<div className="d-flex justify-content-center row"  style={{margin: '0'}} >
<div class="card w-75 col-lg-12" style={{marginBottom: '5px'}}>
  <div class="card-body">
    <h5 class="card-title">Phase 1</h5>
    <p class="card-text">It will consist of an exam which will be held ONLINE this year, consisting of objective-type questions on reasoning, logical puzzles, and mental ability, the duration will be
90 mins. The top 100 participants will qualify for round 2 separately for all three pools. <span>Phase 1 will be conducted on August 28.</span></p>
     </div>
</div>

<div  class="card w-50 col-lg-12">
  <div class="card-body">
    <h5 class="card-title">Phase 2</h5>
    <p class="card-text">This will consist of questions related to general awareness and riddles. Duration will be 60mins. There will be talks and exhibitions to increase the enthusiasm and excitement of the
winners of phase 1. This round will decide the top 10 winners of UNOSQ'22 who will be awarded exciting prizes and free passes for Pronite. <span>Phase 2 will be conducted on September 4.</span></p>
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
