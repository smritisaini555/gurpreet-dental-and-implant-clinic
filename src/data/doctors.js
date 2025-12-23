import directorImage from '../assests/images/doctors/director.png';
import doctor1 from '../assests/images/doctors/doctor1.png';
import doctor2 from '../assests/images/doctors/doctor2.jpeg';
import doctor3 from '../assests/images/doctors/doctor3.jpeg';
import doctor4 from '../assests/images/doctors/doctor4.jpeg';
import doctor5 from '../assests/images/doctors/doctor5.webp';

export const executiveDirector = {
    name: "Mr. Gurpreet Singh",
    role: "Our Founder",
    title: "A Legacy of Digital Innovation Since 1995",
    image: directorImage, 
    intro: "At a time when advanced dental care was often restricted to major metro cities, Mr. Gurpreet Singh recognized a critical gap in his own community. He founded the Gurpreet Dental & Implant Centre with one mission: To bring world-class dentistry to Machhiwara Sahib.",
    highlights: [
        { label: "Pioneering Spirit", text: "Launched the town’s first advanced digital dental infrastructure in 1995." },
        { label: "Specialized Care", text: "Successfully integrated a team of world-renowned specialists to provide high-end implant and surgical solutions locally." },
        { label: "Award-Winning Excellence", text: "Honored by the Indian Dental Association (IDA) for his outstanding contribution to dental healthcare." },
        { label: "Community-First Approach", text: "Dedicated 30 years to ensuring that every citizen has access to precise and painless dental treatments." }
    ]
};

export const doctorsList = [
  {
    name: "Dr. Harmanjot Singh",
    specialty: "Orthodontist",
    image: doctor1,
    highlights: [
        { label: "Expertise", text: "Specialized in Fellowship-grade Implantology and Advanced Micro-Endodontics." },
        { label: "Mentorship", text: "Trained under world-renowned mentors Dr. Sameer Kaura and Dr. C.P. Chugh." },
        { label: "Precision", text: "Combines microscopic precision with aesthetic artistry for Gold Standard care." }
    ]
  },
  {
    name: "Dr. Amreen Kaur",
    specialty: "BDS, MDS (Endodontics & Conservative Dentistry) Root Canal Specialist & Restorative Surgeon",
    image: doctor2,
    highlights: [
        { label: "Single-Visit Root Canals", text: "Utilizing the latest technology for faster and more efficient treatments." },
        { label: "Saving Natural Teeth", text: "Expert in treating deep infections and fractured teeth that would otherwise require extraction." },
        { label: "Aesthetic Fillings", text: "Specialized in 'Conservative Dentistry' to restore the natural look and function of your teeth." },
    ]
  },
  {
    name: "Dr. Vishal Sharma",
    specialty: "Orthodontist",
    image: doctor3,
    highlights: [
        { label: "Surgery", text: "Highly skilled in complex wisdom tooth extractions and reconstructive surgery." },
        { label: "Trauma Care", text: "Expert in advanced maxillofacial reconstructive oral surgery." }
    ]
  },
  {
    name: "Dr. Gagandeep Singh",
    specialty: "MDS Endodontics | Specialist in Micro-Root Canals",
    image: doctor4,
    highlights: [
        { label: "Microscopic Precision", text: "Utilizing the Dental Operating Microscope for 100% accuracy in complex canal treatments." },
        { label: "Academic Excellence", text: "An alumnus of top-tier institutions, bringing the latest evidence-based techniques to Machhiwara Sahib." },
        { label: "Advanced Mentorship", text: "A recognized mentor who has trained numerous dentists, including our own Dr. Harmanjot Singh, in the field of Advanced Endodontics." },
    ]
  },
  {
    name: "Dr. Nikita",
    specialty: "Orthodontist",
    image: doctor5,
    highlights: [
        { label: "Surgery", text: "Highly skilled in complex wisdom tooth extractions and reconstructive surgery." },
        { label: "Trauma Care", text: "Expert in advanced maxillofacial reconstructive oral surgery." }
    ]
  }
];