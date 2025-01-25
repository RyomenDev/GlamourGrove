import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Function to handle user logout
export const logoutUser = async (accessToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/logout`,
      {}, // No body needed for logout
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
