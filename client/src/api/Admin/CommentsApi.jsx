import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Fetch all comments with pagination
export const fetchCommentsPageApi = async (accessToken, currentPage, perPage) => {
  try {
    const response = await axios.get(`${baseUrl}/api/comment/getAllComment`, {
      params: { page: currentPage, perPage },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    throw error;
  }
};

// Delete a specific comment by ID
export const deleteCommentByIdApi = async (accessToken, commentId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/comment/deleteComment/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    throw error;
  }
};
