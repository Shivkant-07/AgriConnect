import { useEffect, useState } from "react";
import api from "../../services/api";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/request/farmer", {
        headers: {
          Authorization: token,
        },
      });

      setRequests(response.data.requests);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.put(
        `/request/${id}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert(response.data.message);

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20 font-bold">
        Loading Requests...
      </h1>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 sm:px-6 lg:px-10 py-8">

    <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-10">
      📩 Buyer Requests
    </h1>

    {requests.length === 0 ? (

      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No Buyer Requests Yet
        </h2>

        <p className="text-gray-500 mt-3">
          Requests from buyers will appear here.
        </p>
      </div>

    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {requests.map((request) => (

          <div
            key={request._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
          >

            <img
              src={request.crop.image}
              alt={request.crop.cropName}
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="text-2xl font-bold text-green-700 mb-4">
                🌾 {request.crop.cropName}
              </h2>

              <div className="space-y-2 text-gray-700">

                <p>
                  👤 <span className="font-semibold">Buyer:</span>{" "}
                  {request.buyer.name}
                </p>

                <p className="break-all">
                  📧 <span className="font-semibold">Email:</span>{" "}
                  {request.buyer.email}
                </p>

                <p>
                  🌾 <span className="font-semibold">Quantity:</span>{" "}
                  {request.crop.quantity} Kg
                </p>

                <p>
                  💰 <span className="font-semibold">Price:</span> ₹
                  {request.crop.price}
                </p>

                <p>
                  📍 <span className="font-semibold">Location:</span>{" "}
                  {request.crop.location}
                </p>

              </div>

              <div className="mt-5">

                <span
                  className={`px-4 py-2 rounded-full text-white font-semibold ${
                    request.status === "Pending"
                      ? "bg-yellow-500"
                      : request.status === "Accepted"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {request.status}
                </span>

              </div>

              {request.status === "Pending" && (

                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  <button
                    onClick={() => updateStatus(request._id, "Accepted")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition"
                  >
                    ✅ Accept
                  </button>

                  <button
                    onClick={() => updateStatus(request._id, "Rejected")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg transition"
                  >
                    ❌ Reject
                  </button>

                </div>

              )}

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
);
}

export default MyRequests;