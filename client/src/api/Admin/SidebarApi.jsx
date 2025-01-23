// src/api/SideBarApi.jsx
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

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
