const ApiError = require("../utils/ApiError.js");
const User=require("../models/userModels.js")
const admin = async (req, res, next) => {
 try {
    const _id=req.user.id
    const user=await User.findById({_id})
    if(user.role!=="admin"){
        throw ApiError(401,"Only Admin can Access")
    }else{
        next()
    }
 } catch (error) {
    throw ApiError(error.statusCode,error.message)
 }
};

module.exports = admin;
