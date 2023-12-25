import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../models/fileUpload.js";

const registerUser = asyncHandler(async (req, res) => {

  const { username, email, fullName, password } = req.body;

  Object.entries(req.body).forEach(([field, value]) => {
    if (req.body[`${field}`] === "") {
      throw new ApiError(400, `Please provide ${field} it is required`);
    }
  });

  const userExist = await User.findOne({
    $or: [{ email }, { username }],
  });

  console.log(userExist);

  if (userExist) {
    throw new ApiError(409, "User already exists with email or username");
  }

  console.log(req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const currentUser = await User.create({
    username: username.toLowerCase(),
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(currentUser._id).select(
    "-password -refreshToken "
  );

  if(!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user")
  }

  return response.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
  )
});

export { registerUser };
