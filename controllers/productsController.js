const Product=require("../models/productsModels.js")
const ApiError = require("../utils/ApiError.js");
const asyncHandler=require("../utils/asyncHandler.js")
const uploadOnCloudinary=require("../utils/cloudnary.js")
const createProduct=asyncHandler(async(req,res)=>{
   try {
   const {title,description,price,category,quantity,images}=req.body
    if(!title){
        throw ApiError(400,"Please provid the title")
    }
    const newProduct =new Product({
    title,
    description,
    price,
    category,
    quantity,
    
    });
    await newProduct.save()
    res.status(201).json(newProduct);
   } catch (error) {
    throw ApiError(error.statusCode,error.message)
   }
})








module.exports={createProduct}