import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      padding: "24px", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      position: "relative"
    }}>
      {/* Back Button */}
      <button 
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          background: "none",
          border: "none",
          fontSize: "16px",
          cursor: "pointer",
          color: "#4a7c59",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px"
        }}
      >
        ← Back
      </button>
      {/* Profile Picture */}
      <div style={{
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        backgroundColor: "#d4f4dd",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
        marginTop: "60px",
        overflow: "hidden",
        border: "4px solid #f0f0f0",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        {/* Placeholder for profile image - you can replace this with an actual image */}
        <div style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#a8e6a3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "48px",
          color: "#4a7c59"
        }}>
          👤
        </div>
      </div>

      {/* User Information */}
      <div style={{
        textAlign: "center",
        maxWidth: "400px",
        width: "100%"
      }}>
        {/* Username */}
        <h2 style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
          color: "#333"
        }}>
          Don Don Donkey
        </h2>

        {/* Mobile Number */}
        <div style={{
          marginBottom: "12px",
          padding: "8px 16px",
          backgroundColor: "#e8f5e8",
          borderRadius: "8px",
          border: "1px solid #c3e6c3"
        }}>
          <strong style={{ color: "#4a7c59" }}>Mobile Number:</strong>
          <div style={{ fontSize: "16px", color: "#333", marginTop: "4px" }}>
            +60327810500
          </div>
        </div>

        {/* TIN */}
        <div style={{
          marginBottom: "12px",
          padding: "8px 16px",
          backgroundColor: "#e8f5e8",
          borderRadius: "8px",
          border: "1px solid #c3e6c3"
        }}>
          <strong style={{ color: "#4a7c59" }}>TIN:</strong>
          <div style={{ fontSize: "16px", color: "#333", marginTop: "4px" }}>
            IG56003500070
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;