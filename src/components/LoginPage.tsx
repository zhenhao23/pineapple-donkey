import React from "react";
import { useNavigate } from "react-router-dom";
import jataNegara from "../assets/login/jata-negara.webp";
import mydigitalid from "../assets/login/mydigitalid.svg";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login, then redirect to homepage
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="logo-row">
          <img src={jataNegara} alt="Jata Negara" className="jata-img" />
          <span className="logo-divider">|</span>
          <img
            src={mydigitalid}
            alt="MyDigitalID"
            className="mydigitalid-img"
          />
        </div>
        <h2>Welcome to Pinekey Drop</h2>
      </div>
      <button className="mydigitalid-btn" onClick={handleLogin}>
        <span>Login with MyDigitalID</span>
      </button>
    </div>
  );
};

export default LoginPage;
