import Request from "../models/Request.js";
import Crop from "../models/Crop.js";

export const sendRequest = async (req, res) => {
  try {
    const { cropId } = req.body;

    // Crop Find
    const crop = await Crop.findById(cropId);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop Not Found",
      });
    }

    // Farmer अपनी ही Crop पर Request नहीं भेज सकता
    if (crop.farmer.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot request your own crop",
      });
    }

    // Duplicate Request Check
    const alreadyRequested = await Request.findOne({
      buyer: req.user.id,
      crop: cropId,
    });

    if (alreadyRequested) {
      return res.status(400).json({
        success: false,
        message: "Request Already Sent",
      });
    }

    // Save Request
    const request = await Request.create({
      buyer: req.user.id,
      farmer: crop.farmer,
      crop: cropId,
    });

    res.status(201).json({
      success: true,
      message: "Request Sent Successfully",
      request,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFarmerRequests = async (req, res) => {
  try {
    const requests = await Request.find({
      farmer: req.user.id,
    })
      .populate("buyer", "name email")
      .populate("crop", "cropName price quantity image location");

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request Not Found",
      });
    }

    // Security Check
    if (request.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    request.status = status;

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request Updated Successfully",
      request,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};