import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    name: String,
    benefit: String,
    eligibility: String,
    description: String,
    category: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Scheme", schemeSchema);