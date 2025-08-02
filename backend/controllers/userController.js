import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userModel.js";
import {sendToken} from "../utils/jwtToken.js"

export const register=catchAsyncError(async (req,res,next )=>{

  console.log("hello");
  
    const { name, email, phone, password, role } = req.body;
    console.log(name);
    
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }

    const findUser=await User.findOne({email})
    if(findUser)
    {
       return next(new ErrorHandler("User Already Exist",400)) 
    }
    const user=await User.create({
        name,email,phone,password,role
    })
   sendToken(res,200,"User Created Successfully",user)
})




export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(res, 201, "User Logged In!",user);
  // return res.json("User logged in")
});

export const logout=catchAsyncError(async(req,res,next)=>{

  console.log("In Logout Route");
  
    res.status(201).cookie("token","",{
      httpOnly:true,
      expires:new Date(Date.now())
    }).json({msg:"logout successfully"})
})