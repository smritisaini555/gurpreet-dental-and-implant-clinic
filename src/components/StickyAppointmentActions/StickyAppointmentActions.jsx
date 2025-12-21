import React from 'react';
import './StickyAppointmentActions.scss';
import { useNavigate } from 'react-router-dom';

const StickyAppointmentActions = () => {
    const navigate = useNavigate();

  const handleBookAppointment = () => {
     navigate('/appointments');
  };

  return (
    <div className="sticky-appointment-actions">
      <div className="action-item book-now" onClick={handleBookAppointment}>
        <span className="icon">📅</span>
        <span className="text">Book Appointment</span>
      </div>
      <div className="action-item discount-promo">
        <span className="icon">🏷️</span>
        <div className="text-group">
          <span className="main-text">GET 20% OFF on First Booking</span>
        </div>
      </div>
    </div>
  );
};

export default StickyAppointmentActions;