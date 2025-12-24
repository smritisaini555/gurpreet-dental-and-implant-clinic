import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPreview.scss';

// Import all images
import image0 from '../../assests/images/gallery/image0.jpeg';
import image1 from '../../assests/images/gallery/image1.jpeg';
import image2 from '../../assests/images/gallery/image2.jpeg';
import image3 from '../../assests/images/gallery/image3.jpeg';
import image4 from '../../assests/images/gallery/image4.jpeg';
import image5 from '../../assests/images/gallery/image5.jpeg';
import image6 from '../../assests/images/gallery/image6.jpeg';
import image7 from '../../assests/images/gallery/image7.jpeg';
import image8 from '../../assests/images/gallery/image8.jpeg';
import image9 from '../../assests/images/gallery/image9.jpeg';
import image10 from '../../assests/images/gallery/image10.jpeg'; 
import image11 from '../../assests/images/gallery/image11.jpeg';
import image12 from '../../assests/images/gallery/image12.jpeg';
import image13 from '../../assests/images/gallery/image13.jpeg';
import image14 from '../../assests/images/gallery/image14.jpeg';
import image15 from '../../assests/images/gallery/image15.jpeg';  
import image16 from '../../assests/images/gallery/image16.jpeg';
import image17 from '../../assests/images/gallery/image17.jpeg';
import image18 from '../../assests/images/gallery/image18.jpeg';
import image19 from '../../assests/images/gallery/image19.jpeg';
import image20 from '../../assests/images/gallery/image20.jpeg';
import image21 from '../../assests/images/gallery/image21.jpeg';
import image22 from '../../assests/images/gallery/image22.jpeg';
import image23 from '../../assests/images/gallery/image23.jpeg';
import image24 from '../../assests/images/gallery/image24.jpeg';
import image25 from '../../assests/images/gallery/image25.jpeg';
import image26 from '../../assests/images/gallery/image26.jpeg';
import image27 from '../../assests/images/gallery/image27.jpeg';
import image28 from '../../assests/images/gallery/image28.jpeg';
import image29 from '../../assests/images/gallery/image29.jpeg';
import image30 from '../../assests/images/gallery/image30.jpeg';
import image31 from '../../assests/images/gallery/image31.jpeg';
import image32 from '../../assests/images/gallery/image32.jpeg';
import image33 from '../../assests/images/gallery/image33.jpeg';
import image34 from '../../assests/images/gallery/image34.jpeg';
import image35 from '../../assests/images/gallery/image35.jpeg';
import image36 from '../../assests/images/gallery/image36.jpeg';
import image37 from '../../assests/images/gallery/image37.jpeg';
import image38 from '../../assests/images/gallery/image38.jpeg';
import image39 from '../../assests/images/gallery/image39.jpeg';
import image40 from '../../assests/images/gallery/image40.jpeg';
import image41 from '../../assests/images/gallery/image41.jpeg';

// Define the full list of images
const allImages = [
  { id: 0, src: image0, alt: 'Clinic Interior' },
  { id: 1, src: image1, alt: 'Sterilization Area' },
  { id: 2, src: image2, alt: 'Dental Chair' },
  { id: 3, src: image3, alt: 'Digital OPG' },
  { id: 4, src: image4, alt: 'Waiting Area' },
  { id: 5, src: image5, alt: 'Modern Equipment' },
  { id: 6, src: image6, alt: 'Reception Desk' },
  { id: 7, src: image7, alt: 'Consultation Room' },
  { id: 8, src: image8, alt: 'X-Ray Machine' },
  { id: 9, src: image9, alt: 'Hygiene Room' },
  { id: 10, src: image10, alt: 'Patient Care' },
  { id: 11, src: image11, alt: 'Dental Tools' },
  { id: 12, src: image12, alt: 'Clinic Exterior' },
  { id: 13, src: image13, alt: 'Staff Meeting' },
  { id: 14, src: image14, alt: 'Treatment Room' },
  { id: 15, src: image15, alt: 'Dental Lab' },
  { id: 16, src: image16, alt: 'Patient Consultation' },
  { id: 17, src: image17, alt: 'Oral Care Products' },
  { id: 18, src: image18, alt: 'Clinic Hallway' },
  { id: 19, src: image19, alt: 'Dental Procedure' },
  { id: 20, src: image20, alt: 'Clinic Staff' },  
  { id: 21, src: image21, alt: 'Patient Interaction' },
  { id: 22, src: image22, alt: 'Dental Imaging' },
  { id: 23, src: image23, alt: 'Clinic Technology' },
  { id: 24, src: image24, alt: 'Patient Comfort' },
  { id: 25, src: image25, alt: 'Dental Surgery' },
  { id: 26, src: image26, alt: 'Clinic Ambiance' },
  { id: 27, src: image27, alt: 'Oral Health Education' },
  { id: 28, src: image28, alt: 'Dental Hygiene' },
  { id: 29, src: image29, alt: 'Clinic Equipment' },
  { id: 30, src: image30, alt: 'Patient Care Area' },
  { id: 31, src: image31, alt: 'Dental Consultation' },
  { id: 32, src: image32, alt: 'Clinic Facilities' },
  { id: 33, src: image33, alt: 'Dental Treatment' },
  { id: 34, src: image34, alt: 'Clinic Environment' },
  { id: 35, src: image35, alt: 'Patient Services' },
  { id: 36, src: image36, alt: 'Dental Care' },
  { id: 37, src: image37, alt: 'Clinic Interior Design' },
  { id: 38, src: image38, alt: 'Dental Equipment' },
  { id: 39, src: image39, alt: 'Patient Experience' },
  { id: 40, src: image40, alt: 'Clinic Team' },
  { id: 41, src: image41, alt: 'Oral Health Care' },
];

const GalleryPreview = ({ isFullPage = false }) => {
  const navigate = useNavigate();

  const imagesToShow = isFullPage ? allImages : allImages.slice(0, 6);

  return (
    <section className={`gallery-preview-section ${isFullPage ? 'full-page' : 'preview'}`}>
      <div className="container">
        <h2 className="section-title">
          {isFullPage ? "In-Office Tour" : "Our Clinic Gallery"}
        </h2>
        <div className="image-grid">
          {imagesToShow.map((img) => (
            <div key={img.id} className="grid-item">
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
        
        {/* Only show the button if we are NOT on the full page */}
        {!isFullPage && (
          <div className="btn-container">
            <button 
              className="explore-btn" 
              onClick={() => navigate('/in-office-tour')}
            >
              Explore Gallery
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default GalleryPreview;