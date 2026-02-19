import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../FirebaseConfig";

const CommentForm = ({ compact = false }) => {
  const NAVY = "#212842";
  const TEAL = "#2A3354";
  const SKY = "#F0E7D5";
  const BEIGE = "#F0E7D5";
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);

    try {
      await addDoc(collection(db, "comments"), {
        text: comment,
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setComment("");
      setTimeout(() => setSubmitted(false), 2500);
    } catch (error) {
      console.error("Error adding comment:", error);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: compact ? "auto" : "60vh",
        color: BEIGE,
        fontFamily: "Inter, sans-serif",
        width: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px", // tighter spacing than before
          lineHeight: "1.1",
        }}
      >
        <h2
          style={{
            fontSize: compact ? "22px" : "32px",
            fontWeight: "700",
            marginBottom: "0px", // tighter gap
          }}
        >
          Share
        </h2>
        <p
          style={{
            fontSize: compact ? "22px" : "32px",
            color: SKY,
            fontWeight: "500",
            marginTop: "0px",
            marginBottom:"10px" // removes gap between them
          }}
        >
          comments
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            backgroundColor: NAVY,
            color: BEIGE,
            border: "1px solid rgba(200,217,230,0.35)",
            borderRadius: "10px",
            padding: "15px 20px",
            width: compact ? "100%" : "250px",
            maxWidth: compact ? "420px" : "250px",
            outline: "none",
            fontSize: "1rem",
            transition: "border 0.3s ease",
          }}
          onFocus={(e) => (e.target.style.border = "1px solid #F0E7D5")}
          onBlur={(e) =>
            (e.target.style.border = "1px solid rgba(200,217,230,0.35)")
          }
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#2A3354" : TEAL,
            color: BEIGE,
            border: "2px solid #F0E7D5",
            borderRadius: "10px",
            padding: "12px 30px",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 0 0 1px rgba(15,26,43,0.5), 0 0 10px rgba(86,124,141,0.2)",
            transition: "all 0.3s ease",
            width: compact ? "100%" : "292px",
            maxWidth: compact ? "420px" : "292px",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 0 2px rgba(240,231,213,0.25), 0 0 15px rgba(86,124,141,0.45)";
            e.target.style.borderColor = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "0 0 0 1px rgba(15,26,43,0.5), 0 0 10px rgba(86,124,141,0.2)";
            e.target.style.borderColor = "#F0E7D5";
          }}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {submitted && (
        <p
          style={{
            marginTop: "15px",
            color: BEIGE,
            fontWeight: "500",
            transition: "opacity 0.3s",
          }}
        >
          Thank you for sharing your thoughts!
        </p>
      )}
    </div>
  );
};

export default CommentForm;







