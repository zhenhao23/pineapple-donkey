import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Social project images
import floodReliefImg from "../assets/social-projects/flood-relief.png";
import educationFundImg from "../assets/social-projects/education-fund.png";
import wwfConservationImg from "../assets/social-projects/wwf-turtle.jpg";
import povertyAidImg from "../assets/social-projects/poverty-aid.png";
import malaysiaFlag from "../assets/flags/malaysia_flag.png";

const photoUrls = [
  {
    name: "WWF Conservation",
    url: wwfConservationImg,
    programName: "Help Save Our Turtles",
    organization: "WWF",
    summary:
      "Help protect endangered sea turtles in Malaysia. Your donation supports conservation efforts and safeguards their natural habitats.",
    target: "RM 100,000",
    current: "RM 50,000",
  },
  {
    name: "Poverty Aid Program",
    url: povertyAidImg,
    programName: "Support Local Communities",
    organization: "Local NGO",
    summary:
      "Join us in our mission to alleviate poverty in rural areas. Your contributions will provide essential resources and support to those in need.",
    target: "RM 200,000",
    current: "RM 120,000",
  },
  {
    name: "Flood Relief Fund",
    url: floodReliefImg,
    programName: "Rebuild Lives After Floods",
    organization: "Disaster Relief Org",
    summary:
      "Assist communities affected by recent floods. Your donations will help provide immediate relief and long-term recovery solutions.",
    target: "RM 300,000",
    current: "RM 180,000",
  },
  {
    name: "Education for All",
    url: educationFundImg,
    programName: "Empower Through Education",
    organization: "Education NGO",
    summary:
      "Support underprivileged children in accessing quality education. Your contributions will fund scholarships and educational resources.",
    target: "RM 150,000",
    current: "RM 90,000",
  },
];

const Program: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleDonate = (programName: string) => {
    if (programName === "Help Save Our Turtles") {
      navigate("/turtle-timeline");
    } else {
      alert(`Donate to: ${programName}`);
    }
  };

  return (
    <div style={{ padding: "80px 24px 24px 24px", position: "relative" }}>
      {/* Back Button (UI refer to timeline) */}
      <button
        className="timeline-back-btn"
        style={{ position: "absolute", top: 24, left: 24, zIndex: 10 }}
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        ← Back
      </button>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        All Programs
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {photoUrls.map((photo, index) => {
          const isExpanded = expandedIndex === index;
          const isWWF = photo.name === "WWF Conservation";

          return (
            <button
              key={index}
              onClick={() => handleExpand(index)}
              style={{
                position: "relative",
                width: "100%",
                height: "200px",
                backgroundImage: `url(${photo.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "none",
                borderRadius: "12px",
                overflow: "hidden",
                padding: 0,
                cursor: "pointer",
              }}
            >
              {/* Malaysia flag & label for WWF Conservation only */}
              {isWWF && !isExpanded && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 2,
                  }}
                >
                  <img
                    src={malaysiaFlag}
                    alt="Malaysia Flag"
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginBottom: "4px",
                    }}
                  />
                </div>
              )}

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "16px",
                  textAlign: "left",
                }}
              >
                {!isExpanded ? (
                  <>
                    <div>
                      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                        {photo.programName}
                      </div>
                      <div style={{ fontSize: "16px", fontStyle: "italic" }}>
                        {photo.organization}
                      </div>
                    </div>
                    <div style={{ fontSize: "12px", textAlign: "right" }}>
                      (Click to learn more)
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div
                        style={{
                          fontSize: "14px",
                          marginBottom: "8px",
                          lineHeight: "1.4",
                        }}
                      >
                        {photo.summary}
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        <strong>Target:</strong> {photo.target}
                      </div>
                      <div style={{ fontSize: "14px" }}>
                        <strong>Current:</strong> {photo.current}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent closing on click
                          handleDonate(photo.programName);
                        }}
                        style={{
                          backgroundColor: "#00b894",
                          border: "none",
                          borderRadius: "6px",
                          padding: "8px 16px",
                          color: "white",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Donate
                      </button>
                    </div>
                  </>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ⬇️ Back to Home Button */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#00b894",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Program;
