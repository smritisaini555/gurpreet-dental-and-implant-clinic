import directorImage from '../assests/images/doctors/director.png';
import doctor1 from '../assests/images/doctors/doctor1.png';
import doctor2 from '../assests/images/doctors/doctor2.png';
import doctor3 from '../assests/images/doctors/doctor3.png';
import doctor4 from '../assests/images/doctors/doctor4.png';

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
    description: (
      <>
      Dr. Harmanjot Singh is a highly skilled dental surgeon specialized in Fellowship-grade Implantology and Advanced Micro-Endodontics. Trained under world-renowned mentors (<strong>Dr. Sameer Kaura</strong> and <strong>Dr. C.P. Chugh</strong>), he combines microscopic precision with aesthetic artistry to deliver Gold Standard care, ranging from complex tooth replacements to high-precision, painless root canal treatments.</>
    )
  },
  {
    name: "Dr. Richard Dickson",
    specialty: "Periodontist",
    image: doctor2,
    description: "Specializes in laser-assisted gum treatments and dental implant site preservation."
  },
  {
    name: "Dr. Walter Levitt",
    specialty: "Endodontist",
    image: doctor3,
    description: "Dedicated to painless root canal treatments using high-precision microscopic technology."
  },
  {
    name: "Dr. Giles Richardson",
    specialty: "Oral Surgeon",
    image: doctor4,
    description: "Skilled in complex wisdom tooth extractions and advanced reconstructive oral surgery."
  }
];