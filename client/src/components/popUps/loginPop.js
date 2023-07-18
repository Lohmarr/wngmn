import React from 'react';
import Login from '../../pages/Login';

const LoginPop = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Nice To Have You Back</h2>
        <Login />
      </div>
    </div>
  );
};

export default LoginPop;
