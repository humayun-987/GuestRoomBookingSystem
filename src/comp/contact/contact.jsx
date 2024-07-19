import React from 'react';
import 'bootstrap';
import './contactstyle.css';
import ballal from './ballal.jpg';
import meena from './meena.jpg';
import yadav from './yadav.jpg';

const Contact = () => {
    return (
        <section id="contact" className='anim-fade-bot' style={{ padding: "4% 4% 8% 4%", marginTop: "8%" }}>
            <h1 className="d-flex justify-content-center header" style={{ paddingBottom: "0%" }}>CONTACT US</h1>
            
            <div className="container">
                <div className="row" style={{ overflow: "hidden" }}>
                <div className="col-lg-4 anim-fade-right" style={{ overflow: "hidden" }}>
                        <div className="card p-0">
                            <div className="card-image">
                                <img src={yadav} alt="Vanshika Yadav" />
                            </div>
                            <div className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Vanshika Yadav</h4>
                                <h5>HEAD, UNOSQ</h5>
                                <ul className="social-icons d-flex justify-content-center">
                                    <li>
                                        <a href="tel:9306759964">
                                            <i className="bi bi-telephone-fill"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/vanshika-yadav-468a58233/">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:vanshika21@iitk.ac.in">
                                            <i className="bi bi-envelope"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=919306759964">
                                            <i className="bi bi-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 anim-fade-bot">
                        <div className="card p-0">
                            <div className="card-image">
                                <img src={meena} alt="Suraj Meena" />
                            </div>
                            <div className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Suraj Meena</h4>
                                <h5>HEAD, UNOSQ</h5>
                                <ul className="social-icons d-flex justify-content-center">
                                    <li>
                                        <a href="tel:9024507040">
                                            <i className="bi bi-telephone-fill"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/suraj-meena-34090a233/">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:surajm21@iitk.ac.in">
                                            <i className="bi bi-envelope"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=919024507040">
                                            <i className="bi bi-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 anim-fade-left">
                        <div className="card p-0">
                            <div className="card-image">
                                <img src={ballal} alt="Aditya Ballal" />
                            </div>
                            <div className="card-content d-flex flex-column align-items-center">
                                <h4 className="pt-2">Aditya Ballal</h4>
                                <h5>HEAD, UNOSQ</h5>
                                <ul className="social-icons d-flex justify-content-center">
                                    <li>
                                        <a href="tel:8080327673">
                                            <i className="bi bi-telephone-fill"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/in/aditya-ballal-401267241/">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="mailto:adityanb21@iitk.ac.in">
                                            <i className="bi bi-envelope"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://api.whatsapp.com/send?phone=918080327673">
                                            <i className="bi bi-whatsapp"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
