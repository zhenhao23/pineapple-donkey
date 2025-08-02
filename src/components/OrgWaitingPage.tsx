import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrgWaitingPage.css";
import payhackWaiting from "../assets/login/Payhack-Waiting.svg";

const OrgWaitingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <button className="close-btn" onClick={() => navigate("/")}>
        ✕
      </button>
      <div className="login-header">
        <div className="logo-row">
          <img src={payhackWaiting} alt="Registration Pending" className="payhackWaiting" />
        </div>
        <h2>Registration Under Review</h2>
        <div className="waiting-message">
          <p>We are currently confirming your documentation with the relevant authorities.</p>
          <p className="timeline-text">This process might take up to 7 working days.</p>
          <p className="thank-you-text">Thank you for your patience.</p>
        </div>
      </div>
    </div>
  );
};

export default OrgWaitingPage;
