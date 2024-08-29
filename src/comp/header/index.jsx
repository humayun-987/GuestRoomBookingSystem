import "./style.css";
import React, { useState } from "react";
import uns from "../../media/VECT2.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

export default function Header() {
  const navigate = useNavigate();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleShowRegistrationModal = () => setShowRegistrationModal(true);
  const handleCloseRegistrationModal = () => setShowRegistrationModal(false);
  const handleShowPaymentModal = () => setShowPaymentModal(true);
  const handleClosePaymentModal = () => setShowPaymentModal(false);

  return (
    <>
      <section
        className="header-sec"
        style={{
          height: "100vh",
          width: "100%",
          paddingTop: "60px",
        }}
      >
        <div
          className="lower-layer"
          style={{
            position: "absolute",
            zIndex: "-2",
            opacity: "0.15",
            position: "fixed",
          }}
        >
          <img
            src="/bg-head.jpg"
            alt=""
            style={{
              minHeight: "100vh",
              width: "100%",
            }}
          />
        </div>
        <div
          className="lower-layer"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: "-1",
            height: "100vh",
            opacity: "0.4",
            top: "0",
          }}
        ></div>
        <div
          className="upper-layer"
          style={{
            position: "absolute",
            width: "100%",
            zIndex: "5",
            height: "100vh",
            opacity: "0.4",
            top: "0",
            pointerEvents: "none",
          }}
        ></div>

        <div className="header-div">
          <div className="unosq-icons">
            <div className="unosq-img">
              <img
                style={{
                  margin: "auto",
                  display: "block",
                  width: "350px",
                  height: "350px",
                  transform: "translateY(20px)",
                }}
                src="./UNOSQ_new_logo.png"
              />
            </div>

            {/* Moved Sponsor Section */}
            <div className="spon" style={{ marginTop: "60px", marginRight: "50px" }}>
              <div className="spon-item">
                <div className="spon-title">
                  <h5>Technology Partner</h5>
                </div>
                <div className="spon-img">
                  <a href="https://hiremee.co.in/" target="_blank" id="hyperlinking">
                    <img className="pw" src="/hiremee.jpg" />
                  </a>
                </div>
              </div>
              {/* <div className="spon-item">
                <div className="spon-title">
                  <p>Powered By</p>
                </div>
                <div className="spon-img">
                  <a href="https://www.extramarks.com/students/k-12?utm_source=iitkanpur&utm_medium=unosq&utm_campaign=website" target="_blank" id="hyperlinking">
                    <img className="em" src="/Extramarks.png" />
                  </a>
                </div>
              </div>
              <div className="spon-item">
                <div className="spon-title">
                  <p>In Association With</p>
                </div>
                <div className="spon-img">
                  <a href="https://www.speedexam.net/" target="_blank" id="hyperlinking">
                    <img className="se" src="/speedexam_logo.png" />
                  </a>
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

            {/* First Button and Modal */}
            <div className="reg-in-header">
              <Button
                variant="primary"
                className="bs-a-n register-button"
                onClick={handleShowRegistrationModal}
              >
                Register Now
              </Button>

              <Modal
                show={showRegistrationModal}
                onHide={handleCloseRegistrationModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Choose Registration Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-around">
                    <NavLink
                      to="/individualregister"
                      className="btn btn-primary"
                      onClick={handleCloseRegistrationModal}
                    >
                      Individual Registration
                    </NavLink>
                    <NavLink
                      to="/contingentregister"
                      className="btn btn-secondary"
                      onClick={handleCloseRegistrationModal}
                    >
                      Contingent Registration
                    </NavLink>
                  </div>
                </Modal.Body>
              </Modal>
            </div>

            <br />

            {/* Second Button and Modal */}
            <div className="reg-in-header">
              <Button
                variant="primary"
                className="bs-a-n register-button"
                onClick={handleShowPaymentModal}
              >
                Pay Now
              </Button>

              <Modal
                show={showPaymentModal}
                onHide={handleClosePaymentModal}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Choose Payment Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="d-flex justify-content-around">
                    <NavLink
                      to="/individualpayment"
                      className="btn btn-primary"
                      onClick={handleClosePaymentModal}
                    >
                      Individual Payment
                    </NavLink>
                    <NavLink
                      to="/contingentpayment"
                      className="btn btn-secondary"
                      onClick={handleClosePaymentModal}
                    >
                      Contingent Payment
                    </NavLink>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
