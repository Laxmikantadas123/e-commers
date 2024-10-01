const express=require("express")
const dotenv=require("dotenv")
const cors=require("cors")
const morgan=require("morgan")
const cookieParser=require("cookie-parser")
const connectDB=require("./config/dbconnect.js")
const authRouter=require("./routers/authRouter.js")
const adminRouter=require("./routers/adminRouter.js")

dotenv.config()
const port=process.env.PORT||4000
const app=express()
// ----------------------middleware------------------------
app.use(express.json())
app.use(cors())
app.use(morgan())
app.use(cookieParser())
// ----------------router-------------------------

app.use("/",authRouter)
app.use("/admin",adminRouter)




app.listen(port,()=>{
    console.log(`server is running in port ${port}`);
    connectDB()
})