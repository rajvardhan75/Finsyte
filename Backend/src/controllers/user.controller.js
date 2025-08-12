import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


const generateAccessAndRefreshToken = async (userId) => {
  try {
    console.log("✅ tokenGen:userId =", userId);
    console.log("🔑 has ACCESS_TOKEN_SECRET?", !!process.env.ACCESS_TOKEN_SECRET, "len:", process.env.ACCESS_TOKEN_SECRET?.length || 0);
    console.log("🔑 has REFRESH_TOKEN_SECRET?", !!process.env.REFRESH_TOKEN_SECRET, "len:", process.env.REFRESH_TOKEN_SECRET?.length || 0);
    console.log("⏳ ACCESS_TOKEN_EXPIRY =", process.env.ACCESS_TOKEN_EXPIRY);
    console.log("⏳ REFRESH_TOKEN_EXPIRY =", process.env.REFRESH_TOKEN_EXPIRY);

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("Invalid or missing userId for token generation");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("User not found while generating tokens");

    // Extra safety: throw if secrets are missing
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is missing");
    if (!process.env.REFRESH_TOKEN_SECRET) throw new Error("REFRESH_TOKEN_SECRET is missing");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("❌ Token Generation Error:", err.stack || err.message);
    throw new ApiError(500, "Internal server error while generating tokens");
  }
};


const registerUser= asyncHandler(async (req, res) => {
   

    const {fullname, username, email, password } = req.body;
    console.log("email:", email);
    console.log("fullname:", fullname);
    if([fullname==="", username==="", email==="", password===""].includes(true)){ {
        throw new ApiError(400,"All fields are required" );
    }
    }
    if(email.includes("@")===false){
        throw new ApiError(400,"Email is not valid" );
    } 

   const existedUser= await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409,"Username or email already exists" );
    }

  

    
   const user=await User.create({
        fullname,
        username: username.toLowerCase(),
        email,
        password,
       
    });
   const createdUser=await User.findById(user._id).select("-password -refreshToken");
   if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user" );
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
});


const loginUser = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    throw new ApiError(400, "Email/Username and password are required");
  }

  // ✅ log what we can *before* the DB call
  console.log("🔸 login attempt:", { identifier });

  const idLower = identifier.toLowerCase();
  const user = await User.findOne({
    $or: [{ email: idLower }, { username: idLower }],
  });

  // ✅ now it's safe to log `user?._id`
  console.log("🔍 found user:", user?._id || "none");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  // ⚠️ make sure env vars exist (ACCESS/REFRESH secrets or fallback)
  if (
    !(process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET) ||
    !(process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET)
  ) {
    console.error("❌ Missing JWT secrets");
    throw new ApiError(500, "Server misconfigured (JWT secrets missing)");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedinUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Local dev cookies: don't force `secure: true`
  const options = {
    httpOnly: true,
    secure: false, // <- change to true in production behind HTTPS
    sameSite: "lax",
  };

  console.log("✅ login success:", user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedinUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});



const logoutUser= asyncHandler(async (req, res) => {
 await User.findByIdAndUpdate(req.user._id,{
    $unset:{
        refreshToken: 1 //this will remove the refresh token from the user document
    }
 },{
    new: true
 }) 
 
 const options={
   
    httpOnly: true,
    secure: true
    
}
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, {},"User logged out successfully")
    )

})
const refreshAccessToken=asyncHandler(async (req,res)=>{
 const incomingRefreshToken  = req.cookies.refreshToken || req.body.refreshToken;

    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request" );
    }
    try{
   const decodedToken= jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user= await User.findById(decodedToken?._id).select("-password")
    if(!user){
        throw new ApiError(401,"Invalid refresh token" );
    }
    const isRefreshTokenValid= user?.refreshToken===incomingRefreshToken;
    if(!isRefreshTokenValid){
        throw new ApiError(401,"Refresh token is expired or used" );
    }
    const options={
   
        httpOnly: true,
        secure: true
        
    }
   const {accessToken,newRefreshToken}= await generateAccessAndRefreshToken(user._id);

    return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
        new ApiResponse(200,{accessToken,refreshToken:newRefreshToken},"Access token refreshed successfully")
    )
}
    catch(error){
        throw new ApiError(401,error?.message||"Invalid refresh token" );
    }
})

const changeCurrentPassword=asyncHandler(async (req,res)=>{
const {oldPassword, newPassword}=req.body;
const user=await User.findById(req.user?._id)
const isPasswordCorrect=await   user.isPasswordCorrect(oldPassword)
if(!isPasswordCorrect){
    throw new ApiError(400,"Invalid credentials" );}
    user.password=newPassword;
   await user.save({validateBeforeSave:false})
    return res.status(200).json(
        new ApiResponse(200,{},"Password changed successfully")
    )
})
const getCurrentUser=asyncHandler(async (req,res)=>{
    
    return res.status(200).json(
        new ApiResponse(200,req.user,"User fetched successfully")
    )
})

const updateUserAccountDetails=asyncHandler(async (req,res)=>{
const {fullname, email } = req.body;
if([fullname==="", email==""].includes(true)){ {
    throw new ApiError(400,"All fields are required" );
}
}
const user=User.findByIdAndUpdate(req.user._id,{
$set:{fullname,
  email:  email}
    
},{
    new: true}).select("-password")
return res.status(200).json(
    new ApiResponse(200,user,"User updated successfully")
)
})


       
export {registerUser,loginUser,logoutUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateUserAccountDetails};

