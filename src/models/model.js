import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary
      required: true,
    },
    coverImage: {
      type: String, //cloudinary
    },
    watchHistory: [
      {
        type: Schema.Types.ObjecctId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password id required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre('save', async function(next) {
//     if(this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next()
// })

// userSchema.methods.isPasswordCorrect = async function(password) {
//     const result = await bcrypt.compare(password, this.password)
//     return result
// }

// userSchema.methods.generateAccessToken = function() {
//     const token = jwt.sign(
//         {
//             _id: this._id,
//             email: this.email,
//             username: this.username,
//             fullName: this.fullName
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_REFRESH
//         }
//     )
//     return token
// }

// userSchema.methods.generateRefreshToken = function() {
//     const token = jwt.sign(
//         {
//             _id: this._id,
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn: process.env.ACCESS_TOKEN_REFRESH,

//         }
//     )
//     return token
// }

const User = mongoose.model("User", userSchema);

export { User };
