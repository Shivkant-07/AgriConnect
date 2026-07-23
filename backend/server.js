import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cropRoutes from "./routes/cropRoutes.js"; 
import mandiRoutes from "./routes/mandiRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import schemeRoutes from "./routes/schemeRoutes.js";
dotenv.config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/mandi", mandiRoutes);
app.use("/api/request", requestRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/schemes", schemeRoutes);

app.get("/", (req, res) => {
  res.send(" AgriConnect Backend Running...");
});
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend Connected Successfully 🚀",
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});