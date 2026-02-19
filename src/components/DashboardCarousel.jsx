import React from "react";
import "../components/DashboardCarousel.css";

import d1 from "../assets/dashboards/d1.png";
import d2 from "../assets/dashboards/d2.png";
import d3 from "../assets/dashboards/d3.png";
import d4 from "../assets/dashboards/d4.png";

const DashboardCarousel = () => {
  const dashboards = [d1, d2, d3, d4];

  return (
    <div className="dashboard-carousel">
      <div className="carousel-track">
        {[...dashboards, ...dashboards].map((img, index) => (
          <div className="carousel-item" key={index}>
            <img src={img} alt={`Dashboard ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCarousel;
