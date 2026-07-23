import { Link } from "react-router-dom";

function LatestNews() {
  return (
    <section className="bg-green-50 py-20">

      <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
        📰 Latest News
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">

        {[1,2,3].map((item)=>(
          <div
            key={item}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold">
              Agriculture News {item}
            </h3>

            <p className="mt-3 text-gray-600">
              Latest farming and agriculture updates...
            </p>
          </div>
        ))}

      </div>

      <div className="text-center mt-10">

        <Link
          to="/news"
          className="bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800"
        >
          View All News
        </Link>

      </div>

    </section>
  );
}

export default LatestNews;