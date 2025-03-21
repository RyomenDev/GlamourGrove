import axios from "axios";
import conf from "../conf/conf.jsx";

const SERVER_API_URL = conf.SERVER_API_URL;
const API_URL = `${SERVER_API_URL}/retellai`;

export const registerCall = async (RETELL_AI_AGENT_ID, accessToken) => {
  try {
    // console.log({accessToken});

    const response = await axios.post(
      `${API_URL}/connect-retellai`,
      {
        agent_id: RETELL_AI_AGENT_ID,
      },
      {
        // headers,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Axios response data is automatically parsed
    return response.data;
  } catch (error) {
    console.log("Error in registerCall:", error.message);
    throw new Error(
      error?.message || error.response?.data?.message || "Not able to connect"
    );
  }
};
