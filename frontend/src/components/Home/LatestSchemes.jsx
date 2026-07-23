import { Link } from "react-router-dom";

function LatestSchemes() {
  return (
    <section className="py-20 bg-white">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        🏛 Government Schemes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        {[
          "PM Kisan",
          "PM Fasal Bima",
          "Kisan Credit Card",
        ].map((scheme)=>(
          <div
            key={scheme}
            className="bg-green-50 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-green-700">
              {scheme}
            </h2>

            <p className="mt-3">
              Government scheme for farmers.
            </p>
          </div>
        ))}

      </div>

      <div className="text-center mt-10">

        <Link
          to="/schemes"
          className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
        >
          View All Schemes
        </Link>

      </div>

    </section>
  );
}

export default LatestSchemes;