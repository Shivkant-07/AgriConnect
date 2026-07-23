import { useEffect, useState } from "react";
import api from "../../services/api";

function Schemes() {
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchemes("");
  }, []);

  const fetchSchemes = async (keyword) => {
    try {
      setLoading(true);

      const response = await api.get(
        `/schemes?search=${encodeURIComponent(keyword)}`
      );

      setSchemes(response.data.schemes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchSchemes(value);
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20 font-bold">
        Loading Schemes...
      </h1>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 sm:px-6 lg:px-10 py-8">

    <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-8">
      🏛 Government Schemes
    </h1>

    <div className="max-w-xl mx-auto mb-10">

      <input
        type="text"
        placeholder="🔍 Search Government Scheme..."
        value={search}
        onChange={handleSearch}
        className="w-full p-4 border-2 border-green-600 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
      />

    </div>

    {schemes.length === 0 ? (

      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700">
          No Scheme Found
        </h2>

        <p className="text-gray-500 mt-3">
          Try another search keyword.
        </p>
      </div>

    ) : (

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {schemes.map((scheme) => (

          <div
            key={scheme._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6 flex flex-col"
          >

            <h2 className="text-2xl font-bold text-green-700 mb-5">
              🌾 {scheme.name}
            </h2>

            <div className="space-y-3 text-gray-700 flex-grow">

              <p>
                <span className="font-semibold">📂 Category:</span><br />
                {scheme.category}
              </p>

              <p>
                <span className="font-semibold">💰 Benefit:</span><br />
                {scheme.benefit}
              </p>

              <p>
                <span className="font-semibold">👨 Eligibility:</span><br />
                {scheme.eligibility}
              </p>

              <p className="text-gray-600">
                {scheme.description}
              </p>

            </div>

            <a
              href={scheme.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
            >
              🌐 Official Website
            </a>

          </div>

        ))}

      </div>

    )}

  </div>
);
}

export default Schemes;