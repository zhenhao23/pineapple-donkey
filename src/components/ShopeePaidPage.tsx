import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shopeePaidBg from "../assets/shoppeePaid.jpg";

const ShopeePaidPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/allocate");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${shopeePaidBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default ShopeePaidPage;
