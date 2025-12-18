import React, { useEffect } from 'react';
import { useParams, Link, NavLink } from 'react-router-dom';
import { treatmentDetails } from '../../data/treatments';
import './TreatmentDetail.scss';

const TreatmentDetail = () => {
    const { treatmentSlug } = useParams();
    const data = treatmentDetails[treatmentSlug];

    const allTreatments = Object.keys(treatmentDetails);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (data) {
            document.title = `${data.name} | City Dental Clinic`;
        }
    }, [treatmentSlug, data]);

    if (!data) {
        return (
            <div className="error-page">
                <h2>Treatment Not Found</h2>
                <Link to="/" className="back-btn">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="treatment-detail-page">
            <header className="detail-hero">
                <div className="hero-content">
                    <h1>{data.name}</h1>
                    <nav className="breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="separator">›</span>
                        <span className="current-page">{data.name}</span>
                    </nav>
                </div>
            </header>

            <div className="main-layout-container">
                <aside className="treatment-sidebar">
                    <h3>Our Services</h3>
                    <ul>
                        {allTreatments.map((slug) => (
                            <li key={slug}>
                                <NavLink
                                    to={`/treatments/${slug}`}
                                    className={({ isActive }) => (isActive ? 'active-link' : '')}
                                >
                                    {treatmentDetails[slug].name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="detail-content">
                    <h2 className="display-title">{data.displayTitle}</h2>
                    <p className="description-text">{data.description}</p>

                    <div className="features-grid">
                        {data.features?.map((feature, index) => (
                            <div key={index} className="feature-card">
                                <span className="check-icon">L</span>
                                <div>
                                    <strong>{feature.label}</strong>
                                    <p>{feature.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="procedure-gallery">
                        {data.images?.map((imagePath, idx) => (
                            <div key={idx} className="gallery-item">
                                <img src={imagePath} alt={`${data.name} ${idx + 1}`} />
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TreatmentDetail;