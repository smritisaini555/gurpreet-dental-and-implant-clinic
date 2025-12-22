import React, { useState, useEffect, useRef } from "react";
import "./WhyUs.scss";
import { useNavigate } from "react-router-dom";

const CounterItem = ({
  targetValue,
  label,
  icon,
  isHighlight,
  shouldCount,
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  const finalNumber = shouldCount
    ? parseInt(targetValue.replace(/[^0-9]/g, ""))
    : 0;
  const suffix = targetValue.replace(/[0-9]/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    // If shouldCount is false, we don't run the animation interval
    if (!hasStarted || !shouldCount) return;

    let start = 0;
    const duration = 2000;
    const increment = Math.ceil(finalNumber / (duration / 16));

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalNumber) {
        setCount(finalNumber);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, finalNumber, shouldCount]);

  return (
    <div
      className={`counter-item ${isHighlight ? "highlight" : ""}`}
      ref={elementRef}
    >
      <div className="counter-icon">{icon}</div>
      <h3 className="stat-value">
        {/* If shouldCount is true, show animated 'count'. Otherwise show static 'targetValue' */}
        {shouldCount ? `${count.toLocaleString()}${suffix}` : targetValue}
      </h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const WhyUs = () => {
  const navigate = useNavigate();

  const points = [
    {
      title: "A Legacy of Trust",
      desc: "Nearly three decades of specialized care for every age group.",
    },
    {
      title: "Advanced Diagnostic Technology",
      desc: "Featuring Digital OPG for high-fidelity treatment planning.",
    },
    {
      title: "Specialized Care",
      desc: "Expert-led treatments in Dental Implants, RCT, and Laser Dentistry.",
    },
    {
      title: "Patient-Centric",
      desc: "Streamlined appointments and rigorous sanitization protocols.",
    },
  ];

  const stats = [
    {
      value: "3000+",
      label: "Successful Dental Implants",
      icon: "🦷",
      highlight: true,
      shouldCount: true,
    },
    {
      value: "40000+",
      label: "Successful RCT's",
      icon: "❤️",
      shouldCount: true,
    },
    {
      value: "30+",
      label: "Years Of Experience",
      icon: "👨‍⚕️",
      shouldCount: true,
    },
    {
      value: "2024-2025",
      label: "IDA Awarded Clinic",
      icon: "🏆",
      shouldCount: false,
    },
  ];

  const handleBookAppointment = () => {
    navigate("/appointments");
  };

  return (
    <section className="why-us">
      <div className="container">
        <div className="flex-wrapper">
          <div className="content-side">
            <span className="tagline">SINCE 1995</span>
            <h2 className="title">Why Families Choose Us</h2>
            <p className="description">
              Your health and safety is a major concern for us, so sterilization
              and infection prevention are our top priorities. We maintain the
              highest standards of cleanliness and sterility, and our staff is
              specially trained in Universal (Standard) Precautions.
            </p>
            <div className="points-grid">
              {points.map((point, index) => (
                <div key={index} className="point-card">
                  <h4>{point.title}</h4>
                  <p>{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="image-side">
            <div className="img-container">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
                alt="Clinic"
              />
              <div className="accent-border"></div>
            </div>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="stats-main-container">
          <div className="stats-left-text">
            <span className="mini-tag">COMMITMENT TO EXCELLENCE</span>
            <h2 className="stats-title">Your Smile, Our Priority</h2>
            <p className="stats-desc">
              At Gurpreet Dental and Implant Centre, your smile is our priority.
              We look forward to welcoming you to our family and providing you
              with the highest level of dental care.
            </p>
            <button className="book-btn" onClick={handleBookAppointment}>
              BOOK YOUR APPOINTMENT TODAY <span>→</span>
            </button>
          </div>

          <div className="stats-right-grid">
            <div className="counter-grid">
              {stats.map((stat, index) => (
                <CounterItem
                  key={index}
                  targetValue={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                  isHighlight={stat.highlight}
                  shouldCount={stat.shouldCount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
