import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import SignatureCanvas from 'react-signature-canvas';
import { Link } from 'react-router-dom';
import { medicineMaster } from '../../data/medicineMaster';
import Logo from '../../assests/icons/Logo.jpeg';
import './PrescriptionForm.scss';

const PrescriptionForm = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [patient, setPatient] = useState({ name: '', age: '', contact: '', address: '' });
    const [medicines, setMedicines] = useState([]);
    const [extraNote, setExtraNote] = useState(''); 
    const [patientChiefComplaints, setPatientChiefComplaints] = useState(''); 
    const [signatureData, setSignatureData] = useState(null);
    const [showPreview, setShowPreview] = useState(false); // New State for Toggle
    const sigCanvas = useRef(null);

    useEffect(() => {
        const canvas = sigCanvas.current?.getCanvas();
        if (canvas) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
            sigCanvas.current.clear(); 
        }
    }, []);

    const [treatments, setTreatments] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (credentials.username === 'admin' && credentials.password === 'doctor123') {
            setIsLoggedIn(true);
        } else { alert("Invalid Credentials"); }
    };

    const addTreatmentRow = () => setTreatments([...treatments, { teethNo: '', procedure: '' }]);

    const deleteTreatmentRow = (index) => {
        const updated = treatments.filter((_, i) => i !== index);
        setTreatments(updated);
    };

    const updateTreatment = (index, field, value) => {
        const updated = [...treatments];
        updated[index][field] = value;
        setTreatments(updated);
    };

    const handleAddMedicine = (selectedOption) => {
        setMedicines([...medicines, {
            name: selectedOption.value,
            strength: selectedOption.strength,
            salt: selectedOption.salt,
            morning: false,
            afternoon: false,
            night: false,
            meal: 'After Meal',
            duration: 5,
            unit: 'Tablet',
            instruction: ''
        }]);
    };

    const updateMedicine = (index, field, value) => {
        const updated = [...medicines];
        updated[index][field] = value;
        setMedicines(updated);
    };

    const deleteMedicine = (index) => {
        const updated = medicines.filter((_, i) => i !== index);
        setMedicines(updated);
    };

    const getFrequencyCode = (med) => {
        const count = [med.morning, med.afternoon, med.night].filter(Boolean).length;
        if (count === 1) return 'OD';
        if (count === 2) return 'BD';
        if (count === 3) return 'TDS';
        return '';
    };

    const formatOptionLabel = ({ label, strength, salt }) => (
        <div className="custom-option">
            <div className="med-name-row">
                <span className="med-name">{label}</span>
                <span className="med-strength">{strength}</span>
                {salt && <span className="med-salt">{`(${salt})`}</span>}
            </div>
        </div>
    );

    if (!isLoggedIn) {
        return (
            <div className="login-overlay">
                <div className="login-card">
                    <Link to="/" className="back-link">← Back to Website</Link>
                    <div className="login-branding">
                        <img src={Logo} alt="Clinic Logo" className="login-logo" />
                        <h1 className="login-clinic-name">GURPREET DENTAL AND IMPLANT CENTRE</h1>
                    </div>
                    <form onSubmit={handleLogin}>
                        <h2>Staff Login</h2>
                        <input type="text" placeholder="Username" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} required />
                        <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required />
                        <button type="submit" className="login-submit-btn">Login to Dashboard</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="prescription-app">
            <div className="controls no-print">
                <div className="panel-header">
                    <div className="header-content">
                        <Link to="/">
                            <img src={Logo} alt="Logo" className="panel-logo" />
                        </Link>
                        <div className="panel-title">
                            <h3>Doctor's Control Panel</h3>
                            <p>Gurpreet Dental & Implant Centre</p>
                        </div>
                    </div>
                    <div className="header-actions">
                        {/* Toggle Switch UI */}
                        <div className="toggle-container">
                            <span>Show E-Template</span>
                            <label className="switch">
                                <input 
                                    type="checkbox" 
                                    checked={showPreview} 
                                    onChange={() => setShowPreview(!showPreview)} 
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        <Link to="/" className="home-btn">Back to Website</Link>
                        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
                    </div>
                </div>

                <div className="input-group">
                    <input type="text" placeholder="Patient Name" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} disabled={!showPreview} />
                    <input type="text" placeholder="Age/Sex" value={patient.age} onChange={(e) => setPatient({ ...patient, age: e.target.value })} disabled={!showPreview} />
                    <input type="text" placeholder="Contact Number" value={patient.contact} onChange={(e) => setPatient({ ...patient, contact: e.target.value })} disabled={!showPreview} />
                    <input type="text" placeholder="Address" value={patient.address} onChange={(e) => setPatient({ ...patient, address: e.target.value })} disabled={!showPreview} />
                </div>

                 <div className="extra-note-area" >
                    <textarea 
                        placeholder="Chief Complaints..." 
                        value={patientChiefComplaints} 
                        onChange={(e) => setPatientChiefComplaints(e.target.value)}
                    />
                </div>

                <div className="medicine-selection-area">
                    <Select
                        options={medicineMaster.map(m => ({
                            value: m.name,
                            label: m.name,
                            strength: m.strength,
                            salt: m.salt
                        }))}
                        onChange={handleAddMedicine}
                        placeholder="Search & Add Medicine..."
                        formatOptionLabel={formatOptionLabel}
                        className="medicine-select-container"
                        classNamePrefix="react-select"
                    />

                    <div className="active-medicines-manager">
                        {medicines.map((med, i) => (
                            <div key={i} className="manager-row">
                                <div className="med-label">
                                    <strong>{i + 1}. {med.name}</strong>
                                    <span>{med.strength}</span>
                                </div>
                                <div className="row-actions">
                                    <div className="freq-checks">
                                        <label><input type="checkbox" checked={med.morning} onChange={(e) => updateMedicine(i, 'morning', e.target.checked)} /> M</label>
                                        <label><input type="checkbox" checked={med.afternoon} onChange={(e) => updateMedicine(i, 'afternoon', e.target.checked)} /> A</label>
                                        <label><input type="checkbox" checked={med.night} onChange={(e) => updateMedicine(i, 'night', e.target.checked)} /> N</label>
                                    </div>
                                    <select value={med.meal} onChange={(e) => updateMedicine(i, 'meal', e.target.value)}>
                                        <option value="After Meal">After Meal</option>
                                        <option value="Before Meal">Before Meal</option>
                                        <option value="Empty Stomach">Empty Stomach</option>
                                    </select>
                                     <div className="duration-input">
                                        <label>Days:</label>
                                        <input type="number"  value={med.duration} min="1" onChange={(e) => updateMedicine(i, 'duration', e.target.value)} />
                                    </div>
                                    <select className="unit-select" value={med.unit} onChange={(e) => updateMedicine(i, 'unit', e.target.value)}>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Capsules">Capsules</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Gumpaint">Gumpaint</option>
                                    </select>
                                    <input type="text" placeholder="Note" className="note-input-wrap" value={med.instruction} onChange={(e) => updateMedicine(i, 'instruction', e.target.value)} />
                                    <button className="delete-med-btn" onClick={() => deleteMedicine(i)}>×</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="extra-note-area" >
                    <textarea 
                        placeholder="Enter clinical findings or additional instructions..." 
                        value={extraNote} 
                        onChange={(e) => setExtraNote(e.target.value)}
                    />
                </div>

                <div className="signature-input-area">
                    <div className="sig-pad-wrapper">
                        <SignatureCanvas 
                            ref={sigCanvas} 
                            penColor="black" 
                            canvasProps={{ className: 'sigCanvas'}} 
                            onEnd={() => {
                                if (sigCanvas.current) {
                                    const canvas = sigCanvas.current.getCanvas();
                                    setSignatureData(canvas.toDataURL('image/png'));
                                }
                            }} 
                        />
                    </div>
                    <button className="clear-btn" onClick={() => { 
                        if (sigCanvas.current) {
                            sigCanvas.current.clear(); 
                            setSignatureData(null); 
                        }
                    }}>Clear Signature</button>
                </div>
                <button className="print-action-btn" onClick={() => window.print()}>Print Prescription</button>
            </div>

            {/* Conditional Rendering Logic */}
            {showPreview ? (
                <div className="prescription-paper">
                    <div className="watermark"><img src={Logo} alt="watermark" /></div>
                    
                    <header className="paper-header">
                        <div className="header-left">
                            <img src={Logo} alt="Logo" className="main-logo" />
                            <div className="clinic-title">
                                <h1>GURPREET</h1>
                                <h2>DENTAL & IMPLANT CENTRE</h2>
                                <p className="since">Since 1995</p>
                            </div>
                        </div>
                        <div className="header-right">
                            <p className="dr-name">GURPREET SINGH</p>
                            <p>Dr. HARMANJOT SINGH (BDS) Pb.</p>
                            <p>MACHHIWARA SAHIB (141115)</p>
                            <p>98763-24499, 96465-34694</p>
                            <p>Drgurpreetsingh1@gmail.com</p>
                        </div>
                    </header>

                    <div className="content-container">
                        <aside className="sidebar">
                            <section className="side-block">
                                <h3>FACILITIES</h3>
                                <ul>
                                    <li>Dental Implants</li>
                                    <li>Root Canal Treatment (RCT)</li>
                                    <li>Orthodontic Treatment</li>
                                    <li>Restoration / Filling</li>
                                    <li>Flexible / Partial Denture</li>
                                    <li>Crown & Bridges</li>
                                    <li>Teeth Whitening</li>    
                                    <li>Periodontal Treatment</li>
                                    <li>Pediatrics</li>
                                    <li>Laser Dentistry</li>
                                    <li>Oral Surgery</li>
                                </ul>
                            </section>
                            <section className="side-block">
                                <h3>Visiting Doctors</h3>
                                <ul>
                                    <li><h4> Dr. Amreen</h4><span>MDS (Endodontist)</span></li>
                                    <li><h4> Dr. Vishal Sharma</h4><span>MDS (Orthodontist)</span></li>
                                    <li><h4> Dr. Gagandeep Singh</h4><span>MDS (Endodontist)</span></li>
                                    <li><h4> Dr. Gaurav</h4><span>MDS (Oral Surgeon)</span></li>
                                </ul>
                            </section>
                            <div className="opg-seal">DENTAL OPG</div>
                            <h3>Full Mouth X-Ray</h3>
                        </aside>

                        <main className="rx-section">
                            <div className="patient-strip">
                                <div className="strip-row">
                                    <p>Name: <span className="val">{patient.name}</span></p>
                                    <p>Date: <span className="val">{new Date().toLocaleDateString()}</span></p>
                                </div>
                                <div className="strip-row">
                                    <p>Age/Sex: <span className="val">{patient.age}</span></p>
                                    <p>Contact: <span className="val">{patient.contact}</span></p>
                                    <p>Address: <span className="val">{patient.address}</span></p>
                                </div>
                            </div>

                            <div className="prescription-body-grid">
                                <div className="treatment-column">
                                    <div className="treatment-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width="30%">Teeth No</th>
                                                    <th width="50%">Treatment Done</th>
                                                    <th width="35px" className="no-print"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {treatments.map((tr, i) => (
                                                    <tr key={i}>
                                                        <td><input type="text" value={tr.teethNo} onChange={(e) => updateTreatment(i, 'teethNo', e.target.value)} placeholder="e.g. 16" /></td>
                                                        <td><input type="text" value={tr.procedure} onChange={(e) => updateTreatment(i, 'procedure', e.target.value)} placeholder="e.g. Extraction" /></td>
                                                        <td className="no-print">
                                                            <button className="delete-row-btn" onClick={() => deleteTreatmentRow(i)}>×</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button className="add-row-btn no-print" onClick={addTreatmentRow}>+ Add Row</button>
                                    </div>

                                    {extraNote && (
                                        <div className="extra-note-display">
                                            <strong>Clinical Notes:</strong>
                                            <p>{extraNote}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="medicine-column">
                                    <div className="rx-symbol">Rx</div>
                                    <div className="medicine-list">
                                        {medicines.map((med, i) => (
                                            <div key={i} className="med-row-advanced">
                                                <div className="med-info-main">
                                                    <strong className="brand-name">
                                                        {i + 1}) {med.unit} {med.name} {med.strength}
                                                    </strong>
                                                    {med.salt && <p className="med-salt-display">{med.salt}</p>}
                                                    <div className="med-timing-display">
                                                        <span className="duration-tag">({med.duration} Days)</span>
                                                        <span className="meal-tag">{med.meal}</span>
                                                        <span className="timing-code">
                                                            {med.morning ? '1' : '0'}-{med.afternoon ? '1' : '0'}-{med.night ? '1' : '0'}
                                                            {getFrequencyCode(med) && ` (${getFrequencyCode(med)})`}
                                                        </span>
                                                    </div>
                                                    {med.instruction && <p className="print-instruction">Note: {med.instruction}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="paper-footer">
                                <p className="allergy-warning">If you have any kind of allergy, please inform your doctor prior to treatment.</p>
                                <div className="signature-box">
                                    {signatureData && <img src={signatureData} alt="Sig" />}
                                    <div className="sig-line"></div>
                                    <p>Authorized Signature</p>
                                </div>
                            </div>
                        </main>
                    </div>
                    <footer className="footer-bar">NOT VALID FOR MEDICO LEGAL PURPOSE</footer>
                </div>
            ) : (
                <div className="only-medicines-preview">
                    {/* <header className="only-medicines-preview-header">header</header> */}
                    <header className="only-medicines-preview-header"></header>
                        <div className="only-medicines-preview-content">
                            {/* <aside className="only-medicines-preview-sidebar"> sidebar</aside> */}
                            <aside className="only-medicines-preview-sidebar"></aside>
                            <main className="only-medicines-preview-main">
                                {/* <div className="only-medicines-preview-patient-strip">patient info</div> */}
                                <div className="only-medicines-preview-patient-strip"></div>
                                {patientChiefComplaints && (
        <div className="chief-complaints-section">
            <p>
                {/* The 'i' flag makes the split case-insensitive */}
                {patientChiefComplaints.split(/(C\/C|O\/E|T\/T)/gi).map((part, index) => {
                    const upperPart = part.toUpperCase();
                    return (upperPart === "C/C" || upperPart === "O/E" || upperPart === "T/T") ? 
                        <strong key={index} className="medical-abbr">{part}</strong> : 
                        part;
            })}
        </p>
    </div>
)}
                            <div className="prescription-body-grid">
                                <div className="treatment-column">
                                  

                                    <div className="treatment-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th width="30%">Teeth No</th>
                                                    <th width="50%">Treatment Done</th>
                                                    <th width="35px" className="no-print"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {treatments.map((tr, i) => (
                                                    <tr key={i}>
                                                        <td><input type="text" value={tr.teethNo} onChange={(e) => updateTreatment(i, 'teethNo', e.target.value)} placeholder="e.g. 16" /></td>
                                                        <td><input type="text" value={tr.procedure} onChange={(e) => updateTreatment(i, 'procedure', e.target.value)} placeholder="e.g. Extraction" /></td>
                                                        <td className="no-print">
                                                            <button className="delete-row-btn" onClick={() => deleteTreatmentRow(i)}>×</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <button className="add-row-btn no-print" onClick={addTreatmentRow}>+ Add Row</button>
                                    </div>

                                    {extraNote && (
                                        <div className="extra-note-display">
                                            <strong>Clinical Notes:</strong>
                                            <p>{extraNote}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="medicine-column">
                                    <div className="rx-symbol">Rx</div>
                                    <div className="medicine-list">
                                        {medicines.map((med, i) => (
                                            <div key={i} className="med-row-advanced">
                                                <div className="med-info-main">
                                                    <strong className="brand-name">
                                                        {i + 1}) {med.unit} {med.name} {med.strength}
                                                    </strong>
                                                    {med.salt && <p className="med-salt-display">{med.salt}</p>}
                                                    <div className="med-timing-display">
                                                        <span className="duration-tag">({med.duration} Days)</span>
                                                        <span className="meal-tag">{med.meal}</span>
                                                        <span className="timing-code">
                                                            {med.morning ? '1' : '0'}-{med.afternoon ? '1' : '0'}-{med.night ? '1' : '0'}
                                                            {getFrequencyCode(med) && ` (${getFrequencyCode(med)})`}
                                                        </span>
                                                    </div>
                                                    {med.instruction && <p className="print-instruction">Note: {med.instruction}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                             <div className="paper-footer">
                                <p className="allergy-warning">If you have any kind of allergy, please inform your doctor prior to treatment.</p>
                                <div className="signature-box">
                                    {signatureData && <img src={signatureData} alt="Sig" />}
                                    <div className="sig-line"></div>
                                    <p>Authorized Signature</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PrescriptionForm;