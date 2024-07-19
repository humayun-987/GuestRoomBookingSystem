import React, { useState } from 'react';
import "./style.css";
import { useMediaQuery } from 'react-responsive';
const data = [
    {
        fieldName: "WHAT IS UDGHOSH?",
        img: "https://live.staticflickr.com/65535/53014085798_b2568dba55.jpg",
        fieldText: "Udghosh, the annual sports festival of IIT Kanpur is a real display of sportsmanship; many of its champions have gone on to greatness. It allows outstanding pupils nationwide to showcase and improve their sports talents. Competing with our rivals and raising awareness for all major sports was the task. They left a legacy for us to carry on, and we can boast of the strongest growth curve a sports festival in the nation has ever seen. Our vision is unimpaired by the respect we have gained as a festival."
    },
    {
        fieldName: "WHAT IS UNOSQ?",
        img: "./UNOSQ_new_logo.png",
        fieldText: "Udghosh proudly hosts UNOSQ, an open school quiz tournament designed for students in grades 5 - 12. This quiz serves as a platform to promote sports among schoolchildren. Through this examination, students not only gain knowledge about sports but also have their mental, logical, and verbal abilities tested and receive national recognition. As an added benefit, UNOSQ organises online seminars conducted by notable academic and sports figures, further enriching the learning experience for the participants. The primary objective of UNOSQ is to give school children a platform to showcase their talents and abilities. It allows them to compete with students nationwide, challenging their intellect and fostering self-confidence for their future endeavours. . Additionally, UNOSQ provides an invaluable opportunity for children to meet and interact with celebrated figures from the fields of education and sports."
    },
    {
        fieldName: "WHY UNOSQ?",
        img: "https://live.staticflickr.com/65535/53079516743_48c58757e0.jpg",
        fieldText: "At its most fundamental level, UNOSQ aims to provide school students a platform to showcase their talent at the topmost level. It provides them a opportunity to compete with students all over the country giving them a exposure of competition outside their comfort zone, challenges their mind, help them gain self confidence so that they can be ready for the future endeavours. UNOSQ will provide an exposure to SPORTS and its importance in students' lives that they would otherwise be unaware of. UNOSQ also provides the students' an opportunity to interact with the renowned personalities in the field of education and sports."
    }

];
export default function Conduction() {
    const [phase, setPhase] = useState(0);
    const isMobileorTab = useMediaQuery({ query: '(max-width: 800px)' });
    const phaseclick = (value) => {
        setPhase(value);
    }
    if (isMobileorTab) {
        console.log("mobile");
        return (
            <section className='conduction-section anim-fade-bot' id='about'>
                <h1 className="d-flex justify-content-center anim-fade-left">ABOUT US</h1>
                <div className="conduction-phase-body mt-4 mb-4">
                    <div className="conduct-phases-head">
                        {
                            data.map((item, index) => {
                                return <div className={phase == index ? "phases-head-active" : "phases-head"}>
                                    <h5 onClick={() => phaseclick(index)} className='cond-head-phase'>{item.fieldName}</h5>
                                    <div className={phase == index ? "phases-text-active" : "phases-text"}>
                                        <img src={item.img} alt="" />
                                        <p >
                                            {item.fieldText}
                                        </p>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </section>
        )
    }
    else {
        console.log("desktop");
        return (
            <section className='conduction-section anim-fade-bot'>
                <h1 className="d-flex header anim-fade-left" style={{
                    textAlign: "left",
                    marginLeft: "4%",
                }}>ABOUT US</h1>
                <div className="conduction-phase-body mt-4 mb-4">
                    <div className="conduct-phases-head">
                        {
                            data.map((item, index) => {
                                return <div className={phase == index ? "phases-head-active" : "phases-head"}>
                                    <h5 onClick={() => phaseclick(index)} className='cond-head-phase'> {item.fieldName}</h5>
                                </div>
                            })
                        }
                    </div>
                    <div className="conduct-phases-text">
                        <div className={phase == phase ? "phases-text-active" : "phases-text"} style={{
                            textAlign: "center",
                        }}>
                            <img src={data[phase].img} alt="" />
                            <p style={{
                                textAlign: "left",
                            }}>
                                {data[phase].fieldText}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}
