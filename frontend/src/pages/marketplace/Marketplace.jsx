import { useEffect, useState } from "react";
import api from "../../services/api";

function Marketplace() {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAllCrops();
  }, []);

  const fetchAllCrops = async () => {
    try {
      const response = await api.get("/crops/all");

      setCrops(response.data.crops);
      setFilteredCrops(response.data.crops);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = crops.filter((crop) =>
      crop.cropName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCrops(filtered);
  };

  const sendRequest = async (cropId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/request/send",
        {
          cropId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to send request");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 sm:px-6 lg:px-10 py-8">

      <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-8">
        🌾 Agri Marketplace
      </h1>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 Search Crop..."
          value={search}
          onChange={handleSearch}
          className="w-full border-2 border-green-600 rounded-xl p-4 outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {filteredCrops.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg p-10 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-700">
            No Crops Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try searching with another crop name.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCrops.map((crop) => (

            <div
              key={crop._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              <img
                src={crop.image}
                alt={crop.cropName}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold text-green-700 mb-4">
                  🌾 {crop.cropName}
                </h2>

                <div className="space-y-2 text-gray-700">

                  <p>
                    👨 <span className="font-semibold">Farmer:</span>{" "}
                    {crop.farmer.name}
                  </p>

                  <p>
                    📍 <span className="font-semibold">Location:</span>{" "}
                    {crop.location}
                  </p>

                  <p>
                    🌾 <span className="font-semibold">Quantity:</span>{" "}
                    {crop.quantity} Kg
                  </p>

                  <p>
                    💰 <span className="font-semibold">Price:</span> ₹
                    {crop.price}
                  </p>

                  <p className="text-sm text-gray-500 break-all">
                    📧 {crop.farmer.email}
                  </p>

                </div>

                <button
                  onClick={() => sendRequest(crop._id)}
                  className="mt-6 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
                >
                  📞 Contact Farmer
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Marketplace;