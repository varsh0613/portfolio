import React, { useState } from "react";
import "./SkillsBay.css";

const SkillsBay = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const skills = {
    Programming: [
      { name: "Python", level: 85 },
      { name: "SQL", level: 65 },
      { name: "R", level: 50 },
    ],
    Visualization: [
      { name: "Power BI", level: 60 },
      { name: "MS Excel", level: 90 },
    ],
    Documentation: [
      { name: "Notion", level: 95 },
      { name: "Google Workspace", level: 90 },
      { name: "MS Word", level: 95 },
    ],
    Research: [
      { name: "Laboratory Techniques", level: 90 },
      { name: "Problem Solving", level: 88 },
      { name: "Data Interpretation", level: 85 },
      { name: "Research Documentation", level: 92 },
    ],
    "Soft Skills": [
      { name: "Public Speaking", level: 90 },
      { name: "Team Leadership", level: 85 },
      { name: "Analytical Thinking", level: 88 },
    ],
  };

  const toggleCategory = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="skills-bay-container">
      <div className="skills-bay">
        {Object.keys(skills).map((category) => (
          <div
            key={category}
            className="category"
            onClick={() => toggleCategory(category)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <h3>{category}</h3>
            {activeCategory === category && (
              <div className="skills-list">
                {skills[category].map((skill) => (
                  <div key={skill.name} className="skill-bar">
                    <span className="skill-label">{skill.name}</span>
                    <div className="bar">
                      <div
                        className="bar-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsBay;
