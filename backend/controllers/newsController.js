import axios from "axios";

export const getNews = async (req, res) => {
  try {
    const category = req.query.category || "agriculture";

    const url = `https://gnews.io/api/v4/search?q=${category}&lang=en&country=in&max=12&apikey=${process.env.GNEWS_API_KEY}`;

    const response = await axios.get(url);

    const news = response.data.articles.map((item, index) => ({
      id: index + 1,
      title: item.title,
      description: item.description,
      image:
        item.image ||
        "https://via.placeholder.com/600x400?text=No+Image",
      source: item.source.name,
      date: new Date(item.publishedAt).toLocaleDateString(),
      url: item.url,
    }));

    res.json({
      success: true,
      news,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to Fetch News",
    });
  }
};