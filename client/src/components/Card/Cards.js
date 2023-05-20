import React from "react";

const Card = ({ name, profilePhoto }) => {
  return (
    <div className="card">
      <div className="profile-img">
        <img src={profilePhoto} alt="Profile Photo" />
      </div>
      <div className="card-content">
        <h3 className="name">{name}</h3>
      </div>
    </div>
  );
};

export default Card;
