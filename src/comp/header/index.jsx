import "./style.css";
import React from "react";
import uns from "../../media/VECT1.png";
import { NavLink } from "react-router-dom";
export default function Header() {
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
                    backgroundColor: "rgb(0,0,0,0.3)"
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
                                style={{ margin: "auto", display: "block" }}
                                src="./UNOSQ-01-removebg-preview.png"
                            />
                        </div>
                        <div className="spon">
                            <div className="spon-item">
                                <div className="spon-title">
                                    <p>
                                        Presented By
                                    </p>
                                </div>
                                <div className="spon-img">
                                    <img
                                        className="pw"
                                        src="/pw-1.png"
                                    />
                                </div>

                            </div>
                            <div className="spon-item">
                                <div className="spon-title">
                                    <p>
                                        In Association With
                                    </p>
                                </div>
                                <div className="spon-img">
                                    <img
                                        className=""
                                        src=""
                                    />
                                </div>
                            </div>
                            <div className="spon-item">
                                <div className="spon-title">
                                    <p>
                                        Powered By
                                    </p>
                                </div>
                                <div className="spon-img">
                                    <img
                                        className=""
                                        src="/Extramarks.png"
                                    />
                                </div>
                            </div>
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
                            <NavLink className='bs-a-n register-button' to="/register" smooth duration={500}>
                                <p className="nav-item-text">
                                    Register Now
                                </p>
                            </NavLink>
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