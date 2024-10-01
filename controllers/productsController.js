const Product = require("../models/productsModels.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const uploadOnCloudinary = require("../utils/cloudnary.js");
const createProduct = asyncHandler(async (req, res) => {
  try {
    //    const {title,description,price,category,quantity,images}=req.body
    const title = req.body;
    if (!title) {
      throw ApiError(400, "Please provid the title");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const newProduct = new Product();
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});

module.exports = { createProduct };
