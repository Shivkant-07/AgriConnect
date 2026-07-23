import { useState } from "react";
import api from "../../services/api";

function AddCrop() {
  const [cropName, setCropName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("cropName", cropName);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("image", image);

      const response = await api.post("/crops/add", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      alert(response.data.message);

      setCropName("");
      setQuantity("");
      setPrice("");
      setLocation("");
      setImage(null);

    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-8">
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 sm:p-8"
    >
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-green-700 mb-8">
        🌾 Add New Crop
      </h1>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Crop Name
          </label>

          <input
            type="text"
            placeholder="Enter Crop Name"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Quantity (Kg)
          </label>

          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Price (₹)
          </label>

          <input
            type="number"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Location
          </label>

          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Crop Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-3"
            required
          />
        </div>

        {image && (
          <div className="flex justify-center">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-36 h-36 object-cover rounded-xl border shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-lg transition duration-300"
        >
          Add Crop
        </button>
      </div>
    </form>
  </div>
);
}
export default AddCrop;