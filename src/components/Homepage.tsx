import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

// Brand logos
import shopeeLogo from "../assets/brands/shopee.png";
import lenovoLogo from "../assets/brands/lenovo.png";
import lululemonLogo from "../assets/brands/lululemon.png";
import nikeLogo from "../assets/brands/nike.png";
import travelokaLogo from "../assets/brands/traveloka.png";
import samsungLogo from "../assets/brands/samsung.png";
import lazadaLogo from "../assets/brands/lazada.png";
import temuLogo from "../assets/brands/temu.png";
import tripLogo from "../assets/brands/trip.png";
import agodaLogo from "../assets/brands/agoda.png";
import tiktokshopLogo from "../assets/brands/tiktokshop.png";
import taobaoLogo from "../assets/brands/taobao.png";

// Social project images
import floodReliefImg from "../assets/social-projects/flood-relief.png";
import educationFundImg from "../assets/social-projects/education-fund.png";
import wwfConservationImg from "../assets/social-projects/wwf-conservation.png";
import povertyAidImg from "../assets/social-projects/poverty-aid.png";

interface Brand {
  id: number;
  name: string;
  logo: string;
  cashback: string;
}

interface SocialProject {
  id: number;
  title: string;
  image: string;
}

const Homepage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const navigate = useNavigate();

  // Social projects slideshow data
  const socialProjects: SocialProject[] = [
    {
      id: 1,
      title: "Flood Relief Fund",
      image: floodReliefImg,
    },
    {
      id: 2,
      title: "Education for All",
      image: educationFundImg,
    },
    {
      id: 3,
      title: "WWF Conservation",
      image: wwfConservationImg,
    },
    {
      id: 4,
      title: "Poverty Aid Program",
      image: povertyAidImg,
    },
  ];

  // Brands data
  const brands: Brand[] = [
    { id: 1, name: "Shopee", logo: shopeeLogo, cashback: "Up to 8% cashback" },
    { id: 2, name: "Lenovo", logo: lenovoLogo, cashback: "Up to 5% cashback" },
    {
      id: 3,
      name: "lululemon",
      logo: lululemonLogo,
      cashback: "Up to 6% cashback",
    },
    { id: 4, name: "Nike", logo: nikeLogo, cashback: "Up to 4% cashback" },
    { id: 5, name: "Taobao", logo: taobaoLogo, cashback: "Up to 7% cashback" },
    {
      id: 6,
      name: "Traveloka",
      logo: travelokaLogo,
      cashback: "Up to 3% cashback",
    },
    {
      id: 7,
      name: "Samsung",
      logo: samsungLogo,
      cashback: "Up to 5% cashback",
    },
    { id: 8, name: "Lazada", logo: lazadaLogo, cashback: "Up to 9% cashback" },
    {
      id: 9,
      name: "Temu",
      logo: temuLogo,
      cashback: "Up to 4% cashback",
    },
    {
      id: 10,
      name: "Trip",
      logo: tripLogo,
      cashback: "Up to 6% cashback",
    },
    { id: 11, name: "Agoda", logo: agodaLogo, cashback: "Up to 5% cashback" },
    {
      id: 12,
      name: "H&M",
      logo: tiktokshopLogo,
      cashback: "Up to 4% cashback",
    },
  ];

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 40) {
        // Swipe left
        setCurrentSlide((prev) =>
          prev === socialProjects.length - 1 ? prev : prev + 1
        );
      } else if (distance < -40) {
        // Swipe right
        setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % socialProjects.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [socialProjects.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-text">🍍</span>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search brands..."
              className="search-input"
            />
          </div>
          <div className="header-buttons">
            <button className="language-btn">EN</button>
            <button className="profile-btn" onClick={() => navigate("/profile")}>
              <i className="bi bi-person-circle"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Social Projects Slideshow */}
      <div className="slideshow-container">
        <div
          className="slideshow-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => navigate("/Program")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="slides-container"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {socialProjects.map((project) => (
              <div key={project.id} className="slide">
                <img
                  src={project.image}
                  alt={project.title}
                  className="slide-image"
                />
                <div className="slide-overlay">
                  <h3 className="slide-title">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Slide indicators BELOW slideshow */}
      <div className="slide-indicators">
        {socialProjects.map((_, index) => (
          <button
            key={index}
            className={`indicator ${currentSlide === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Brands Section */}
      <div className="brands-section">
        <div className="section-title-row">
          <h2 className="section-title">Popular Brands</h2>
          <button className="see-more-btn">See more</button>
        </div>
        <div className="brands-container">
          <div className="brands-grid">
            {brands.map((brand) => (
              <div
                key={brand.id}
                className="brand-card"
                onClick={() => {
                  if (brand.name.toLowerCase() === "shopee") {
                    navigate("/shopee");
                  }
                }}
                style={{
                  cursor:
                    brand.name.toLowerCase() === "shopee"
                      ? "pointer"
                      : "default",
                }}
              >
                <div className="brand-logo">
                  <img src={brand.logo} alt={brand.name} />
                </div>
                <div className="brand-info">
                  <h4 className="brand-name">{brand.name}</h4>
                  <p className="brand-cashback">{brand.cashback}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
