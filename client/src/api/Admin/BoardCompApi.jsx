import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

export const fetchUsersApi = async (accessToken, perPage = 5) => {
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

export const fetchProductsApi = async (accessToken, perPage = 5) => {
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

export const fetchProductCountsApi = async (accessToken) => {
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

export const fetchCommentsApi = async (accessToken) => {
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
