import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobModel.js";

export const createJob=catchAsyncError(async(req,res,next)=>{

    const{role}=req.user;
    console.log(role);
    
    if(role==="Job Seeker")
    {
        return next (new ErrorHandler("You are not eligible for this job",400))
    }
    const{title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo}=req.body;
    if(!title || !description || !category || !country || !city || !location)
    {
        return next(new ErrorHandler("Please provide required fields",400))
    }
    if((!salaryFrom || !salaryTo)&&!fixedSalary)
    {
        return next(new ErrorHandler("Please provide fixed or range salary",400))
    }
     if(salaryFrom&&salaryTo&&fixedSalary)
    {
        return next(new ErrorHandler("Please provide salary either fixed or range salary",400))
    }
    const postedBy=req.user._id;
    const personName=req.user.name;
    console.log(postedBy,personName);
    // console.log("req.user : ",req.user);
    
    
    const createdJob=await Job.create({
        title,description,category,country,city,location,fixedSalary,salaryFrom,salaryTo,postedBy
    })
    return res.status(202).json({
        success:true,
        message:"Job created successfully",
        job:createdJob
    })

})