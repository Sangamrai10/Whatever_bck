import mongoose,{Schema} from "mongoose"
const userSchema = new Schema({
  username:{
    unique: true,
    required: true,
    type: String,
    lowercase: true,
    trim:true,
    index: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type:String,
    required: true
  }
})

export const User= mongoose.modal("User", userSchema)