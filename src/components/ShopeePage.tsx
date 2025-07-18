import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shoppeeBg from "../assets/shoppeePage.jpg";

const ShopeePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/shopee-paid");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${shoppeeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default ShopeePage;
