import React from 'react';
import 'bootstrap';
import './contactstyle.css'

const Contact = () => {
    return (
    <section id="contact" className='anim-fade-bot' style={{ padding: "4% 4% 8% 4%",
    marginTop: "8%",
    }}>
        <h1 className="d-flex justify-content-center header" style={{
            paddingBottom: "0%"
        }}>CONTACT US</h1>
        
        <div className="container">
        
        <div className="row">
            <div className="col-lg-4 anim-fade-left">
                <div className="card p-0">
                    <div className="card-image">
                        <img src="https://live.staticflickr.com/65535/52978166884_b69905cd6e.jpg"
                            alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Anupam Singh</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:9670809669">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.linkedin.com/in/anupam-singh-5604a01ba/">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:anupams20@iitk.ac.in">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+919670809669">
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
                        <img src="https://live.staticflickr.com/65535/52978022281_fcc79560d0.jpg"
                            alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Sourit Saha</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:7063656415">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.linkedin.com/in/sourit-saha-3b92ba1ba/">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:anupams20@iitk.ac.in">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+917063656415">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 anim-fade-right">
                <div className="card p-0">
                    <div className="card-image">
                        <img src="https://live.staticflickr.com/65535/52994241225_42970bcabd.jpg" alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Fenil Patel</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:9023621068">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.linkedin.com/in/fenil-patel-91625120b/">
                                    <i className="bi bi-linkedin"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:patelfj20@iitk.ac.in">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+919023621068">
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