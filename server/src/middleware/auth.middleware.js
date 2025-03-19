import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import conf from "../conf/conf.js";
import ms from "ms";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(401, "Unauthorized request");

    try {
      // Verify the access token
      const decodedToken = jwt.verify(token, conf.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decodedToken._id).select(
        "-password -refreshToken"
      );
      if (!req.user) throw new ApiError(401, "Invalid Access Token");
      return next(); // Proceed if valid
    } catch (error) {
      // If token is expired, try refresh token
      if (error.name !== "TokenExpiredError") {
        throw new ApiError(401, "Invalid access token");
      }

      console.log("Access token expired, trying refresh token...");
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken)
        throw new ApiError(401, "Session expired. Please log in again.");

      // Verify the refresh token
      let decodedRefreshToken;
      try {
        decodedRefreshToken = jwt.verify(
          refreshToken,
          conf.REFRESH_TOKEN_SECRET
        );
      } catch {
        throw new ApiError(401, "Invalid refresh token. Please log in again.");
      }

      // Fetch user from refresh token
      const user = await User.findById(decodedRefreshToken._id).select(
        "-password -refreshToken"
      );
      if (!user)
        throw new ApiError(401, "User not found. Please log in again.");

      // Generate and set new access token using model method
      const newAccessToken = user.generateAccessToken();
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: conf.NODE_ENV === "production",
        sameSite: "Strict",
        // maxAge: 15 * 60 * 1000, // 15 minutes
        maxAge: ms(conf.ACCESS_TOKEN_EXPIRY), // Converts "6h" to milliseconds
      });

      req.user = user;
      next(); // Proceed with the request
    }
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    throw new ApiError(401, error.message || "Unauthorized access");
  }
});

// import { User } from "../models/user.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import conf from "../conf/conf.js";

// export const verifyJWT = asyncHandler(async (req, res, next) => {
//   console.log("verifying");

//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     console.log({ token });

//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, conf.ACCESS_TOKEN_SECRET);
//     console.log({ decodedToken });

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.user = user;
//     console.log("going next");

//     // next()
//   } catch (error) {
//     console.log(error.message);

//     throw new ApiError(401, error?.message || "Invalid access token");
//   }
// });
