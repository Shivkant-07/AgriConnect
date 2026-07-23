import Scheme from "../models/Scheme.js";

export const getSchemes = async (req, res) => {
  try {
    const keyword = req.query.search || "";

    const schemes = await Scheme.find({
      name: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.json({
      success: true,
      schemes,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};