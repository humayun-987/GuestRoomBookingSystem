import "./style.css";
import React, { useState } from "react";

const Reviews = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoFile, setVideoFile] = useState("");

  const stopVideo = () => {
    setShowVideo(false);
    setVideoFile("");
  };

  const playVideo = (file) => {
    setShowVideo(true);
    setVideoFile(file);
  };

    return(
    <>
        <section className=" bg">
        {/* video part */}
    <div className="container ">
      <h1>Let's hear it from UNOSQ toppers</h1>
       <div className="row">
        <div className="col">
          <div className="feature-img">
            <img src="/VEDANT.jpg" alt="cover page" width="100%" />
            <img src="/play.png"  className="play-btn" alt="" onClick={() =>playVideo("Introduction.mp4")} />
          </div>
          </div>
          <div className="col">
            <div className="small-img-row">
              <div className="small-img">
                <img src="/HITI.jpg" alt="cover page"  />
                <img src="/play.png"  className="play-btn" alt="" onClick={() =>playVideo("hiti.mp4")} /> 
              </div>
            <p> Hiti Jangir Rank <br />1 Pool A</p> 
            </div>
            <div className="col">
            <div className="small-img-row">
              <div className="small-img">
                <img src="/RANJEEV.jpg" alt="cover page"  />
                <img src="/play.png"  className="play-btn" alt="" onClick={() =>playVideo("ranjeev.mp4")} />
              </div>
            <p> Ranjeev Rank 3 <br />1 Pool A</p> 
            </div>
          </div>
          </div>
          
      </div>
      </div>
     
    
     </section>
     {showVideo && (
        <div className="video-player" id="videoplayer">
          <video width="100%" height="50%" controls autoPlay id="myvideo">
            <source src={videoFile} type="video/mp4"></source>
          </video>
          <img
            src="/close.png"
            alt=""
            className="close-btn"
            onClick={stopVideo}
          />
        </div>
      )}
    </>
  );
};

export default Reviews;