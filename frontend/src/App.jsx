import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/common/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotFound from "./pages/common/Notfound";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import AddCrop from "./pages/farmer/AddCrop";
import MyCrops from "./pages/farmer/MyCrops";
import Weather from "./pages/common/Weather";
import Mandi from "./pages/common/Mandi";
import Marketplace from "./pages/marketplace/Marketplace";
import MyRequests from "./pages/MyRequests/MyRequests";
import News from "./pages/News/News";
import Schemes from "./pages/Schemes/Schemes";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/add-crop" element={<AddCrop />} />

        <Route path="/my-crops" element={<MyCrops />} />

        <Route path="/weather" element={<Weather />} />

        <Route path="/mandi" element={<Mandi />} />

        <Route path="/marketplace" element={<Marketplace />} />

        <Route path="/my-requests" element={<MyRequests />} />

        <Route path="/news" element={<News />} />

        <Route path="/schemes" element={<Schemes />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;