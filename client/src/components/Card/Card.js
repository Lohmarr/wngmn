import React from "react";
import { Link } from "react-router-dom";

const Card = ({ user }) => {
  let cardStyle = {
    backgroundImage: `url(${user.img})`,
  };

  if (!user.img) {
    cardStyle = {
      background: "var(--gradient)",
    };
  }

  return (
    <Link to={`/bird/${user._id}`} key={user._id}>
      <div className="card" style={cardStyle}>
        <h1 className="card-title">{user.birdname}</h1>
      </div>
    </Link>
  );
};

export default Card;
