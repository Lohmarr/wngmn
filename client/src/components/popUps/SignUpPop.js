import React from 'react';
import Signup from '../../pages/Signup';

const SignUpPop = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Tell Us About Yourself</h2>
        <Signup />
      </div>
    </div>
  );
};

export default SignUpPop;
