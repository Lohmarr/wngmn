import React from 'react';
import UpdateUser from '../../pages/UpdateUser';

const UpdatePop = ({ onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2>Update your Profile!</h2>
        <UpdateUser />
      </div>
    </div>
  );
};

export default UpdatePop;
