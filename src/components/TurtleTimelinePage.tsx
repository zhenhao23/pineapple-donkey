import React from "react";
import { useNavigate } from "react-router-dom";
import "./TurtleTimelinePage.css";

import nestSite from "../assets/timeline/nest-site.png";
import hatcheryCages from "../assets/timeline/hatchery-cages.png";
import hatchlingsBeach from "../assets/timeline/hatchlings-beach.png";
import posterWorkshop from "../assets/timeline/poster-workshop.png";
import gpsTag from "../assets/timeline/gps-tag.png";

const timeline = [
  {
    title: "Discovery & Nest Monitoring",
    date: "Jan 2024",
    desc: "WWF scouts nesting beaches to identify turtle nesting sites. Locations are recorded and protected.",
    image: nestSite,
  },
  {
    title: "Egg Protection Program",
    date: "Feb 2024",
    desc: "Eggs are moved to hatcheries or protected in situ to increase hatch rates.",
    image: hatcheryCages,
  },
  {
    title: "Hatchling Release",
    date: "Mar 2024",
    desc: "Baby turtles are released into the ocean with community support and safety measures.",
    image: hatchlingsBeach,
  },
  {
    title: "Community Education & Outreach",
    date: "Apr 2024",
    desc: "Schools and local communities are educated on turtle conservation and pollution prevention.",
    image: posterWorkshop,
    locked: true,
  },
  {
    title: "Tracking & Long-Term Impact",
    date: "May 2024",
    desc: "Tagged turtles are tracked via GPS to study migration and survival rates.",
    image: gpsTag,
    locked: true,
  },
];

const TARGET = 100000;
const CURRENT = 50000;
const PROGRESS = (CURRENT / TARGET) * 100;

const TurtleTimelinePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="turtle-timeline-page">
      <button
        className="timeline-back-btn"
        onClick={() => navigate(-1)}
        aria-label="Back"
      >
        ← Back
      </button>
      <h1 className="turtle-main-title">WWF Save Sea Turtles</h1>
      <button className="turtle-donate-btn">Donate</button>
      <div className="turtle-progress-bar-wrap">
        <div className="turtle-progress-bar-bg">
          <div
            className="turtle-progress-bar-fg"
            style={{ width: `${PROGRESS}%` }}
          />
        </div>
        <div className="turtle-progress-labels">
          <span className="turtle-progress-current">
            RM{CURRENT.toLocaleString()}
          </span>
          <span className="turtle-progress-target">
            RM{TARGET.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="turtle-desc">
        Help protect endangered sea turtles in Malaysia. Your donation supports
        conservation efforts and safeguards their natural habitats.
      </div>
      <h2 className="timeline-title" style={{ marginTop: 40 }}>
        Program Milestone
      </h2>
      <div className="timeline-container">
        <div className="timeline-line" />
        {timeline.map((milestone, idx) => (
          <div className="timeline-item" key={milestone.title}>
            <div className="timeline-dot" />
            <div className="timeline-card">
              {milestone.locked && (
                <>
                  <div className="timeline-card-lock-overlay" />
                  <div className="timeline-card-lock-icon">
                    <svg width="64" height="64" viewBox="0 0 36 36" fill="none">
                      <circle
                        cx="18"
                        cy="18"
                        r="18"
                        fill="#ffe066"
                        opacity="1"
                      />
                      <path
                        d="M12 17V14a6 6 0 1 1 12 0v3"
                        stroke="#bfa100"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect
                        x="11"
                        y="17"
                        width="14"
                        height="9"
                        rx="3"
                        fill="#fffde7"
                        fillOpacity="1"
                        stroke="#bfa100"
                        strokeWidth="2"
                      />
                      <circle cx="18" cy="22" r="1.5" fill="#bfa100" />
                    </svg>
                  </div>
                </>
              )}
              <img
                src={milestone.image}
                alt={milestone.title}
                className="timeline-main-image"
              />
              <div className="timeline-header">
                <span className="timeline-date">{milestone.date}</span>
                <h2 className="timeline-milestone">{milestone.title}</h2>
              </div>
              <p className="timeline-desc">{milestone.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TurtleTimelinePage;
