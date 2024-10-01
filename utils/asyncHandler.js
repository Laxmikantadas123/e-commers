const asyncHandler=(fn)=>async (req,res,next)=>{
    try{
       await fn(req,res,next)
    }catch(error){
        console.log(error);
        
        res.status(error.statusCode).json({
            success:false,
            message:error.message
        })
    }
}

module.exports=asyncHandler