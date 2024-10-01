const User = require("../models/userModels.js");
const ApiError = require("../utils/ApiError.js");
const asyncHandler = require("../utils/asyncHandler.js");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// ------------------------------signUp---------------------

const signUp = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, mobile, password, role } = req.body;
    if (!firstname || !lastname || !email || !mobile || !password) {
      throw ApiError(400, "Required All field");
    }
    const existedUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existedUser) {
      throw ApiError(409, "User is already exist");
    }

    const user = new User({
      firstname,
      lastname,
      email,
      mobile,
      password,
      role,
    });
    user.save();
    res.status(201).json(user);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});
// -------------------------------------------------------login------------------------
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, mobile, password } = req.body;
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
    const token = JWT.sign({ id: user._id }, process.env.JWT_KEY);
    res.cookie("access_token", token, {
      httpOnly: true,
    });
    res.status(200).json(user);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});

// ------------------------------------profile-----------------------
const userProfile = asyncHandler(async (req, res) => {
  try {
    const _id = req.user.id;
    if (!_id) {
      throw ApiError(404, "User Not Authonticate");
    }
    const user = await User.findById({ _id });
    res.status(200).json(user);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});
// -----------------------update user-------------------
const updateUser = asyncHandler(async (req, res) => {
  try {
    const _id = req.user.id;
    const user = await User.findById({ _id });

    if (!user) {
      throw ApiError(404, "User Not Found");
    }
    const { firstname, lastname, email, mobile } = req.body;
    if (firstname) user.firstname = firstname;
    if (lastname) user.firstname = lastname;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    //  if(password) user.password=password
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});
// ---------------------------------------delete user-------------------
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.user.id);
    res.status(200).json(userDeleted);
  } catch (error) {
    throw ApiError(error.statusCode, error.message);
  }
});
module.exports = { signUp, loginUser, userProfile, updateUser, deleteUser };
