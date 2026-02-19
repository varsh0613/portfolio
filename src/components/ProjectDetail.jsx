// src/components/ProjectDetail.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import projectsData from "./ProjectsData";
import Navbar from "./Navbar";
import FloatingParticlesBackground from "./FloatingParticlesBackground";
import logo from "../assets/logo.png";
import "./ProjectDetail.css";

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find((p) => p.id.toString() === id);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!project) {
    return (
      <div className="project-detail-not-found">
        <h2>Project Not Found</h2>
        <Link to="/projects" className="project-detail-back-link">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="project-detail-page">
      {/* Background */}
      <div className="project-detail-background">
        <FloatingParticlesBackground />
      </div>

      {/* Navbar */}
      <Navbar logoSrc={logo} />

      {/* Project Detail */}
      <div className="project-detail-container">
   
        <h1 className="project-detail-title">{project.title}</h1>
        
        {/* Problem Statement */}
        <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem" }}>Problem</h2>
          <p style={{ color: "#cccccc", fontSize: "1rem", lineHeight: "1.7" }}>
            {project.fullDescription}
          </p>
        </div>

        <img
           src={project.thumbnail}
           alt={project.title}
           className="project-detail-thumbnail"
           onClick={() => setLightboxImage(project.thumbnail)}
           style={{ cursor: "pointer" }}
         />

        {project.details && project.details.length > 0 && (
          <>
            {project.details.map((section, index) => (
              <div key={index} className="project-detail-section">
                <h2 className="project-detail-section-title">{section.title}</h2>
                <ul className="project-detail-section-points">
                  {section.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
        {/* Additional Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="project-detail-gallery">
            {project.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Project Image ${index + 1}`}
                className="project-detail-gallery-img"
                onClick={() => setLightboxImage(img)}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        )}

        {/* Video Section */}
        {project.video && (
          <div style={{ marginBottom: "3rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff", marginBottom: "1.5rem" }}>Demo</h2>
            <video
              style={{
                width: "100%",
                maxWidth: "100%",
                borderRadius: "16px",
                border: "2px solid #1a1a1a",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
              }}
              controls
              controlsList="nodownload"
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

          <div className="project-detail-buttons-container">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-detail-github-button"
            >
              View Repo
            </a>
          )}
          <Link to="/projects" className="project-detail-back-button">
            ← Back
          </Link>
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="project-detail-lightbox"
          onClick={() => setLightboxImage(null)}
        >
          <div className="project-detail-lightbox-content">
            <img src={lightboxImage} alt="Full size" className="project-detail-lightbox-img" />
            <button
              className="project-detail-lightbox-close"
              onClick={() => setLightboxImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
