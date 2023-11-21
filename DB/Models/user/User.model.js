import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    min: [2, "max length is 2 character"],
    max: [30, "max length is 30 character"],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  profileImage: {
    type: Object,
    default: null,
  },
  subscription: { type: Boolean, default: false },
  followers: [
    {
      type: Types.ObjectId,
    },
  ],
  following: [{ type: Types.ObjectId }],
  roles: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  playsCount:{
    type:Number,
    default:0
  },
  emailConfirmation:{
    type:Boolean,
    default:false
  },
  status:{
    type:Boolean,
    default:false
  }
});
const User =  mongoose.model("User", userSchema);
export default User;