import axios from "axios";

export const getMandiPrices = async (req, res) => {
  try {
    const API_KEY = process.env.MANDI_API_KEY=`579b464db66ec23bdd0000017b2e92feb2f6431d7a8b3668026c5dbe`;

    const url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${API_KEY}&format=json&limit=1000`;

    const response = await axios.get(url);

    response.data.records.forEach((item) => {
  console.log(item.commodity);
});

    let records = response.data.records;

    // Query Parameters
    const commodity = req.query.commodity?.toLowerCase().trim() || "";
    const state = req.query.state?.toLowerCase().trim() || "";
    const market = req.query.market?.toLowerCase().trim() || "";

    // Commodity Search
    if (commodity) {
      records = records.filter((item) => {
        const crop = item.commodity.toLowerCase();

        return (
          crop.includes(commodity) ||

          // Rice
          (commodity === "rice" && crop.includes("paddy")) ||

          // Soyabean
          (commodity === "soy" && crop.includes("soy")) ||
          (commodity === "soyabean" && crop.includes("soy")) ||

          // Wheat
          (commodity === "wheat" && crop.includes("wheat")) ||

          // Maize
          (commodity === "maize" && crop.includes("maize")) ||

          // Corn
          (commodity === "corn" && crop.includes("maize")) ||

          // Onion
          (commodity === "onion" && crop.includes("onion")) ||

          // Potato
          (commodity === "potato" && crop.includes("potato")) ||

          // Tomato
          (commodity === "tomato" && crop.includes("tomato"))
        );
      });
    }

    // State Filter
    if (state) {
      records = records.filter((item) =>
        item.state.toLowerCase().includes(state)
      );
    }

    // Market Filter
    if (market) {
      records = records.filter((item) =>
        item.market.toLowerCase().includes(market)
      );
    }

    res.status(200).json({
      success: true,
      total: records.length,
      data: records,
    });

  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "Failed to Fetch Mandi Prices",
    });
  }
};