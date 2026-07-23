import { useEffect, useState } from "react";
import api from "../../services/api";

function News() {
    const categories = ["agriculture", "farming", "organic farming", "weather", "crop", "fertilizer",];
    const [news, setNews] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("agriculture");

    useEffect(() => {
        fetchNews(category);
    }, [category]);

    const fetchNews = async (selectedCategory) => {
        setLoading(true);

        try {
            const response = await api.get(
                `/news?category=${encodeURIComponent(selectedCategory)}`
            );

            setNews(response.data.news);
            setFilteredNews(response.data.news);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;

        setSearch(value);

        const filtered = news.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredNews(filtered);
    };

    if (loading) {
        return (
            <h1 className="text-center text-3xl mt-20 font-bold">
                Loading News...
            </h1>
        );
    }

    return (
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 sm:px-6 lg:px-10 py-8">

    <h1 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-8">
      📰 Agriculture News
    </h1>

    <div className="max-w-6xl mx-auto">

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">

        {categories.map((cat) => (

          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              category === cat
                ? "bg-green-700 text-white shadow-md"
                : "bg-white border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
            }`}
          >
            {cat}
          </button>

        ))}

      </div>

      {/* Search */}

      <div className="max-w-xl mx-auto mb-10">

        <input
          type="text"
          placeholder="🔍 Search Agriculture News..."
          value={search}
          onChange={handleSearch}
          className="w-full p-4 border-2 border-green-600 rounded-xl outline-none focus:ring-2 focus:ring-green-500"
        />

      </div>

      {filteredNews.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-700">
            No News Found
          </h2>

          <p className="text-gray-500 mt-3">
            Try another keyword or category.
          </p>
        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredNews.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            >

              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/600x400?text=Agriculture+News"
                }
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold text-green-700 line-clamp-2">
                  {item.title}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {item.description || "No description available."}
                </p>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500 mt-5">

                  <span>📰 {item.source}</span>

                  <span>📅 {item.date}</span>

                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6 text-center bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition"
                >
                  Read Full News →
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  </div>
);
}

export default News;