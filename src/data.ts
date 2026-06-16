import sheetFixingImg from './assets/images/sheet_fixing_card_1781597969155.jpg';
import metalSheetsImg from './assets/images/metal_sheets_card_1781597984941.jpg';
import cementSheetsImg from './assets/images/cement_sheets_card_1781598001369.jpg';
import polycarbonateImg from './assets/images/polycarbonate_sheets_card_1781599351353.jpg';

import industrialShedImg from './assets/images/industrial_shed_1781598685021.jpg';
import factoryShedImg from './assets/images/factory_shed_1781598700545.jpg';
import mangaloreRoofImg from './assets/images/mangalore_roof_1781598715407.jpg';
import charcoalRoofImg from './assets/images/charcoal_roof_1781598729858.jpg';
import structuralRoofImg from './assets/images/structural_roof_1781598745785.jpg';

export interface LeadershipMember {
  name: string;
  role: string;
  description: string;
  iconType: 'shield' | 'briefcase';
}

export interface ServiceCardData {
  title: string;
  description: string;
  image: string;
  iconType: 'grid' | 'layers' | 'box' | 'sun';
  textColorClass?: string;
  bgColorClass?: string;
}

export interface ContactInfoItem {
  title: string;
  value: string;
  iconType: 'phone' | 'whatsapp' | 'map' | 'clock';
}

export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    name: "R. Venkatesan",
    role: "PROPRIETOR",
    description: "With decades of expertise in the roofing industry, Mr. Venkatesan leads Global Roofing with a vision for quality and reliability.",
    iconType: 'shield'
  },
  {
    name: "B. Nithish Kumar",
    role: "MANAGER",
    description: "Mr. Nithish handles project coordination and operations, ensuring every site meets our rigorous safety and quality standards.",
    iconType: 'briefcase'
  }
];

export const SERVICE_CARDS: ServiceCardData[] = [
  {
    title: "Sheet Fixing",
    description: "Expert installation of all types of roofing sheets with structural precision.",
    image: sheetFixingImg,
    iconType: 'grid',
    bgColorClass: 'bg-pastel-green'
  },
  {
    title: "Metal Sheets",
    description: "High-durability color-coated metal roofing sheets for industrial and residential use.",
    image: metalSheetsImg,
    iconType: 'layers',
    textColorClass: "text-[#1E508C]",
    bgColorClass: 'bg-pastel-orange'
  },
  {
    title: "Cement Sheets",
    description: "Traditional and heavy-duty cement roofing sheets for long-lasting performance.",
    image: cementSheetsImg,
    iconType: 'box',
    bgColorClass: 'bg-pastel-blue'
  },
  {
    title: "Polycarbonate Sheets",
    description: "Modern, translucent, and highly durable weather-resistant canopies and skylights.",
    image: polycarbonateImg,
    iconType: 'sun',
    textColorClass: "text-[#F37021]",
    bgColorClass: 'bg-pastel-yellow'
  }
];

export const CONTACT_INFO: ContactInfoItem[] = [
  {
    title: "CALL US NOW",
    value: "6381421900",
    iconType: 'phone'
  },
  {
    title: "WHATSAPP",
    value: "+91 6381421900",
    iconType: 'whatsapp'
  },
  {
    title: "VISIT OUR OFFICE",
    value: "Erode, Tamil Nadu, India",
    iconType: 'map'
  },
  {
    title: "WORKING HOURS",
    value: "Mon - Sat: 9 AM - 7 PM",
    iconType: 'clock'
  }
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'Metal' | 'Cement' | 'Polycarbonate' | 'All';
  location: string;
  image: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "p1",
    title: "Industrial Shed Fabrication Services",
    category: "Metal",
    location: "Erode Industrial Zone",
    image: industrialShedImg
  },
  {
    id: "p2",
    title: "Modular Factory Sheds Fabrication Services",
    category: "Metal",
    location: "Sipcot, Perundurai",
    image: factoryShedImg
  },
  {
    id: "p3",
    title: "Metal Roofing Mangalore Tile Cooling Shed Work",
    category: "Cement",
    location: "Erode Town Area",
    image: mangaloreRoofImg
  },
  {
    id: "p4",
    title: "Roofing Works (Dark Wave Ceramic Profile)",
    category: "Cement",
    location: "Residential Complex, Erode",
    image: charcoalRoofImg
  },
  {
    id: "p5",
    title: "Roof Structural Fabrication (Framework Built)",
    category: "Polycarbonate",
    location: "Gopi Goundampalayam",
    image: structuralRoofImg
  }
];

export interface FinishedProject {
  id: string;
  title: string;
  image: string;
  hasQuoteButton?: boolean;
}

export const FINISHED_PROJECTS: FinishedProject[] = [
  {
    id: "fp1",
    title: "Industrial Shed Fabrication Services",
    image: industrialShedImg
  },
  {
    id: "fp2",
    title: "Modular Factory Sheds Fabrication Services",
    image: factoryShedImg,
    hasQuoteButton: true
  },
  {
    id: "fp3",
    title: "Metal Roofing Mangalore Tile Cooling Shed Work",
    image: mangaloreRoofImg
  },
  {
    id: "fp4",
    title: "Roofing Works",
    image: charcoalRoofImg
  },
  {
    id: "fp5",
    title: "Roof Structural Fabrication",
    image: structuralRoofImg
  }
];
