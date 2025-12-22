import React from "react";
import { executiveDirector, doctorsList } from "../../data/doctors";
import "./MeetOurDoctors.scss";

const MeetOurDoctors = () => {
  return (
    <section className="meet-doctors-section">
      <div className="container">
        <h2 className="section-label">Meet Our Doctors</h2>

        <div className="director-spotlight">
          <div className="director-image-container">
            <img
              src={executiveDirector.image}
              alt={executiveDirector.name}
              className="main-director-img"
            />
          </div>

          <div className="director-info">
            <span className="role-tag">{executiveDirector.role}</span>
            <h3 className="director-name">{executiveDirector.name}</h3>
            <h4 className="director-legacy-title">{executiveDirector.title}</h4>
            <div className="divider"></div>

            <p className="description-intro">{executiveDirector.intro}</p>

            <ul className="highlights-list">
              {executiveDirector.highlights.map((item, index) => (
                <li key={index} className="highlight-item">
                  <strong>{item.label}:</strong> {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="doctors-grid">
          {doctorsList.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-image-wrapper">
                <img src={doctor.image} alt={doctor.name} className="dr-img" />
              </div>

              <div className="doctor-details">
                <h4>{doctor.name}</h4>
                <p className="specialty">{doctor.specialty}</p>
                <p className="doctor-bio-text">{doctor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoctors;
