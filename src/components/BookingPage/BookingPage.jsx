import React, { useState, useEffect, useCallback, useMemo } from 'react';
import CalendarComponent from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './BookingPage.scss';

// Set the API_BASE_URL for local development (as you have done)
// For production, you must change this back to the Render URL or use environment variables.
const API_BASE_URL = 'https://gurpreet-dental-and-implant-clinic-beta.vercel.app/api';
// const API_BASE_URL = 'https://www.gurpreetdentalandimplantcentre.com/api';
// const API_BASE_URL = 'http://localhost:3001/api';

const DOCTOR_LIST = [
    { id: 'harmanjot', name: 'Dr. Harmanjot' },
];

const generateTimeSlots = () => {
    // ... (rest of function is unchanged)
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
    // ... (function is unchanged)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const formatCardSubtitleDate = (date) => {
    // ... (function is unchanged)
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();
};

const AppointmentDetailsCard = ({ doctorName, selectedDate, selectedTimeSlot }) => {
    // ... (component is unchanged)
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
    // ... (component is unchanged)
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

const LoadingOverlay = () => (
    <div className="loading-overlay">
        <div className="spinner"></div>
        <p>Processing Appointment...</p>
    </div>
);

const ErrorScreen = ({ errorMessage, onTryAgain }) => (
    <section className="confirmation-screen-container error-screen">
        <div className="confirmation-box error-box">
            <div className="confirmation-icon error-icon">❌</div>
            <h1 className="confirmation-title error-title">Booking Failed</h1>
            <p className="confirmation-message error-message">
                Error: {errorMessage}
            </p>
            <p className="error-instruction">
                Please check the details you entered and try again. If the issue persists, the slot may have just been taken.
            </p>
            <button
                className="new-booking-button"
                onClick={onTryAgain}
            >
                Go Back and Try Again
            </button>
        </div>
    </section>
);


const BookingPage = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(DOCTOR_LIST[0].id);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');

    const [isReadyToBook, setIsReadyToBook] = useState(false);
    const [currentBookedSlots, setCurrentBookedSlots] = useState([]);
    const [isSlotsLoading, setIsSlotsLoading] = useState(false); // Renamed for clarity

    const [bookingConfirmation, setBookingConfirmation] = useState(null);
    const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, loading, success, error
    const [submissionError, setSubmissionError] = useState('');

    const isPatientInfoValid = patientName.trim() !== '' && patientEmail.includes('@');

    const fetchBookedSlots = useCallback(async (doctorId, date) => {
        setIsSlotsLoading(true); // <-- Start loader
        setSelectedTimeSlot(null);

        const dateKey = getDateKey(date);
        const url = `${API_BASE_URL}/doctors/${doctorId}/availability?date=${dateKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                // If network response is not OK (e.g., 404, 500), throw error
                // The 500 error from Render will hit this path
                const errorBody = await response.json();
                throw new Error(errorBody.message || 'Failed to retrieve availability.');
            }
            const data = await response.json();
            setCurrentBookedSlots(data.bookedSlots || []);
        } catch (error) {
            console.error("Error fetching slots:", error);
            // Handle the fetch error visually for the user (optional)
            // setSubmissionError(error.message || 'Could not fetch slots.');
            setCurrentBookedSlots([]); // Clear slots on error
        } finally {
            setIsSlotsLoading(false); // <-- End loader
        }
    }, []);

    useEffect(() => {
        // Only fetch slots if not in a submission state
        if (submissionStatus === 'idle') {
            fetchBookedSlots(selectedDoctor, selectedDate);
        }
        // Dependency array: only re-run when doctor, date changes, or fetchBookedSlots is re-created.
    }, [selectedDoctor, selectedDate, fetchBookedSlots, submissionStatus]);

    useEffect(() => {
        // isSlotsLoading is now used here
        setIsReadyToBook(!isSlotsLoading && selectedTimeSlot && isPatientInfoValid);
    }, [isSlotsLoading, selectedTimeSlot, isPatientInfoValid]);


    const allAvailableSlots = useMemo(() => generateTimeSlots(), []); // Changed to useMemo

    const isPastSlot = useCallback((slotTime, date) => {
        // Check if the selected date is today
        const today = new Date();
        const selectedDateKey = getDateKey(date);
        const todayKey = getDateKey(today);

        if (selectedDateKey !== todayKey) {
            return false; // Only worry about past time slots for *today*
        }

        // 1. Parse the slot time (e.g., "10:30 AM") to a Date object
        const parts = slotTime.match(/(\d+):(\d+)\s(AM|PM)/);
        if (!parts) return false; // Should not happen with generateTimeSlots format

        let hours = parseInt(parts[1], 10);
        const minutes = parseInt(parts[2], 10);
        const period = parts[3];

        // Convert 12-hour clock time to 24-hour time
        if (period === 'PM' && hours !== 12) {
            hours += 12;
        } else if (period === 'AM' && hours === 12) {
            hours = 0; // Midnight case
        }

        // Create a Date object for the start of the slot on the selected day
        const slotDateTime = new Date(date);
        slotDateTime.setHours(hours, minutes, 0, 0);

        // 2. Compare with the current time (now)
        const now = new Date();

        // Check if the slot time has already passed
        return slotDateTime.getTime() < now.getTime();

    }, []); 

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
        setSubmissionStatus('success');

        window.scrollTo(0, 0);

        setPatientName('');
        setPatientEmail('');
        setSelectedTimeSlot(null);
    };

    const startNewBooking = () => {
        setBookingConfirmation(null);
        setSubmissionStatus('idle');
        setSubmissionError('');
        // This will trigger the useEffect to fetch slots again
    };

    const handleFinalBooking = async () => {
        if (!isReadyToBook) return;

        setSubmissionStatus('loading');
        setSubmissionError('');

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
                setSubmissionError(`The selected time slot (${selectedTimeSlot}) was just booked. Please select another slot.`);
                setSubmissionStatus('error');
            } else {
                throw new Error(result.message || 'Booking failed due to a server error.');
            }

        } catch (error) {
            console.error("Booking failed:", error);
            setSubmissionError(error.message || 'The booking attempt failed. Please check your internet connection.');
            setSubmissionStatus('error');
        } finally {
            // We manage the final state via submissionStatus
        }
    };

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

    if (submissionStatus === 'loading') {
        return <LoadingOverlay />;
    }

    if (submissionStatus === 'success' && bookingConfirmation) {
        return <ConfirmationScreen
            confirmationData={bookingConfirmation}
            onNewBooking={startNewBooking}
        />;
    }

    if (submissionStatus === 'error') {
        return <ErrorScreen
            errorMessage={submissionError}
            onTryAgain={startNewBooking}
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
                        {isSlotsLoading // <-- Use the new state here
                            ? `Loading slots for ${selectedDate.toDateString()}...`
                            : `Available Slots on ${selectedDate.toDateString()}:`
                        }
                    </div>

                    {isSlotsLoading && ( // <-- Use the new state here
                        <p className="cta-prompt">Fetching latest availability...</p>
                    )}
                    
                    {/* Added a spinner/loading indicator for fetching slots */}
                    {isSlotsLoading && (
                        <div className="slot-loading-spinner-wrapper">
                            <div className="spinner small-spinner"></div>
                        </div>
                    )}


                    {!isSlotsLoading && allAvailableSlots.map((slot) => { // <-- Use the new state here
                        const isBooked = currentBookedSlots.includes(slot);
                        const isSlotPast = isPastSlot(slot, selectedDate); 
                        const isDisabled = isBooked || isSlotPast; // Combine booked and past checks
                        const isActive = selectedTimeSlot === slot;

                        return (
                            <button
                                key={slot}
                                className={`slot-button ${isBooked ? 'booked' : ''} ${isActive ? 'active' : ''}`}
                                onClick={() => !isDisabled && handleSlotClick(slot)}
                                disabled={isDisabled} 
                            >
                                {slot} {isBooked ? '(Booked)' : isSlotPast ? '(Passed)' : ''}
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
                        disabled={!isReadyToBook || submissionStatus === 'loading'}
                    >
                        {submissionStatus === 'loading' ? 'Processing...' : 'Confirm & Book Appointment'}
                    </button>
                    {!isReadyToBook && submissionStatus !== 'loading' && (
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