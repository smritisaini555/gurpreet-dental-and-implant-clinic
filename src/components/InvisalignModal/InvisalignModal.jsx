import React from 'react';
import './InvisalignModal.scss';
import InvisalignImg from '../../assests/images/invisalign-provider.jpg';

const InvisalignModal = ({ isAnimating, onClose }) => {
    return (
        <div className={`modal-overlay ${isAnimating ? 'fade-in' : 'fade-out'}`} onClick={onClose}>
            <div 
                className={`invisalign-modal ${isAnimating ? 'slide-down' : 'slide-up'}`} 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h3>Certified Invisalign Provider</h3>
                    <button className="close-x" onClick={onClose}>&times;</button>
                </div>
                <div className="modal-body">
                    <img src={InvisalignImg} alt="Certificate" />
                </div>
                <div className="modal-footer">
                    <button className="close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default InvisalignModal;