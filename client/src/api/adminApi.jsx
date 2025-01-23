import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

export const addProduct = async (formData, accessToken) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("price", formData.price);
  data.append("stock", formData.stock);
  data.append("category[name]", formData.categoryName);
  data.append("category[type]", formData.categoryType);

  const colorArray = formData.color.split(",").map((c) => c.trim());
  const sizeArray = formData.size.split(",").map((s) => s.trim());

  data.append("color", JSON.stringify(colorArray));
  data.append("size", JSON.stringify(sizeArray));
  data.append("productImage", formData.productImage);

  try {
    const response = await axios.post(
      `${baseUrl}/api/product/addProduct`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add product");
  }
};

export const fetchUsers = async (accessToken, perPage = 5) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/getUsers`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

export const fetchProducts = async (accessToken, perPage = 5) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAllProducts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
};

export const fetchCountProducts = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/countProduct`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching product counts:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch product counts"
    );
  }
};

export const fetchComments = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/api/comment/getAllComment`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch comments"
    );
  }
};

// Fetch all comments with pagination
export const fetchCommentsApi = async (accessToken, currentPage, perPage) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/comment/getAllComment`,
      {
        params: { page: currentPage, perPage },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.message);
    throw error;
  }
};

// Delete a specific comment by ID
export const deleteCommentApi = async (accessToken, commentId) => {
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