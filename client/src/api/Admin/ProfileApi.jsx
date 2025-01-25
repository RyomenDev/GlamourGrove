import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Update profile information
export const updateProfileApi = async (formData, accessToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/users/update-account`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response ? error.response.data : error;
  }
};

// Update profile avatar
export const updateAvatarApi = async (file, accessToken) => {
  const formData = new FormData();
  formData.append("avatar", file);

  try {
    const response = await axios.patch(
      `${baseUrl}/api/users/avatar`,
      formData,
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating avatar:", error);
    throw error.response ? error.response.data : error;
  }
};
