import express from "express"
import {config} from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import userRoute from "./routes/userRouter.js"
import jobRoute from "./routes/jobRouter.js"
import applicationRoute from "./routes/applicationRouter.js"

const app=express();

config({path:"./config/config.env"})

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp/"
    })
)

app.use(cors({
    origin:process.env.FRONT_END_URL,
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))


//all routes

app.use("/api/v1/user",userRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)

dbConnection();


export default app;