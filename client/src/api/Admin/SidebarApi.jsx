import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

export const signOutApi = async (accessToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    throw new Error("Sign-out failed: " + error.message);
  }
};
