import cleaning1 from '../assests/images/treatmentImages/cleaning-1.png';
import cleaning2 from '../assests/images/treatmentImages/cleaning-2.png';
import toothCavity   from '../assests/images/treatmentImages/tooth-cavity-1.webp';
import painlessRootTreatment  from '../assests/images/treatmentImages/painless-root-treatment-1.webp';
import cbctOpg1  from '../assests/images/treatmentImages/cbct-opg-1.webp';
import cbctOpg2  from '../assests/images/treatmentImages/cbct-opg-2.webp';
import implants from '../assests/images/treatmentImages/implants.webp';
import laser1 from '../assests/images/treatmentImages/laser-1.webp';
import laser2 from '../assests/images/treatmentImages/laser-2.webp';
import extraction1 from '../assests/images/treatmentImages/extraction-1.webp';
import extraction2 from '../assests/images/treatmentImages/extraction-2.webp';
import kidsDentistry1 from '../assests/images/treatmentImages/kids-dentistry-1.jpg';
import kidsDentistry2 from '../assests/images/treatmentImages/kids-dentistry-2.jpg';
import veneers1 from '../assests/images/treatmentImages/veneers-1.webp';
import veneers2 from '../assests/images/treatmentImages/veneers-2.webp';
import bleaching1 from '../assests/images/treatmentImages/bleaching-1.webp';
import bleaching2 from '../assests/images/treatmentImages/bleaching-2.webp';
import dentures1 from '../assests/images/treatmentImages/dentures-1.webp';
import dentures2 from '../assests/images/treatmentImages/dentures-2.webp';
import gums1 from '../assests/images/treatmentImages/gum-1.webp';
import gums2 from '../assests/images/treatmentImages/gum-2.webp';
import bridges1 from '../assests/images/treatmentImages/bridges-1.webp';
import bridges2 from '../assests/images/treatmentImages/bridges-2.webp';
import braces1 from '../assests/images/treatmentImages/braces-1.webp';
import braces2 from '../assests/images/treatmentImages/braces-2.webp';
import invisibleBraces1 from '../assests/images/treatmentImages/invisible-braces-1.webp';
import invisibleBraces2 from '../assests/images/treatmentImages/invisible-braces-2.webp';
import sealants1 from '../assests/images/treatmentImages/sealants-1.webp';
import sealants2 from '../assests/images/treatmentImages/sealants-2.webp';
import fluoride1 from '../assests/images/treatmentImages/fluoride-1.webp';
import fluoride2 from '../assests/images/treatmentImages/fluoride-2.webp';
import toothJewellary from '../assests/images/treatmentImages/tooth-jewellary.webp';
// This structure maps the URL SLUG to the DISPLAY NAME
export const treatmentDetails = {
    "oral-examination-and-cleanings": {
        name: 'ORAL EXAMINATION AND CLEANINGS',
        displayTitle: 'Professional Dental Examination & Cleaning',
        description: 'A comprehensive dental exam is the foundation of a healthy smile. Regular checkups allow us to detect issues like decay, gum disease, and oral cancer in their earliest stages.',
        features: [
            { label: "X-Ray Analysis", text: "Essential for detecting decay, tumors, cysts, and bone loss." },
            { label: "Oral Cancer Screening", text: "Examination of the face, neck, lips, tongue, and throat for any signs of abnormalities." },
            { label: "Gum Disease Evaluation", text: "Checking the gums and bone around the teeth for any signs of periodontal disease." },
            { label: "Calculus Removal", text: "Professional removal of hardened plaque (tartar) that brushing cannot reach." }
        ],
        images: [cleaning1, cleaning2]
    },
    "tooth-cavity-treatment":  {
        name: 'TOOTH CAVITY TREATMENT',
        displayTitle: 'Modern Dental Fillings & Restorations',
        description: 'Cavities are treated by removing the decayed portion of the tooth and filling the area with a durable, tooth-colored composite material to restore function and prevent further damage.',
        features: [
            { label: "Tooth-Colored Fillings", text: "We use composite resins that match your natural tooth color perfectly." },
            { label: "Minimal Intervention", text: "Advanced techniques that preserve as much of your natural tooth structure as possible." },
            { label: "Mercury-Free", text: "Safe, biocompatible materials for long-lasting protection." }
        ],
        images: [toothCavity]
    },
    "painless-root-canal-treatment": {
        name: 'PAINLESS ROOT CANAL TREATMENT',
        displayTitle: 'Advanced Root Canal Therapy (RCT)',
        description: 'Root canal treatment is a highly successful procedure used to save a natural tooth that has become severely infected or decayed, preventing the need for extraction.',
        features: [
            { label: "Pain Relief", text: "Modern techniques ensure the procedure is as comfortable as a standard filling." },
            { label: "Infection Control", text: "Complete removal of bacteria and infected pulp from the root canal system." },
            { label: "Structural Support", text: "Sealing the canal and placing a crown to restore the tooth's strength." }
        ],
        images: [painlessRootTreatment]
    },
    "cbct-opg": {
        name: 'CBCT & OPG',
        displayTitle: 'Advanced 3D & 2D Dental Imaging',
        description: 'Our clinic is equipped with state-of-the-art diagnostic tools like CBCT (3D imaging) and OPG (panoramic X-rays) for precise treatment planning.',
        features: [
            { label: "CBCT (3D)", text: "Provides a detailed 3D view of bones, nerves, and tissues—critical for implants and complex surgeries." },
            { label: "OPG (2D)", text: "A panoramic view of the entire upper and lower jaw in a single image." },
            { label: "Low Radiation", text: "Digital sensors ensure minimal exposure while providing high-definition clarity." }
        ],
        images: [cbctOpg1, cbctOpg2]
    },
    "implants": {
        name: 'IMPLANTS',
        displayTitle: 'Permanent Tooth Replacement with Dental Implants',
        description: 'Dental implants are the gold standard for replacing missing teeth. They look, feel, and function exactly like natural teeth.',
        features: [
            { label: "Bone Preservation", text: "Implants stimulate the jawbone, preventing the facial sagging associated with tooth loss." },
            { label: "High Durability", text: "With proper care, dental implants can last a lifetime." },
            { label: "Natural Look", text: "Custom-made crowns that match the color and shape of your surrounding teeth." }
        ],
        images: [implants]
    },
    "lasers": {
        name: 'LASERS',
        displayTitle: 'Laser Dentistry: High Precision, Less Pain',
        description: 'Dental lasers offer a non-invasive way to treat gum disease, perform surgeries, and whiten teeth with significantly less bleeding and faster healing times.',
        features: [
            { label: "Pain-Free Procedures", text: "Many laser treatments require little to no anesthesia." },
            { label: "Faster Healing", text: "Lasers cauterize as they cut, reducing swelling and recovery time." },
            { label: "Precision", text: "Allows for highly targeted treatment without affecting surrounding healthy tissue." }
        ],
        images: [laser1, laser2]
    },
    "extraction-surgical-procedures": {
        name: 'EXTRACTION & SURGICAL PROCEDURES',
        displayTitle: 'Safe & Comfortable Tooth Extractions',
        description: 'Whether it is a simple extraction or a complex wisdom tooth surgery, our focus is on patient comfort and minimizing post-operative downtime.',
        features: [
            { label: "Wisdom Tooth Removal", text: "Specialized care for impacted or problematic third molars." },
            { label: "Atraumatic Techniques", text: "Designed to preserve the surrounding bone for future implant placement." },
            { label: "Sedation Options", text: "Available for patients who feel anxious about surgical procedures." }
        ],
        images: [extraction1, extraction2]
    },
    "kids-dentistry": {
        name: 'KIDS DENTISTRY',
        displayTitle: 'Pediatric Dental Care for Healthy Growing Smiles',
        description: 'We focus on making dental visits fun and stress-free for children, building a foundation for a lifetime of healthy oral habits.',
        features: [
            { label: "Preventive Care", text: "Fluoride treatments and dental sealants to protect young teeth from cavities." },
            { label: "Early Intervention", text: "Monitoring jaw development and tooth eruption to prevent future alignment issues." },
            { label: "Kid-Friendly Environment", text: "A gentle approach designed to ease dental anxiety in children." }
        ],
        images: [kidsDentistry1, kidsDentistry2]
    },
    "veneers": {
        name: 'VENEERS',
        displayTitle: 'Porcelain Veneers for a Perfect Smile',
        description: 'Veneers are thin, custom-made shells of porcelain designed to cover the front surface of teeth to improve your appearance instantly.',
        features: [
            { label: "Smile Transformation", text: "Corrects gaps, chips, stains, and slightly crooked teeth." },
            { label: "Stain Resistance", text: "Porcelain veneers are highly resistant to coffee, tea, and smoke stains." },
            { label: "Long Lasting", text: "Durable restorations that can last 10–15 years with proper care." }
        ],
        images: [veneers1, veneers2]
    },
    "bleaching": {
        name: 'BLEACHING',
        displayTitle: 'Professional Teeth Whitening',
        description: 'Brighten your smile by several shades in just one visit with our professional-grade bleaching systems.',
        features: [
            { label: "Instant Results", text: "Noticeably whiter teeth in about 60 minutes." },
            { label: "Safe & Controlled", text: "Supervised by professionals to minimize tooth sensitivity and protect gums." },
            { label: "Deep Stain Removal", text: "Effective against stains caused by aging, food, and lifestyle habits." }
        ],
        images: [bleaching1, bleaching2]
    },
    "dentures-partial-dentures": {
        name: 'DENTURES & PARTIAL DENTURES',
        displayTitle: 'Custom-Fit Complete & Partial Dentures',
        description: 'Modern dentures are more comfortable and natural-looking than ever. We provide both full and partial solutions to restore your ability to eat and speak clearly.',
        features: [
            { label: "Partial Dentures", text: "For patients who still have some healthy natural teeth remaining." },
            { label: "Flexible Dentures", text: "Lightweight, metal-free options that offer superior comfort and aesthetics." },
            { label: "Stability", text: "Precision fitting ensures minimal slipping or discomfort during daily use." }
        ],
        images: [dentures1, dentures2]
    },
    "gum-diseases": {
        name: 'GUM DISEASES',
        displayTitle: 'Periodontal Care & Gum Therapy',
        description: 'Gum health is essential for tooth stability. We treat everything from mild gingivitis to advanced periodontitis using deep cleaning and laser therapy.',
        features: [
            { label: "Scaling & Root Planing", text: "Deep cleaning beneath the gum line to remove bacterial buildup." },
            { label: "Gum Grafting", text: "Procedures to repair receding gums and protect tooth roots." },
            { label: "Maintenance", text: "Customized oral hygiene plans to prevent the recurrence of infection." }
        ],
        images: [gums1, gums2]
    },
    "crowns-bridges": {
        name: 'CROWNS & BRIDGES',
        displayTitle: 'Protective Dental Crowns & Fixed Bridges',
        description: 'Crowns protect damaged teeth, while bridges bridge the gap created by one or more missing teeth, anchored by healthy teeth on either side.',
        features: [
            { label: "Zirconia & PFM", text: "High-strength materials that mimic the translucency of natural enamel." },
            { label: "Restored Function", text: "Allows you to chew normally and prevents other teeth from shifting." },
            { label: "Custom Mapping", text: "Digitally designed to ensure a perfect bite and fit." }
        ],
        images: [bridges1, bridges2]
    },
    "braces": {
        name: 'BRACES',
        displayTitle: 'Orthodontic Braces for All Ages',
        description: 'Traditional metal or ceramic braces are highly effective at correcting complex alignment and bite issues for both children and adults.',
        features: [
            { label: "Ceramic Braces", text: "Clear or tooth-colored brackets for a less noticeable appearance." },
            { label: "Bite Correction", text: "Fixes overbites, underbites, and crossbites to improve jaw health." },
            { label: "Personalized Timing", text: "Regular adjustments to ensure your treatment stays on the fastest possible track." }
        ],
        images: [braces1, braces2]
    },
    "clear-aligners-invisalign": {
        name: 'CLEAR ALIGNERS INVISALIGN',
        displayTitle: 'Invisalign: The Invisible Way to Straighten Teeth',
        description: 'Invisalign uses a series of custom-made, clear plastic aligners to gently shift your teeth into position without the need for metal wires or brackets.',
        features: [
            { label: "Virtually Invisible", text: "Straighten your teeth discreetly without anyone noticing." },
            { label: "Removable", text: "Take them out to eat, brush, and floss normally." },
            { label: "Comfortable", text: "Smooth plastic aligners prevent the irritation common with metal braces." }
        ],
        images: [invisibleBraces1, invisibleBraces2]
    },
    "sealants": {
        name: 'SEALANTS',
        displayTitle: 'Preventive Dental Sealants',
        description: 'Sealants are thin, protective coatings applied to the chewing surfaces of the back teeth (molars) to prevent decay.',
        features: [
            { label: "Cavity Barrier", text: "Shields deep grooves where food particles and bacteria get trapped." },
            { label: "Quick Application", text: "Painless procedure that takes only a few minutes per tooth." },
            { label: "Child Protection", text: "Highly recommended for children as their permanent molars erupt." }
        ],
        images: [sealants1, sealants2]
    },
    "fluoride-treatment": {
        name: 'FLUORIDE TREATMENT',
        displayTitle: 'Topical Fluoride for Stronger Enamel',
        description: 'Professional fluoride treatment provides a higher concentration of fluoride than toothpaste, making teeth more resistant to acid attacks from plaque.',
        features: [
            { label: "Enamel Remineralization", text: "Helps repair early stages of tooth decay before they become cavities." },
            { label: "Sensitivity Relief", text: "Can significantly reduce tooth sensitivity to hot and cold." },
            { label: "Essential for Kids", text: "Critical for developing strong, cavity-resistant permanent teeth." }
        ],
        images: [fluoride1, fluoride2]
    },
    "tooth-jewellery": {
        name: 'TOOTH JEWELLERY',
        displayTitle: 'Add a Sparkle to Your Smile',
        description: 'Tooth jewellery involves attaching a small, sparkling crystal or gold stud to the surface of the tooth. It is a painless, temporary, and non-invasive cosmetic procedure.',
        features: [
            { label: "No Drilling", text: "The jewel is bonded to the surface without damaging the enamel." },
            { label: "Safe & Reversible", text: "Can be easily removed or replaced by a dentist at any time." },
            { label: "Quick Procedure", text: "Takes less than 15 minutes to give your smile a unique touch." }
        ],
        images: [toothJewellary]
    }
};

export const treatmentColumns = [
    ["oral-examination-and-cleanings", "tooth-cavity-treatment", "painless-root-canal-treatment", "cbct-opg", "implants", "lasers"],
    ["extraction-surgical-procedures", "kids-dentistry", "veneers", "bleaching", "dentures-partial-dentures", "gum-diseases"],
    ["crowns-bridges", "braces", "clear-aligners-invisalign", "sealants", "fluoride-treatment", "tooth-jewellery"]
];