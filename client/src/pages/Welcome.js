import { useEffect, useState } from "react";
import React from "react";
import "../componentStyles/welcome.css";
import SignUpPop from "../components/popUps/SignUpPop";
import LoginPop from "../components/popUps/loginPop";
import Footer from "../components/Footer";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTwo, setShowPopupTwo] = useState(false);

  useEffect(() => {
    const carouselImages = document.querySelectorAll(".c-img");
    let currentIndex = 0;

    function showNextImage() {
      console.log(currentIndex);
      console.log(carouselImages);
      carouselImages[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % carouselImages.length;
      carouselImages[currentIndex].classList.add("active");
    }

    const interval = setInterval(() => {
      showNextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const togglePopupTwo = () => {
    setShowPopupTwo(!showPopupTwo);
  };

  return (
    <section className="layout">
      <div className="header">
        <img src="../imgs/P3-logo.png" alt="wingman logo" />
        <button onClick={togglePopupTwo}>Log in</button>
      </div>
      <div className="welc-grid">
        <div className="welc-left">
          <h1>READY TO SPREAD YOUR WINGS AND FLY?</h1>
          <h5>WINGMAN is the only dating app made by birds, for birds.</h5>
          <h5>
            You deserve to find the perfect partner to meet today whatever your
            needs.
          </h5>
          <h5>Looking to nest down for the long haul?</h5>
          <h5>Looking for an easy breezy flit?</h5>
          <h5>WINGMAN has you covered</h5>
          <button className="join" onClick={togglePopup}>JOIN WINGMAN TODAY</button>
        </div>
        <div className="image-carousel">
          <img
            className="active c-img"
            src="../imgs/yellow-bird.png"
            alt="yellowBird"
          />
          <img className="c-img" src="../imgs/eagle.png" alt="eagle" />
          <img className="c-img" src="../imgs/bird-of-paradise.png" alt="BoP" />
          <img className="c-img" src="../imgs/gull.png" alt="gull" />
        </div>
      </div>
      <Footer />
      {showPopup && <SignUpPop onClose={togglePopup} />}{" "}
      {/* Render the Popup component conditionally based on showPopup state */}
      {showPopupTwo && <LoginPop onClose={togglePopupTwo} />}
    </section>
  );
};

export default Welcome;
