import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Add Comment
export const addComment = async (productId, content, accessToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/comment/addComment/${productId}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to add comment");
  }
};

// Get Comments for a Product
export const getComments = async (productId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/comment/getProductComment/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch comments");
  }
};

// Like Comment
export const likeComment = async (commentId, accessToken) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/comment/likeComment/${commentId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to like comment");
  }
};

// Edit Comment
export const editComment = async (commentId, content, accessToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/comment/editComment/${commentId}`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to edit comment");
  }
};

// Delete Comment
export const deleteComment = async (commentId, accessToken) => {
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
    throw new Error(error.message || "Failed to delete comment");
  }
};

// Function to get user data by userId
export const getUserById = async (userId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/users/getUserById/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
