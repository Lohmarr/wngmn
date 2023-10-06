import { useEffect, useState } from "react";
import React from "react";
import SignUpPop from "../components/popUps/SignUpPop";
import LoginPop from "../components/popUps/loginPop";
import Footer from "../components/Footer";

const Welcome = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupTwo, setShowPopupTwo] = useState(false);

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
      </div>
      <Footer />
      {showPopup && <SignUpPop onClose={togglePopup} />}{" "}
      {/* Render the Popup component conditionally based on showPopup state */}
      {showPopupTwo && <LoginPop onClose={togglePopupTwo} />}
    </section>
  );
};

export default Welcome;
