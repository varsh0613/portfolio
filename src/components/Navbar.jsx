import React from "react";

const Navbar = ({ activeCard, onNavClick }) => {
  const MIDNIGHT = "#212842";
  const CREAM = "#F0E7D5";
  const MUTED = "#F0E7D5";
  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Projects", id: "projects" },
    { label: "Internships", id: "internships" },
    { label: "Dashboards", id: "dashboards" },
    { label: "Certifications", id: "certifications" },
    { label: "Education", id: "education" },
    { label: "Blog", id: "blog" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "80px",
        right: "90px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 20px",
        backgroundColor: MIDNIGHT,
        border: "1px solid rgba(200, 217, 230, 0.35)",
        borderRadius: "20px",
        backdropFilter: "blur(12px)",
        zIndex: 1000,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        flexWrap: "wrap",
        gap: "2px",
        width: "auto",
        height: "48px",
        marginBottom: "20px",
        marginLeft: "2px",
      }}
    >
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => onNavClick(link.id)}
          style={{
            background: "none",
            border: "none",
            color: activeCard === link.id ? CREAM : MUTED,
            textDecoration: "none",
            fontWeight: activeCard === link.id ? 700 : 500,
            fontSize: "11px",
            letterSpacing: "0.5px",
            transition: "all 0.3s ease",
            cursor: "pointer",
            padding: "6px 11px",
            borderRadius: "5px",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = CREAM;
            e.currentTarget.style.backgroundColor = "rgba(82,103,125,0.28)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = activeCard === link.id ? CREAM : MUTED;
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          {link.label}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;







