import React from 'react';
import { executiveDirector, doctorsList } from '../../data/doctors';
import './MeetOurDoctors.scss';

const MeetOurDoctors = () => {
  return (
    <section className="meet-doctors-section">
      <div className="container">
        <h2 className="section-label">Meet Our Doctors</h2>

        {/* 1. Executive Director Section (Rectangular) */}
        <div className="director-spotlight">
          <div className="director-image">
            <img src={executiveDirector.image} alt={executiveDirector.name} />
          </div>
          <div className="director-info">
            <span className="role-tag">{executiveDirector.role}</span>
            <h3 className="director-name">{executiveDirector.name}</h3>
            <div className="divider"></div>
            <p className="description">{executiveDirector.description}</p>
          </div>
        </div>

        {/* 2. Doctors Grid (Circular UI from Reference) */}
        <div className="doctors-grid">
          {doctorsList.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-circle">
                <img src={doctor.image} alt={doctor.name} />
              </div>
              <div className="doctor-details">
                <h4>{doctor.name}</h4>
                <p>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetOurDoctors;