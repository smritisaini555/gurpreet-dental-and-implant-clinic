import React, { useState, useEffect, useCallback } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.scss';

const API_BASE_URL = 'https://gurpreet-dental-and-implant-clinic.onrender.com/api';

const DOCTOR_LIST = [
    { id: 'gurpreet', name: 'Dr. Gurpreet' },
    { id: 'harmanjot', name: 'Dr. Harmanjot' },
];

const generateTimeSlots = () => {
    const slots = [];
    let startTimeMinutes = 10 * 60;
    const endTimeMinutes = 18 * 60 + 30;
    const interval = 30;

    while (startTimeMinutes <= endTimeMinutes) {
        const hours = Math.floor(startTimeMinutes / 60) % 24;
        const minutes = startTimeMinutes % 60;

        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 === 0 ? 12 : hours % 12;
        const displayMinutes = minutes < 10 ? '0' + minutes : minutes;

        slots.push(`${displayHours}:${displayMinutes} ${period}`);

        startTimeMinutes += interval;
    }
    return slots;
};

const getDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatCardSubtitleDate = (date) => {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();
};

const AppointmentDetailsCard = ({ doctorName, selectedDate, selectedTimeSlot }) => {
    const formattedDate = formatCardSubtitleDate(selectedDate);
    const location = "GURPREET DENTAL & IMPLANT CENTRE";

    return (
        <div className="appointment-card-display">
            <div className="card-primary-info">
                <span className="card-time">{selectedTimeSlot}</span>
                <span className="separator">|</span>
                <span className="card-doctor-name">{doctorName}</span>
            </div>

            <p className="card-date-line">
                {formattedDate}
            </p>

            <p className="card-location-line">
                {location}
            </p>
        </div>
    );
};

const ConfirmationScreen = ({ confirmationData, onNewBooking }) => {
    const { doctorName, patientName, selectedTimeSlot, selectedDate, patientEmail } = confirmationData;

    return (
        <section className="confirmation-screen-container">
            <div className="confirmation-box">
                <div className="confirmation-icon">✅</div>
                <h1 className="confirmation-title">Appointment Confirmed!</h1>
                <p className="confirmation-message">
                    Hello {patientName}, your appointment has been successfully booked.
                </p>

                <AppointmentDetailsCard
                    doctorName={doctorName}
                    selectedDate={selectedDate}
                    selectedTimeSlot={selectedTimeSlot}
                />

                <div className="details-card-footer">
                    <p className="detail-item">Confirmation Sent To: {patientEmail}</p>
                </div>

                <button
                    className="new-booking-button"
                    onClick={onNewBooking}
                >
                    Book Another Appointment
                </button>
            </div>
        </section>
    );
};

