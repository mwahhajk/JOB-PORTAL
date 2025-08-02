import { User } from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken"


export const isAuthorized=catchAsyncError(async (req,res,next)=>{

    const{token}=req.cookies;
    if(!token)
    {
        return next(new ErrorHandler("User Not Authorized",400))
    }
    const decoded=jwt.verify(token,process.env.JWT_Secret_key);
    req.user=await User.findById(decoded.id);
    if(!req.user)
    {
        return next(new ErrorHandler("User not found", 404));
    }
    next();

})