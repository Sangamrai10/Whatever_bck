import {asyncHandler} from "../utils/asyncHandler.js"
import{apiResponse} from "../utils/apiResponse.js"
import {apiError} from "../utils/apiError.js"
import User from "../models/user.model.js"

const register=asyncHandler(async(req,res)=>{
  const {fullName,username, email, password}= req.body;
  
  //validate
  if([fullName, username, email, password].some((field)=>field?.trim()==="")){
    throw new apiError(400, "All field required!!")
  }
  
  //check if username or email already exists!!
  const user_exists=User.findOne({
    $or:[{
    username,
    email
    }]
  })
  
  if(user_exists){
    throw new apiError(400, "user with the username or email exists!!")
  }
  //create user object!!
  const user= await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password
  })
  
  //remove password and tokens from response
  const created_user= await User.findById(user._id).select("-password -refreshToken")
  
  //check if user created successfully or not!!
  if(!created_user){
    throw new apiError(400, "user register failed!!")
  }
  
  return res.status(200).json(
    new apiResponse(200, created_user, " user registered!!!")
    )
  
})

export {register}