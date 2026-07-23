import { Link } from "react-router-dom";

function LatestMarketplace() {
  return (
    <section className="py-20 bg-white">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        🌾 Marketplace
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        <div className="bg-green-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold">🌾 Wheat</h3>
          <p className="mt-2">Premium Quality Wheat</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold">🌱 Soybean</h3>
          <p className="mt-2">Fresh Soybean Available</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-2xl font-bold">🌾 Rice</h3>
          <p className="mt-2">High Quality Rice</p>
        </div>

      </div>

      <div className="text-center mt-10">

        <Link
          to="/marketplace"
          className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
        >
          View Marketplace
        </Link>

      </div>

    </section>
  );
}

export default LatestMarketplace;