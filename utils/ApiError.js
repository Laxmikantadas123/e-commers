const ApiError=(statusCode,message="Somthing went worng",errors)=>{
    const error=new Error(message)
    error.statusCode=statusCode
    error.error=errors
    return error
}

module.exports=ApiError