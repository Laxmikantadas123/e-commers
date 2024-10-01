const User = require("../models/userModels.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const JWT = require("jsonwebtoken");
const bcrypt=require("bcrypt")

// ----------------------------------------------adminlogin------------------
const adminLogin = asyncHandler(async (req, res) => {
    try {
        const { email, mobile, password,role } = req.body;
        if (!(email || mobile) || !password) {
          throw ApiError(400, "Required all field");
        }
        const user = await User.findOne({
          $or: [{ email }, { mobile }],
        });
        if (!user) {
          throw ApiError(404, "User is not found");
        }
        const isCorrect = bcrypt.compare(password, user.password);
        if (!isCorrect) {
          throw ApiError(400, "Password in correct");
        }
        if(role!=="admin"){
            throw ApiError(401,"Not Authorised")
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_KEY);
        res.cookie("access_token", token, {
          httpOnly: true,
        });
        res.status(200).json(user);
    } catch (error) {
      throw ApiError(error.statusCode, error.message);
    }
  });





module.exports={adminLogin}