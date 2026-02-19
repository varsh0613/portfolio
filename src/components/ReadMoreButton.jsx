import React from "react";
import "./ReadMoreButton.css";

const ReadMoreButton = ({ text = "Read more" }) => {
  return (
    <button className="read-more-button">
      <div className="glow-track">
        <div className="glow-orb"></div>
      </div>
      <div className="inner-fill">
        <span className="read-more-text">{text}</span>
      </div>
    </button>
  );
};

export default ReadMoreButton;
