import { useEffect, useState } from "react";
import api from "../../services/api";

function MyCrops() {
    const [crops, setCrops] = useState([]);
    const [editingCrop, setEditingCrop] = useState(null);
    const [editData, setEditData] = useState({
  cropName: "",
  quantity: "",
  price: "",
  location: "",
});
    useEffect(() => {
        fetchCrops();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("token");

            await api.delete(`/crops/${id}`, {
                headers: {
                    Authorization: token,
                },
            });

            alert("Crop Deleted Successfully");

            fetchCrops(); // List Refresh
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (crop) => {
  setEditingCrop(crop);

  setEditData({
    cropName: crop.cropName,
    quantity: crop.quantity,
    price: crop.price,
    location: crop.location,
  });
};

    const fetchCrops = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get("/crops/my-crops", {
                headers: {
                    Authorization: token,
                },
            });

            setCrops(response.data.crops);
        } catch (error) {
            console.log(error);
        }
    };
    const updateCrop = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.put(
      `/crops/${editingCrop._id}`,
      editData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    alert(response.data.message);

    setEditingCrop(null);

    fetchCrops();

  } catch (error) {
    console.log(error);

    alert(error.response?.data?.message || "Update Failed");
  }
};

    return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 sm:px-6 lg:px-10 py-8">
    <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-10">
      🌾 My Crops
    </h1>

    {crops.length === 0 ? (
      <div className="flex justify-center items-center mt-20">
        <div className="bg-white shadow-lg rounded-xl p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-700">
            No Crops Added
          </h2>

          <p className="text-gray-500 mt-3">
            Add your first crop to start selling in the marketplace.
          </p>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {crops.map((crop) => (
          <div
            key={crop._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >
            {crop.image && (
              <img
                src={crop.image}
                alt={crop.cropName}
                className="w-full h-56 object-cover"
              />
            )}

            <div className="p-5">

              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {crop.cropName}
              </h2>

              <div className="space-y-2 text-gray-700">

                <p>
                  🌾 <span className="font-semibold">Quantity:</span>{" "}
                  {crop.quantity} Kg
                </p>

                <p>
                  💰 <span className="font-semibold">Price:</span> ₹
                  {crop.price}
                </p>

                <p>
                  📍 <span className="font-semibold">Location:</span>{" "}
                  {crop.location}
                </p>

              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                <button
                  onClick={() => handleEdit(crop)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(crop._id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                >
                  🗑 Delete
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    )}
    {editingCrop && (
  <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">

      <h2 className="text-2xl font-bold text-green-700 mb-5">
        Edit Crop
      </h2>

      <input
        className="w-full border p-3 rounded mb-3"
        value={editData.cropName}
        onChange={(e) =>
          setEditData({
            ...editData,
            cropName: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded mb-3"
        value={editData.quantity}
        onChange={(e) =>
          setEditData({
            ...editData,
            quantity: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded mb-3"
        value={editData.price}
        onChange={(e) =>
          setEditData({
            ...editData,
            price: e.target.value,
          })
        }
      />

      <input
        className="w-full border p-3 rounded mb-5"
        value={editData.location}
        onChange={(e) =>
          setEditData({
            ...editData,
            location: e.target.value,
          })
        }
      />

      <div className="flex gap-3">

        <button
          onClick={updateCrop}
          className="flex-1 bg-green-700 text-white py-3 rounded-lg"
        >
          Update
        </button>

        <button
          onClick={() => setEditingCrop(null)}
          className="flex-1 bg-gray-500 text-white py-3 rounded-lg"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}
  </div>
);
}
export default MyCrops;