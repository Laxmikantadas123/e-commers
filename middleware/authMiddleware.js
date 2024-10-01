const JWT=require("jsonwebtoken")
const ApiError=require("../utils/ApiError")
const auth=async(req,res,next)=>{
    try {
        const token=req.cookies.access_token
        if(!token){
            throw ApiError(401,"You are not authentication")
        }
        JWT.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err){
                throw ApiError(403,"token is not valid")
            }
            req.user=user
            next()
        })
    } catch (error) {
        throw ApiError(error.statusCode,error.message)
    }
}
module.exports=auth