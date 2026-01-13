import { StartupProject } from "./project-card";
import placeholderimg from "@/public/placeholder.png";

const projectNames = [
  "EcoTech Solutions",
  "FinHub",
  "MedConnect",
  "AgriSmart",
  "EduTech Innovations",
  "CleanEnergy",
  "SmartMobility",
  "FoodTech",
  "RetailTech",
  "AIServices",
  "HealthPlus",
  "GreenBuild",
  "AgroLink",
  "SafeNet",
  "TravelEase",
  "WaterWorks",
  "BioGen",
  "UrbanGrow",
  "SmartHome",
  "LogiTech",
];

const projectDescriptions = [
  "Sustainable technology solutions for environmental challenges",
  "Innovative financial technology platform for small businesses",
  "Connecting patients with healthcare providers through technology",
  "Smart agricultural solutions for improved crop yields",
  "Educational technology for accessible learning",
  "Renewable energy solutions for homes and businesses",
  "Smart transportation solutions for urban areas",
  "Innovative food technology for sustainable nutrition",
  "Technology solutions for modern retail experiences",
  "AI-powered services for business optimization",
  "Advanced healthcare analytics for better patient outcomes",
  "Eco-friendly construction materials and methods",
  "Connecting farmers to markets using digital platforms",
  "Cybersecurity solutions for small businesses",
  "Travel technology for seamless booking experiences",
  "Water purification and management systems",
  "Biotechnology for improved crop genetics",
  "Urban farming solutions for city dwellers",
  "Smart home automation and security",
  "Logistics optimization for supply chains",
];

const projectOwners = [
  "Abebe Kebede",
  "Tigist Haile",
  "Dawit Tadesse",
  "Hiwot Tesfaye",
  "Yonas Bekele",
  "Selamawit Fikru",
  "Mulugeta Alemu",
  "Rahel Gebre",
  "Samuel Tesema",
  "Lily Mekonnen",
];

const emails = [
  "ecotech",
  "finhub",
  "medconnect",
  "agrismart",
  "edutech",
  "healthplus",
  "greenbuild",
  "agrolink",
  "safenet",
  "travelease",
];

const banks = [
  "Commercial Bank of Ethiopia",
  "Dashen Bank",
  "Awash Bank",
  "Bank of Abyssinia",
  "Zemen Bank",
  "Nib International Bank",
  "Cooperative Bank of Oromia",
  "Berhan Bank",
  "Abay Bank",
  "Enat Bank",
];

const locations = [
  "Addis Ababa",
  "Dire Dawa",
  "Bahir Dar",
  "Hawassa",
  "Mekelle",
  "Adama",
  "Gondar",
  "Jimma",
  "Sodo",
  "Harar",
];

const typeOfSupports = [
  "Funding",
  "Mentorship",
  "Technical",
  "Partnership",
  "Investment",
  "Networking",
  "Training",
  "Consulting",
  "Incubation",
  "Marketing",
];

const mockProjects: StartupProject[] = Array.from({ length: 100 }, (_, i) => ({
  id: `project-${i + 1}`,
  projectName: projectNames[i % projectNames.length],
  projectDescription: projectDescriptions[i % projectDescriptions.length],
  projectOwner: projectOwners[i % projectOwners.length],
  email: `contact@${emails[i % emails.length]}.com`,
  phoneNumber: `+251 9${i % 10}${i % 10} ${i % 10}${i % 10}${i % 10} ${i % 10}${
    i % 10
  }${i % 10}${i % 10}`,
  postDuration: 30 + (i % 5) * 30,
  goalFund: 100000 + (i % 20) * 50000,
  bank: banks[i % banks.length],
  bankAccount: `100${i}${i}${i}${i}${i}${i}`,
  location: locations[i % locations.length],
  address: `${i + 1} Main Street, ${locations[i % locations.length]}`,
  companyLogo: placeholderimg,
  nationalId: `https://storage.example.com/id/id-${i + 1}.pdf`,
  videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  typeOfSupport: typeOfSupports[i % typeOfSupports.length],
  fundingProgress: Math.floor(Math.random() * 100),
  supporters: Math.floor(Math.random() * 100),
  category: ["Technology", "Non-Technology"][i % 2],
  backers: 10 + Math.floor(Math.random() * 190),
  daysLeft: 1 + Math.floor(Math.random() * 30),
}));

export type { StartupProject };
export { mockProjects };
