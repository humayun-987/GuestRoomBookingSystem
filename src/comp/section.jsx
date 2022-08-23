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
      Udghosh, the annual sports festival of IIT Kanpur, in its true sense, is an exhibition of sporting fervor, and success in the festival has been ratified by the success of many of its winners higher up in the sporting hierarchy. It offers a common platform for the students of the top educational institutions from all over the country to exhibit and hone their skills in the sports arena.Udghosh, the annual sports festival of IIT Kanpur, in its true sense, is an exhibition of sporting fervor, and success in the festival has been ratified by the success of many of its winners higher up in the sporting hierarchy. It offers a common platform for the students of the top educational institutions from all over the country to exhibit and hone their skills in the sports arena.
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
      Udghosh National Open School Quiz (UNOSQ) is a national level open school quiz competition for school students of classes 6th to 12th, conducted by Udghosh, IIT Kanpur.  It aims to provide school students' a platform to showcase their talent at a national level and foster the all round development of school students.
The quiz competition is divided into two phases, in which the Phase 1 will be the qualifying round for Phase 2. The students qualifying the Phase 1 will advance for Phase 2. Both the phases will be completely online. Phase 1 is a 60-minute online exam and the questions cover a wide range of topics ranging from Sports Facts, Mental Ability, Puzzles etc. 
All the students are divided into three pools with students from 6th-8th class in Pool A, 9th-10th class in Pool B, and 11th-12th class in Pool C. Based on the result of Phase 1, students from each pool will advance to Phase 2. Phase 2 will also be a online exam which will further challenge the students who will compete for the overall winners of UNOSQ. For all the registered participants of UNOSQ, there will also be online talks from various renowned personalities in the field of education and sports.
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
      At its most fundamental level, UNOSQ aims to provide school students a platform to showcase their talent at a national level. It provides them a opportunity to compete with students all over the country giving them a exposure of competition outside their comfort zone, challenges their mind, help them gain self confidence so that they can be ready for the future endeavours. UNOSQ also provides the students' an opportunity to interact with the renowned personalities in the field of education and sports.
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
    <h5 class="card-title">Conduction Phase 1</h5>
    <p class="card-text">It will be an online exam, consisting of objective-type questions on mental ability, puzzles, and sports facts. The duration will be 60 minutes. The top 100 participants from each pool will qualify for Phase 2. Phase 1 will be conducted on August 28. The results of Phase 1 will be declared by 30th August.</p>
     </div>
</div>

<div  class="card w-50 col-lg-12">
  <div class="card-body">
    <h5 class="card-title">Conduction Phase 2</h5>
    <p class="card-text">Phase 2 will be conducted on September 4. All the qualifying students of Phase 1 will be eligible to register for Phase 2. The duration of Phase 2 exam will be of 60 minutes. There will be talks and exhibitions to increase the enthusiasm and excitement of the winners of Phase 1. This round will decide the top 3 winners of all 3 pools of UNOSQ'22 who will be awarded exciting prizes and will be invited for Udghosh'22.D</p>
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