const BookingPage = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(DOCTOR_LIST[0].id);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');

    const [isReadyToBook, setIsReadyToBook] = useState(false);
    const [currentBookedSlots, setCurrentBookedSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [bookingConfirmation, setBookingConfirmation] = useState(null);

    const isPatientInfoValid = patientName.trim() !== '' && patientEmail.includes('@');

    const fetchBookedSlots = useCallback(async (doctorId, date) => {
        setIsLoading(true);
        setSelectedTimeSlot(null);

        const dateKey = getDateKey(date);
        const url = `${API_BASE_URL}/doctors/${doctorId}/availability?date=${dateKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentBookedSlots(data.bookedSlots || []);
        } catch (error) {
            console.error("Error fetching slots:", error);
            setCurrentBookedSlots([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!bookingConfirmation) {
            fetchBookedSlots(selectedDoctor, selectedDate);
        }
    }, [selectedDoctor, selectedDate, fetchBookedSlots, bookingConfirmation]);

    useEffect(() => {
        setIsReadyToBook(!isLoading && selectedTimeSlot && isPatientInfoValid);
    }, [isLoading, selectedTimeSlot, isPatientInfoValid]);


    const allAvailableSlots = React.useMemo(() => generateTimeSlots(), []);

    const handleDoctorChange = (doctorId) => {
        setSelectedDoctor(doctorId);
        setSelectedTimeSlot(null);
    };

    const handleSlotClick = (slot) => {
        setSelectedTimeSlot(slot === selectedTimeSlot ? null : slot);
    };

    const showConfirmation = (doctorName, time, date, name, email) => {
        setBookingConfirmation({
            doctorName: doctorName,
            selectedTimeSlot: time,
            selectedDate: date,
            patientName: name,
            patientEmail: email
        });

        window.scrollTo(0, 0);

        setPatientName('');
        setPatientEmail('');
        setSelectedTimeSlot(null);
    };

    const startNewBooking = () => {
        setBookingConfirmation(null);
        fetchBookedSlots(selectedDoctor, selectedDate);
    };

    const handleFinalBooking = async () => {
        if (!isReadyToBook) return;

        setIsLoading(true);

        const currentDoctor = DOCTOR_LIST.find(d => d.id === selectedDoctor);
        const doctorName = currentDoctor?.name;

        const bookingData = {
            doctorId: selectedDoctor,
            date: getDateKey(selectedDate),
            time: selectedTimeSlot,
            patientInfo: {
                name: patientName.trim(),
                email: patientEmail.trim()
            }
        };

        try {
            const response = await fetch(`${API_BASE_URL}/appointments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (response.status === 201 && result.success) {

                showConfirmation(
                    doctorName,
                    selectedTimeSlot,
                    selectedDate,
                    patientName.trim(),
                    patientEmail.trim()
                );

            } else if (response.status === 409) {
                alert(`Booking Failed: ${result.message}`);
            } else {
                throw new Error(result.message || 'Booking failed due to a server error.');
            }

        } catch (error) {
            console.error("Booking failed:", error);
            alert(`Booking attempt failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    // Helper to disable past dates in the calendar
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date.setHours(0, 0, 0, 0) < today.getTime();
    };

    const tileDisabled = ({ date, view }) => {
        if (view === 'month' && isPastDate(date)) {
            return true;
        }
    };

    const currentDoctorName = DOCTOR_LIST.find(d => d.id === selectedDoctor)?.name;

    if (bookingConfirmation) {
        return <ConfirmationScreen
            confirmationData={bookingConfirmation}
            onNewBooking={startNewBooking}
        />;
    }

    return (
        <section className="booking-page-container">
            <div className="booking-header">
                <h1 className="booking-title">Book Your Appointment</h1>
                <p className="booking-subtitle">Select your preferred doctor and available time slot.</p>
            </div>

            <div className="doctor-selection-wrapper">
                <h2 className="step-title">1. Choose Your Dentist</h2>

                <div className="doctor-tab-list">
                    {DOCTOR_LIST.map((doctor) => (
                        <div
                            key={doctor.id}
                            className={`doctor-tab ${selectedDoctor === doctor.id ? 'active' : ''}`}
                            onClick={() => handleDoctorChange(doctor.id)}
                        >
                            {doctor.name}
                        </div>
                    ))}
                </div>
                <select
                    className="doctor-dropdown"
                    value={selectedDoctor}
                    onChange={(e) => handleDoctorChange(e.target.value)}
                >
                    {DOCTOR_LIST.map((doctor) => (
                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="scheduling-area">
                <h2 className="step-title">2. Select Date and Time</h2>
                <div className="calendar-header">
                    Showing availability for {currentDoctorName}
                </div>

                <div className="react-calendar-wrapper">
                    <CalendarComponent
                        onChange={setSelectedDate}
                        value={selectedDate}
                        minDate={new Date()}
                        className="react-calendar"
                        tileDisabled={tileDisabled}
                    />
                </div>

                <div className="time-slots-list">
                    <div className="slot-title">
                        {isLoading
                            ? `Loading slots for ${selectedDate.toDateString()}...`
                            : `Available Slots on ${selectedDate.toDateString()}:`
                        }
                    </div>

                    {isLoading && (
                        <p className="cta-prompt">Fetching latest availability...</p>
                    )}

                    {!isLoading && allAvailableSlots.map((slot) => {
                        const isBooked = currentBookedSlots.includes(slot);
                        const isActive = selectedTimeSlot === slot;

                        return (
                            <button
                                key={slot}
                                className={`slot-button ${isBooked ? 'booked' : ''} ${isActive ? 'active' : ''}`}
                                onClick={() => !isBooked && handleSlotClick(slot)}
                                disabled={isBooked}
                            >
                                {slot} {isBooked ? '(Booked)' : ''}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="patient-info-wrapper">
                <h2 className="step-title">3. Enter Your Information</h2>
                <div className="input-group">
                    <label htmlFor="patientName">Your Full Name</label>
                    <input
                        id="patientName"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="e.g., Jane Doe"
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="patientEmail">Your Email Address</label>
                    <input
                        id="patientEmail"
                        type="email"
                        value={patientEmail}
                        onChange={(e) => setPatientEmail(e.target.value)}
                        placeholder="e.g., janedoe@email.com"
                        required
                    />
                </div>
            </div>

            <div className="scheduling-area">
                <div className="booking-cta-wrapper">
                    <button
                        className="booking-cta-button"
                        onClick={handleFinalBooking}
                        disabled={!isReadyToBook || isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Confirm & Book Appointment'}
                    </button>
                    {!isReadyToBook && !isLoading && (
                        <p className="cta-prompt">
                            {selectedTimeSlot && !isPatientInfoValid
                                ? 'Please enter your name and a valid email.'
                                : 'Select a time slot and fill in your info to proceed.'
                            }
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BookingPage;