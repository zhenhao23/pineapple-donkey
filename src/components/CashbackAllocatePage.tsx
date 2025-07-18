import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import shopeeLogo from "../assets/brands/shopee.png";
import "./CashbackAllocatePage.css";

const CASHBACK_AMOUNT = 20; // RM20 example

const donationOptions = [0, 25, 50, 75, 100];

const CashbackAllocatePage: React.FC = () => {
  const [donatePercent, setDonatePercent] = useState(0);
  const navigate = useNavigate();

  const donated = (CASHBACK_AMOUNT * donatePercent) / 100;
  const kept = CASHBACK_AMOUNT - donated;

  return (
    <div className="allocate-page">
      {/* Green tick in circle */}
      <div className="tick-circle">
        <svg width="56" height="56" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill="#2ecc71" />
          <polyline
            points="16,30 25,39 40,20"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* Cashback text */}
      <div className="cashback-text">Enjoy your 15% cashback</div>
      {/* Shopee logo */}
      <div className="brand-logo-center">
        <img src={shopeeLogo} alt="Shopee" />
      </div>
      {/* Green summary box */}
      <div className="green-summary-box">
        <div className="donate-summary">
          <div className="summary-row">
            <span className="summary-label">Donation:</span>
            <span className="summary-donation">RM{donated.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">You keep:</span>
            <span className="summary-keep">RM{kept.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* Existing allocation UI */}
      <div className="allocate-content">
        <div className="donate-label">
          How much would you like to donate to{" "}
          <span className="donate-project">WWF Save Sea Turtles</span>?
        </div>
        <div className="donate-options">
          {donationOptions.map((percent) => (
            <button
              key={percent}
              onClick={() => setDonatePercent(percent)}
              className={`donate-btn${
                donatePercent === percent ? " selected" : ""
              }`}
            >
              {percent}%
            </button>
          ))}
        </div>
        <button className="done-btn" onClick={() => navigate("/")}>
          Done
        </button>
      </div>
    </div>
  );
};

export default CashbackAllocatePage;
