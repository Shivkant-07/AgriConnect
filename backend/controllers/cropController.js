import Crop from "../models/Crop.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const addCrop = async (req, res) => {
  try {
    const { cropName, quantity, price, location } = req.body;

    let imageUrl = "";

    if (req.file) {
      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "AgriConnect",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    }

    const crop = await Crop.create({
      cropName,
      quantity,
      price,
      location,
      image: imageUrl,
      farmer: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Crop Added Successfully",
      crop,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMyCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user.id });

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop Not Found",
      });
    }

    // Security Check
    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedCrop = await Crop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Crop Updated Successfully",
      crop: updatedCrop,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop Not Found",
      });
    }

    // Security Check
    if (crop.farmer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Crop.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Crop Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmer", "name email");

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};