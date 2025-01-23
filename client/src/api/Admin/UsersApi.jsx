import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Fetch users based on pagination
export const fetchUsersByPage = async (accessToken, currentPage, perPage) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/getUsers`, {
      params: {
        page: currentPage,
        perPage: perPage,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Assuming response contains users and totalUsers
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Delete a user by userId
export const deleteUserByUserId = async (accessToken, userId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/users/deleteUser/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
