import React from "react";

const Card = ({ user }) => {
  return (
    <div className="card">
        <img src={user.img} alt={user.birdname} className="card-image" />
        <h1 className="card-title">{user.birdname}</h1>
    </div>
  );
};

export default Card;
