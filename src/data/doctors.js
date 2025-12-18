import directorImage from '../assests/images/doctors/director.png';
import doctor1 from '../assests/images/doctors/doctor1.png';
import doctor2 from '../assests/images/doctors/doctor2.png';
import doctor3 from '../assests/images/doctors/doctor3.png';
import doctor4 from '../assests/images/doctors/doctor4.png';

export const executiveDirector = {
    name: "Dr. Joseph Smith",
    role: "Executive Director",
    image: directorImage, // Ensure this path is correct
    description: "Dr. Joseph Smith has over 20 years of experience in advanced dental care and implantology. As the Executive Director, he leads our clinic with a commitment to clinical excellence and patient-centered care, ensuring that every treatment plan is tailored to the unique needs of our patients."
};

export const doctorsList = [
  {
    name: "Dr. Alma Derricks",
    specialty: "Orthodontist",
    image: doctor1
  },
  {
    name: "Dr. Richard Dickson",
    specialty: "Periodontist",
    image: doctor2
  },
  {
    name: "Dr. Walter Levitt",
    specialty: "Endodontist",
    image: doctor3
  },
  {
    name: "Dr. Giles Richardson",
    specialty: "Oral Surgeon",
    image: doctor4
  }
];