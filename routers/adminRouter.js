const express=require("express")
const router=express.Router()
const auth=require("../middleware/authMiddleware.js")
const {adminLogin,adminProfile}=require("../controllers/adminController.js")
const admin=require("../middleware/adminMiddleware.js")
router.post("/login",adminLogin)




module.exports=router