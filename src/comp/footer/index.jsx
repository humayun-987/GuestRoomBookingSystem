import React from "react";

import 'bootstrap';
import './style.css'

import 'mdb-ui-kit';



const Footer = () => {
return (
	<div >
  <div className="spec bg-black">
  <footer className="text-center text-white" >
 
 
  <div className="container pt-4">

    <section className="mb-4">
    
      <a
        className="btn btn-link btn-floating btn-lg text-white px-4 fs-2 i pt-0"
        href="https://www.facebook.com/udghosh.iitk/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i  className="icons bi bi-facebook"></i></a>

     
      <a
        className="btn btn-link btn-floating btn-lg text-white px-4 fs-2 i pt-0"
        href="https://twitter.com/udghoshiitk?lang=en"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="bi bi-twitter icons"></i></a>

      
     
      <a
        className="btn btn-link btn-floating btn-lg text-white px-4 fs-2 i pt-0"
        href="https://www.instagram.com/udghosh_iitk/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="bi bi-instagram icons"></i></a>

      <a
        className="btn btn-link btn-floating btn-lg text-white px-4 fs-2 i pt-0"
        href="https://www.linkedin.com/company/udghosh-iit-kanpur-fest/mycompany/"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="bi bi-linkedin icons"></i></a>
      <a
        className="btn btn-link btn-floating btn-lg text-white px-4 fs-2 i pt-0"
        href="https://www.youtube.com/user/udghosh11"
        role="button"
        data-mdb-ripple-color="dark"
        ><i className="bi bi-youtube icons"></i></a>
    </section>

  </div>

  <div className="circle-parent pb-5 pt-2">
    <div id="circlee">
    <a href="/#top"><i class="bi bi-chevron-double-up font-adjust nav-ic"></i></a>
    </div>
  </div>
  <div className="text-center text-white p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2022 Copyright:  
    <a className="text-white" target='blank' href= "https://udghosh.org.in/">  UDGHOSH22</a>
  </div>
</footer>
    </div>
  </div>
);

};
export default Footer;