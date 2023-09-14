import { useEffect, useState } from "react";
import React from "react";
import "../componentStyles/welcome.css";
import SignUpPop from "../components/popUps/SignUpPop";
import LoginPop from "../components/popUps/loginPop";
import Footer from "../components/Footer";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTwo, setShowPopupTwo] = useState(false);

  // useEffect(() => {
  //   const buttons = document.querySelectorAll("[data-carouselButton]");

  //   buttons.forEach(button => {
  //     button.addEventListener("click", () => {
  //       const offset = button.dataset.carouselButton === "next" ? 1 : -1;
  //       const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

  //       const activeSlide = slides.querySelector('[data-active]')
  //       let newIndex = [...slides.children].indexOf(activeSlide) + offset;
        
  //       if (newIndex < 0) newIndex = slides.children.length - 1;
  //       if (newIndex >= slides.children.length) newIndex = 0;

  //       slides.children[newIndex].dataset.active = true;
  //       delete activeSlide.dataset.active;
  //     });
  //   });
  // }, []);

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
        <div className="greet">
          <h1>READY TO SPREAD YOUR WINGS AND FLY?</h1>
          <h5>WINGMAN is the only dating app made by birds, for birds.</h5>
          <h5>
            You deserve to find the perfect partner, so let us be your WINGMAN.
          </h5>
          <h5>Looking to nest down for the long haul?</h5>
          <h5>Looking for an easy breezy flit?</h5>
          <h5>WINGMAN has you covered</h5>
          <button className="join" onClick={togglePopup}>
            JOIN WINGMAN TODAY
          </button>
        </div>
        {/* <div className="image-carousel" data-carousel>
          <button className="carousel-button prev" data-carouselButton>&#8656;</button>
          <ul data-slides>
            <li className="slide" data-active>
              <img
                className="active c-img"
                src="../imgs/yellow-bird.png"
                alt="bird image #1"
              />
            </li>
            <li className="slide">
              <img className="c-img" src="imgs/eagle.png" alt="bird image #2" />
            </li>
            <li className="slide">
              <img
                className="c-img"
                src="imgs/bird-of-paradise.png"
                alt="bird image #3"
              />
            </li>
            <li className="slide">
              <img className="c-img" src="imgs/gull.png" alt="bird image #4" />
            </li>
          </ul>
          <button className="carousel-button next" data-carouselButton>&#8658;</button>
        </div> */}
      </div>
      <Footer />
      {showPopup && <SignUpPop onClose={togglePopup} />}{" "}
      {/* Render the Popup component conditionally based on showPopup state */}
      {showPopupTwo && <LoginPop onClose={togglePopupTwo} />}
    </section>
  );
};

export default Welcome;
