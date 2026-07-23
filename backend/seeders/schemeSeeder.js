import mongoose from "mongoose";
import dotenv from "dotenv";
import Scheme from "../models/Scheme.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const schemes = [
  {
    name: "PM Kisan Samman Nidhi",
    category: "Financial",
    benefit: "₹6000 per year",
    eligibility: "Small & Marginal Farmers",
    description: "Income support provided directly to eligible farmers.",
    website: "https://pmkisan.gov.in",
  },
  {
    name: "PM Fasal Bima Yojana",
    category: "Insurance",
    benefit: "Crop Insurance",
    eligibility: "All Farmers",
    description: "Insurance against crop loss due to natural disasters.",
    website: "https://pmfby.gov.in",
  },
  {
    name: "Kisan Credit Card",
    category: "Loan",
    benefit: "Low Interest Agricultural Loan",
    eligibility: "All Farmers",
    description: "Provides easy credit for farming activities.",
    website: "https://www.myscheme.gov.in",
  },
  {
    name: "Soil Health Card",
    category: "Soil",
    benefit: "Free Soil Testing",
    eligibility: "All Farmers",
    description: "Provides information about soil nutrients.",
    website: "https://soilhealth.dac.gov.in",
  },
  {
    name: "e-NAM",
    category: "Market",
    benefit: "Online Crop Selling",
    eligibility: "Farmers & Traders",
    description: "National Agriculture Market platform.",
    website: "https://www.enam.gov.in",
  },
  {
    name: "PM Kusum",
    category: "Solar",
    benefit: "Solar Pump Subsidy",
    eligibility: "Farmers",
    description: "Financial assistance for installing solar pumps.",
    website: "https://mnre.gov.in",
  },
  {
    name: "Agriculture Infrastructure Fund",
    category: "Infrastructure",
    benefit: "Infrastructure Loan",
    eligibility: "Farmers & FPO",
    description: "Supports post-harvest infrastructure.",
    website: "https://agriinfra.dac.gov.in",
  },
  {
    name: "National Food Security Mission",
    category: "Food",
    benefit: "Increase Crop Production",
    eligibility: "Farmers",
    description: "Supports higher production of food grains.",
    website: "https://nfsm.gov.in",
  },
  {
    name: "Paramparagat Krishi Vikas Yojana",
    category: "Organic",
    benefit: "Organic Farming Support",
    eligibility: "Farmers",
    description: "Promotes organic farming in India.",
    website: "https://pgsindia-ncof.gov.in",
  },
  {
    name: "Rashtriya Krishi Vikas Yojana",
    category: "Development",
    benefit: "Agriculture Development",
    eligibility: "States & Farmers",
    description: "Supports agriculture and allied sectors.",
    website: "https://rkvy.nic.in",
  },
  {
    name: "Sub Mission on Agricultural Mechanization",
    category: "Machinery",
    benefit: "Farm Equipment Subsidy",
    eligibility: "Farmers",
    description: "Subsidy for agricultural machinery.",
    website: "https://agrimachinery.nic.in",
  },
  {
    name: "National Beekeeping Mission",
    category: "Beekeeping",
    benefit: "Honey Production Support",
    eligibility: "Beekeepers",
    description: "Promotes beekeeping and honey production.",
    website: "https://nbhm.gov.in",
  },
  {
    name: "National Livestock Mission",
    category: "Livestock",
    benefit: "Livestock Development",
    eligibility: "Livestock Farmers",
    description: "Improves livestock productivity.",
    website: "https://dahd.nic.in",
  },
  {
    name: "Blue Revolution",
    category: "Fisheries",
    benefit: "Fish Farming Support",
    eligibility: "Fish Farmers",
    description: "Promotes fisheries development.",
    website: "https://dof.gov.in",
  },
  {
    name: "Mission for Integrated Development of Horticulture",
    category: "Horticulture",
    benefit: "Fruit & Vegetable Support",
    eligibility: "Farmers",
    description: "Supports horticulture development.",
    website: "https://midh.gov.in",
  },
  {
    name: "Formation & Promotion of FPO",
    category: "FPO",
    benefit: "Farmer Producer Organization Support",
    eligibility: "Farmer Groups",
    description: "Encourages formation of FPOs.",
    website: "https://sfacindia.com",
  },
  {
    name: "PM PRANAM",
    category: "Fertilizer",
    benefit: "Balanced Fertilizer Use",
    eligibility: "Farmers",
    description: "Encourages sustainable fertilizer usage.",
    website: "https://fert.nic.in",
  },
  {
    name: "Micro Irrigation Fund",
    category: "Irrigation",
    benefit: "Drip & Sprinkler Support",
    eligibility: "Farmers",
    description: "Promotes efficient irrigation.",
    website: "https://pmksy.gov.in",
  },
  {
    name: "National Bamboo Mission",
    category: "Bamboo",
    benefit: "Bamboo Cultivation Support",
    eligibility: "Farmers",
    description: "Promotes bamboo cultivation.",
    website: "https://nbm.nic.in",
  },
  {
    name: "Dairy Entrepreneurship Development Scheme",
    category: "Dairy",
    benefit: "Dairy Farm Assistance",
    eligibility: "Dairy Farmers",
    description: "Supports dairy business development.",
    website: "https://nabard.org",
  }
];

await Scheme.deleteMany();

await Scheme.insertMany(schemes);

console.log("✅ 20 Government Schemes Inserted Successfully");

process.exit();