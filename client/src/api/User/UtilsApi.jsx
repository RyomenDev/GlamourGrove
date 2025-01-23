import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Authenticate the user using Google OAuth.

export const googleOAuthApi = async (userDetails) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/google`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // Assumes the structure includes a `data` object with user and accessToken
  } catch (error) {
    console.error("Error in Google OAuth API:", error);
    throw error;
  }
};
