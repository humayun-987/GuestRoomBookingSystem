import "./style.css";
import React, { useState } from "react"; // Import useState from React
import uns from "../../media/VECT2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <section className="header-sec" style={{
        height: "100vh",
        width: "100%",
        paddingTop: "60px",
      }}>
        <div className="lower-layer" style={{
          position: "absolute",
          zIndex: "-2",
          opacity: "0.15",
          position: "fixed",
        }}>
          <img src="/bg-head.jpg" alt="" style={{
            minHeight: "100vh",
            width: "100%",
          }} />
        </div>
        <div className="lower-layer" style={{
          position: "absolute",
          width: "100%",
          zIndex: "-1",
          height: "100vh",
          opacity: "0.4",
          top: "0",
          // backgroundColor: var(--bg-header-lower-layer-back),
        }}>
        </div>
        <div className="upper-layer" style={{
          position: "absolute",
          width: "100%",
          zIndex: "5",
          height: "100vh",
          opacity: "0.4",
          top: "0",
          pointerEvents: "none",
        }}>
        </div>

        <div className="header-div">
          <div className="unosq-icons">
            <div className="unosq-img">
              <img
                style={{ 
                  margin: "auto", 
                  display: "block", 
                  width: "350px", 
                  height: "350px", 
                  transform: "translateY(20px)" 
                }}
                src="./UNOSQ_new_logo.png"
              />
                          {/* <div className="spon">
              <div className="spon-item">
                <div className="spon-title">
                  <p>
                    Presented By
                  </p>
                </div>
                <div className="spon-img">
                  <a href="https://www.pw.live/" target="_blank" id="hyperlinking">

                    <img
                      className="pw"
                      src="/pw-1.png"
                    />
                  </a>
                </div>

              </div>
              <div className="spon-item">
                <div className="spon-title">
                  <p>
                    Powered By
                  </p>
                </div>
                <div className="spon-img">
                  <a href="https://www.extramarks.com/students/k-12?utm_source=iitkanpur&utm_medium=unosq&utm_campaign=website" target="_blank" id="hyperlinking">
                    <img
                      className="em"
                      src="/Extramarks.png"
                    />
                  </a>
                </div>
              </div>
              <div className="spon-item">
                <div className="spon-title">
                  <p>
                    In Association With
                  </p>
                </div>
                <div className="spon-img">
                  <a href="https://www.speedexam.net/" target="_blank" id="hyperlinking">
                    <img
                      className="se"
                      src="/speedexam_logo.png"
                    />
                  </a>
                </div>
              </div>
            </div> */}
            </div>

          </div>
          <div className="picAndReg-btn">
            <div className="unosq-img">
              <img
                style={{
                  display: "block",
                  margin: "auto",
                }}
                src={uns}
              />
            </div>
            <div className="reg-in-header">
              {/* <NavLink className='bs-a-n register-button' to="/individualregister" smooth duration={500}>
                <p className="nav-item-text">
                  Register Now
                </p>
              </NavLink> */}
              <Button variant="primary" className="bs-a-n register-button" onClick={handleShow}>
                Register Now
              </Button>
  
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Choose Registration Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-around">
                    <NavLink to="/individualregister" className="btn btn-primary" onClick={handleClose}>
                      Individual Registration
                    </NavLink>
                    <NavLink to="/contingentregister" className="btn btn-secondary" onClick={handleClose}>
                      Contingent Registration
                    </NavLink>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <br/>
            <div className="reg-in-header">
              {/* <NavLink className='bs-a-n register-button' to="/individualregister" smooth duration={500}>
                <p className="nav-item-text">
                  Register Now
                </p>
              </NavLink> */}
              <Button variant="primary" className="bs-a-n register-button" onClick={() => navigate("/payment")}>
                Pay Now
              </Button>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}


/* <div id="sponsor_front" style={{
  margin: "auto",
  paddingTop: "60px",
}} className="container">
  <div className="row">
    <div className="col-lg-6 col-md-6 col-sm-12 center">
      <div className="row">
        <img
          className="col-lg-12 col-md-12 col-sm-12"
          style={{
            width: "50%",
            margin: "auto",
            alignItems: "center",
            display: "block",
          }}
          src="./PurpleTutor.png"
        />
        <h2 style={{ marginBottom: "5%", textAlign: "center" }}>
          Presents
        </h2>
        <img
          className="col-lg-12 col-md-12 col-sm-12"
          style={{ width: "100%", margin: "auto", display: "block" }}
          src="./UNOSQ-01.png"
        />
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-6 col-sm-6">
          <h3>In Association With</h3>
          <img style={{ width: '100%' }} src="http://cdn.shopify.com/s/files/1/0260/9384/6583/files/Scooboo.png?v=1650348175" />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6">
          <h3>Powered By</h3>
          <img style={{ width: '100%' }} src="https://s3.ap-south-1.amazonaws.com/assets.ynos.in/startup-logos/YNOS315064.png" />
        </div>

      </div>
    </div>

    <div className="col-lg-6 col-md-6 col-sm-12">
      <img
        style={{
          width: "100%",
          alignItems: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "30px",
        }}
        src={uns}
      />
      <NavLink to="/register">
        <button
          style={{
            margin: "auto",
            backgroundColor: "rgb(13, 10, 253)",
            padding: "0.75rem 0.375rem",
            display: "flex",
            borderRadius: "0.375rem",
            color: "white",
            border: "none",
            fontWeight: "400",
          }}
        >
          {" "}
          Register Now
        </button>{" "}
      </NavLink>

    </div>
  </div>

</div> */