import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role:{
    type:String,
    default:'user'
  },
  resetToken:String,
  tokenExpiration:Date,
  documents:[
    {
      _id: false,
      name:String,
      reference:String,
    }
  ],
  last_connection:Date,
  status: Array,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  
});

const userModel = mongoose.model(userCollection, userSchema);

export  {userModel};