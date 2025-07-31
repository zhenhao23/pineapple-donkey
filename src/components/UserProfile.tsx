import React from "react";
import { useNavigate } from "react-router-dom";

// Import timeline images
import nestSite from "../assets/timeline/nest-site.png";
import hatcheryCages from "../assets/timeline/hatchery-cages.png";
import hatchlingsBeach from "../assets/timeline/hatchlings-beach.png";
import posterWorkshop from "../assets/timeline/poster-workshop.png";
import gpsTag from "../assets/timeline/gps-tag.png";

import evidence1 from "../assets/evidence/evidence_1.jpg";
import evidence2 from "../assets/evidence/evidence_2.jpeg";
import evidence3 from "../assets/evidence/evidence_3.jpg";
import evidence4 from "../assets/evidence/evidence_4.jpg";
import evidence5 from "../assets/evidence/evidence_5.jpg";
import evidence6 from "../assets/evidence/evidence_6.jpg";
import evidence7 from "../assets/evidence/evidence_7.jpg";
import evidence8 from "../assets/evidence/evidence_8.jpeg";
import pinedonkey from "../assets/evidence/logo_pinekey.png";

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  
  // State for carousel navigation
  const [carouselIndex, setCarouselIndex] = React.useState<{[key: number]: number}>({});

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

      {/* Logout Button */}
      <button 
        onClick={() => {
          // Placeholder for logout functionality
          window.location.href = "/logout-placeholder";
        }}
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          background: "#4a7c59",
          border: "none",
          fontSize: "14px",
          cursor: "pointer",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 16px",
          borderRadius: "8px",
          fontWeight: "600"
        }}
      >
        Log out
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
        {/* Profile image using pinedonkey logo */}
        <img
          src={pinedonkey}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
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

        {/* Verification Status Box */}
        <div style={{
          marginBottom: "24px",
          padding: "20px",
          backgroundColor: "#f8fcf9",
          borderRadius: "16px",
          border: "2px solid #d4f4dd",
          textAlign: "center",
          boxShadow: "0 4px 12px rgba(74, 124, 89, 0.08)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Background Pattern */}
          <div style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            width: "60px",
            height: "60px",
            background: "linear-gradient(45deg, #e8f5e8, #d4f4dd)",
            borderRadius: "50%",
            opacity: "0.5"
          }} />
          
          {/* Header with Icon */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "12px"
          }}>
            {/* Shield Icon */}
            <div style={{
              width: "24px",
              height: "24px",
              background: "#4a7c59",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              ✓
            </div>
            <span style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#4a7c59"
            }}>
              MyDigital ID
            </span>
          </div>

          {/* Verification Badge */}
          <div style={{
            width: "50px",
            height: "50px",
            background: "linear-gradient(135deg, #4a7c59, #6b9b75)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px auto",
            boxShadow: "0 4px 8px rgba(74, 124, 89, 0.2)"
          }}>
            <div style={{
              color: "#fff",
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              🛡️
            </div>
          </div>

          {/* Digital ID Number */}
          <div style={{
            backgroundColor: "#e8f5e8",
            borderRadius: "8px",
            padding: "8px 12px",
            marginBottom: "12px",
            border: "1px solid #c3e6c3"
          }}>
            {/* <div style={{
              fontSize: "11px",
              color: "#4a7c59",
              fontWeight: "600",
              marginBottom: "2px"
            }}>
              Digital ID
            </div> */}
            <div style={{
              fontSize: "14px",
              fontWeight: "700",
              color: "#2d5233",
              letterSpacing: "0.5px"
            }}>
              MD-890123456789
            </div>
          </div>

          <p style={{
            fontSize: "13px",
            color: "#6b9b75",
            margin: "0 0 16px 0",
            lineHeight: "1.4"
          }}>
            Your identity has been verified through secure Malaysia government authentication
          </p>

          {/* Status Indicators */}
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            gap: "8px",
            fontSize: "11px",
            color: "#4a7c59",
            fontWeight: "600"
          }}>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                background: "#4a7c59",
                borderRadius: "50%"
              }} />
              Secure
            </span>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                background: "#4a7c59",
                borderRadius: "50%"
              }} />
              Verified
            </span>
            <span style={{
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}>
              <div style={{
                width: "6px",
                height: "6px",
                background: "#4a7c59",
                borderRadius: "50%"
              }} />
              Protected
            </span>
          </div>
        </div>

        {/* Summary Boxes */}
        <div style={{
          display: "flex",
          gap: "12px",
          width: "100%",
          maxWidth: "400px",
          margin: "24px auto 0 auto"
        }}>
          {/* Total Cashback Earned Box */}
          <div style={{
            flex: "1",
            padding: "16px",
            backgroundColor: "#f5faf6",
            borderRadius: "12px",
            border: "2px solid #e0f0e3",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(74, 124, 89, 0.1)"
          }}>
            <div style={{
              fontSize: "14px",
              color: "#4a7c59",
              fontWeight: "600",
              marginBottom: "4px"
            }}>
              Total Cashback
            </div>
            <div style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#2d5233"
            }}>
              RM2,000
            </div>
          </div>

          {/* Total Donation Box */}
          <div style={{
            flex: "1",
            padding: "16px",
            backgroundColor: "#f5faf6",
            borderRadius: "12px",
            border: "2px solid #e0f0e3",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(74, 124, 89, 0.1)"
          }}>
            <div style={{
              fontSize: "14px",
              color: "#4a7c59",
              fontWeight: "600",
              marginBottom: "4px"
            }}>
              Total Donation
            </div>
            <div style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#2d5233"
            }}>
              RM500
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <h2 style={{
          color: "#4a7c59",
          fontSize: "1.5rem",
          fontWeight: "800",
          marginBottom: "32px",
          marginTop: "40px",
          textAlign: "center",
          letterSpacing: "1px",
          background: "linear-gradient(90deg, #4a7c59 60%, #6b9b75 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>
          Donation History
        </h2>
        
        {/* Timeline Container */}
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: "540px",
          margin: "0 auto",
          padding: "0 16px"
        }}>
          {/* Timeline Line */}
          <div style={{
            position: "absolute",
            left: "41px",
            top: "0",
            bottom: "0",
            width: "6px",
            background: "linear-gradient(180deg, #4a7c59 0%, #6b9b75 100%)",
            borderRadius: "8px",
            zIndex: "0",
            boxShadow: "0 0 12px 0 rgba(74, 124, 89, 0.1)",
            opacity: "0.85",
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.18) 0 8px,
              transparent 8px 16px
            ),
            linear-gradient(180deg, #4a7c59 0%, #6b9b75 100%)`
          }} />
          
          {/* Timeline Items */}
          {[
            {
              title: "WWF Save Sea Turtles",
              date: "15/03/24",
              images: [evidence1, evidence2, evidence3, evidence4],
              completed: true
            },
            {
              title: "WWF Save Sea Turtles", 
              date: "22/06/24",
              images: [evidence5, evidence6, evidence7, evidence8],
              completed: true
            }
          ].map((milestone, idx) => (
            <div key={idx} style={{
              display: "flex",
              alignItems: "flex-start",
              position: "relative",
              marginBottom: "48px"
            }}>
              {/* Timeline Dot */}
              <div style={{
                width: "20px",
                height: "20px",
                background: "#4a7c59",
                border: "4px solid #fff",
                borderRadius: "50%",
                position: "relative",
                zIndex: "2",
                marginRight: "24px",
                marginLeft: "16px",
                boxShadow: "0 2px 8px rgba(74, 124, 89, 0.1)"
              }} />
              
              {/* Timeline Card */}
              <div style={{
                background: "#fff",
                borderRadius: "22px",
                boxShadow: "0 4px 24px 0 rgba(74, 124, 89, 0.1)",
                border: "1.5px solid #c3e6c3",
                padding: "20px",
                flex: "1",
                zIndex: "1",
                marginLeft: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                overflow: "hidden",
                position: "relative"
              }}>
                {/* Timeline Header */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "0",
                  width: "100%"
                }}>
                  <span style={{
                    background: "#c3e6c3",
                    color: "#4a7c59",
                    fontWeight: "700",
                    borderRadius: "16px",
                    padding: "4px 16px",
                    fontSize: "1rem",
                    marginBottom: "4px",
                    display: "inline-block"
                  }}>
                    {milestone.date}
                  </span>
                  <h3 style={{
                    fontSize: "1.2rem",
                    color: "#4a7c59",
                    fontWeight: "700",
                    margin: "0",
                    textAlign: "center"
                  }}>
                    {milestone.title}
                  </h3>
                </div>
                
                {/* Interactive Image Carousel */}
                <div style={{
                  width: "100%",
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden"
                }}>
                  {/* Current Image */}
                  <img
                    src={milestone.images[carouselIndex[idx] || 0]}
                    alt={milestone.title}
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "cover",
                      background: "#e8f5e8",
                      border: "2px solid #c3e6c3",
                      boxShadow: "0 2px 8px rgba(74, 124, 89, 0.06)"
                    }}
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={() => {
                      const currentIndex = carouselIndex[idx] || 0;
                      const newIndex = currentIndex > 0 ? currentIndex - 1 : milestone.images.length - 1;
                      setCarouselIndex(prev => ({ ...prev, [idx]: newIndex }));
                    }}
                    style={{
                      position: "absolute",
                      left: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(74, 124, 89, 0.8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      zIndex: "1"
                    }}
                  >
                    ←
                  </button>
                  
                  <button
                    onClick={() => {
                      const currentIndex = carouselIndex[idx] || 0;
                      const newIndex = currentIndex < milestone.images.length - 1 ? currentIndex + 1 : 0;
                      setCarouselIndex(prev => ({ ...prev, [idx]: newIndex }));
                    }}
                    style={{
                      position: "absolute",
                      right: "8px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(74, 124, 89, 0.8)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "32px",
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "14px",
                      zIndex: "1"
                    }}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;