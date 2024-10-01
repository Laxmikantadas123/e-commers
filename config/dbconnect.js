const mongoose=require("mongoose")

const connectDB=()=>{
   mongoose.connect(`${process.env.DB_NAME}/e-commerce`)
   .then(()=>{
    console.log(("Database is connected"));
   })
   .catch(()=>{
    console.log("Database is can't connected");
   })
}


module.exports=connectDB