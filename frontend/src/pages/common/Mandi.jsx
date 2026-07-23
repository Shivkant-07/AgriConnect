import { useEffect, useState } from "react";
import { getMandiPrices } from "../../services/mandiApi";

function Mandi() {
  const [mandiData, setMandiData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMandiPrices();
  }, []);

  const fetchMandiPrices = async (commodity = "") => {
    setLoading(true);

    try {
      const data = await getMandiPrices(commodity);
      setMandiData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMandiPrices(search);
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">

      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        🌾 Live Mandi Prices
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mb-8 flex gap-3"
      >
        <input
          type="text"
          placeholder="Search Crop (Wheat, Rice...)"
          value={search}
          onChange={handleSearch}
          className="flex-1 border-2 border-green-600 rounded-lg p-3 outline-none"
        />

        <button
          className="bg-green-700 text-white px-6 rounded-lg hover:bg-green-800"
        >
          Search
        </button>
      </form>

      {loading ? (
        <h2 className="text-center text-2xl font-bold">
          Loading...
        </h2>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {mandiData.length > 0 ? (
            mandiData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-green-700 mb-3">
                  🌾 {item.commodity}
                </h2>

                <p><strong>📍 Market:</strong> {item.market}</p>

                <p><strong>🏙 State:</strong> {item.state}</p>

                <p><strong>💰 Modal Price:</strong> ₹ {item.modal_price}</p>

                <p><strong>⬇ Min:</strong> ₹ {item.min_price}</p>

                <p><strong>⬆ Max:</strong> ₹ {item.max_price}</p>

                <p><strong>📅 Date:</strong> {item.arrival_date}</p>
              </div>
            ))
          ) : (
            <h2 className="text-center text-red-600 text-2xl col-span-full">
              No Crop Found
            </h2>
          )}

        </div>
      )}
    </div>
  );
}

export default Mandi;