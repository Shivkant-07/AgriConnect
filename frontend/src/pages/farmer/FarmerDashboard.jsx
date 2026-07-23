import { Link, useNavigate } from "react-router-dom";

function FarmerDashboard() {
  const navigate = useNavigate();
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-green-50">

      {/* Header */}
      <div className="bg-green-700 text-white flex justify-between items-center px-8 py-4">
        <h1 className="text-3xl font-bold">🌾 Farmer Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Welcome Section */}
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold text-green-700">
          Welcome Farmer 👨‍🌾
        </h2>

        <p className="text-gray-600 mt-3">
          Manage your crops, weather updates and market prices.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">

        <Link
          to="/add-crop"
          
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-green-700">
            ➕ Add Crop
          </h2>

          <p className="mt-3 text-gray-600">
            Add a new crop to your account.
          </p>
        </Link>

        <Link
          to="/my-crops"
           
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-blue-700">
            🌾 My Crops
          </h2>

          <p className="mt-3 text-gray-600">
            View, update and delete your crops.
          </p>
        </Link>

        <Link
          to="/weather"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-2xl transition"
        >
          <h2 className="text-2xl font-bold text-yellow-600">
            🌦 Weather
          </h2>

          <p className="mt-3 text-gray-600">
            Check today's weather updates.
          </p>
        </Link>

      </div>

    </div>
  );
}

export default FarmerDashboard;