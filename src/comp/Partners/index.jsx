import React from 'react';
import './style.css';
import Typed from 'react-typed';
import { useState } from 'react';

export default function Partners() {
    let Partners = [
        {
            title: "Presented By",
            name: "Physics Wallah",
            link: "https://www.pw.live/",
            img: "/pw-1.png",
            status: [
                {
                    content: "THE MOST",
                    status: "static"
                },
                {
                    content: ["AFFORDABLE", "VALUABLE", "RELIABLE"],
                    status: "blink"
                },
                {
                    content: "Learning PLATFORM",
                    status: "static"
                }

            ]
        },
        {
            title: "Powered By",
            name: "ExtraMarks",
            link: "https://www.extramarks.com/students/k-12?utm_source=iitkanpur&utm_medium=unosq&utm_campaign=website",
            img: "/Extramarks.png",
            content: [
                {
                    content: "POWERING",
                    status: "static"
                },
                {
                    content: ["NEW AGE CLASSROOMS"],
                    status: "blink"
                }
            ]
        },
        {
            title: "Associate Partner",
            name: "Speed Exam",
            link: "https://www.speedexam.net/",
            img: "/speedexam_logo.png",
            content: [
                {
                    content: ["CREATE", "CONDUCT"],
                    status: "static"
                },
                {
                    content: "EXAMS EVERYWHERE",
                    status: "blink"
                }
            ]
        }
    ];
    // let cards = document.getElementsByClassName("partn");
    // let [card, setCard] = useState({});

    // cards.addEventListener('mouseover', () => {});
    // function hoverCard() {
    //     // set card to same partner which invoked the event
    //     console.log("target");
    // }


    // cards.addeventlistener('mouseout', () => {
    //     // set card to same partner which invoked the event
    //     setCard({});
    // });


    let Highlighting = () => {
        return (<>
            <div className="status" style={{
                position: "fixed",
                zIndex: "100",
                bottom: "0",
                left: "0",
                backdropFilter: "blur(4px)",
                borderRadius: "4px",
                height: "40px",
                fontSize: "20px",
            }}>
                <Typed
                    strings={['Tuned...', 'Healthy!', 'Sporty!']}
                    typeSpeed={80}
                    backSpeed={60}
                    loop={true}
                />
            </div>

        </>);
    }
    return (
        <section className="partners">
            {/* <Highlighting /> */}
            <h2 className="partnersHeading">
                Our Partners
            </h2>
            <div className="partnersContent">
                {
                    Partners.map((partner, index) => {
                        return (
                            <a href={partner.link} className="linkingPart" target='_blank' style={{
                                textDecoration: "none",
                                color: "black",
                            }} >
                                <div className="partn">
                                    <h4 className='eachPartn' style={{
                                        color: "rgb(0, 0, 0, 0.8)",
                                    }}>{partner.title}</h4>
                                    <img src={partner.img} alt={partner.title} className="partnImg" />
                                    <p className="partnName">
                                        {partner.name}
                                    </p>
                                </div>
                            </a>
                        );
                    })
                }
            </div>
        </section>
    );

}