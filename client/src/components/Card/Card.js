import React from "react";

const Card = ({ user }) => {
  let cardStyle = {
    backgroundImage: `url(${user.img})`,
  };

  if (!user.img) {
    cardStyle = {
      background: "var(--gradient)"
    };
  }

  return (
    <div className="card" style={cardStyle}>
      <h1 className="card-title">{user.birdname}</h1>
    </div>
  );
};

export default Card;
