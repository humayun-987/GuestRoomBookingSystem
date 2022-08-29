import React from 'react';
import 'bootstrap';
import './contactstyle.css'

const Contact = () => {
    return (
        <div className="container">
        
        <div className="row">
            <div className="col-lg-4">
                <div className="card p-0">
                    <div className="card-image">
                        <img src="./vplv.jpeg"
                            alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Viplav Patel</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:790-595-9903">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.facebook.com/viplav.patel.7311/">
                                    <i className="bi bi-facebook"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:unosq.udghosh@gmail.com">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+917905959903">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card p-0">
                    <div className="card-image">
                        <img src="./nm.jpeg"
                            alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Nitesh Meena</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:898-064-5285">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.facebook.com/Meena.Nite">
                                    <i className="bi bi-facebook"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:unosq.udghosh@gmail.com">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+918980645282">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="card p-0">
                    <div className="card-image">
                        <img src="./ch.jpeg" alt="" />
                    </div>
                    <div className="card-content d-flex flex-column align-items-center">
                        <h4 className="pt-2">Rakesh Gurjar</h4>
                        <h5>HEAD, UNOSQ</h5>

                        <ul className="social-icons d-flex justify-content-center">
                        <li >
                                <a href="tel:702-392-6069">
                                <i class="bi bi-telephone-fill"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://www.facebook.com/rakesh.chhawadi.12">
                                    <i className="bi bi-facebook"></i>
                                </a>
                            </li>
                            <li >
                                <a href="mailto:unosq.udghosh@gmail.com">
                                    <i className="bi bi-envelope"></i>
                                </a>
                            </li>
                            <li >
                                <a href="https://api.whatsapp.com/send?phone=+917023926069">
                                    <i className="bi bi-whatsapp"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    </div>
    );
};


export default Contact;