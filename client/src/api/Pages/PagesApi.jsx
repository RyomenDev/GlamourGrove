import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Fetch products
export const fetchProducts = async (searchQuery) => {
  try {
    const res = await axios.get(
      `${baseUrl}/api/product/getProducts?${searchQuery}`
    );
    return res.data; // Return the API response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw the error to handle it in the component
  }
};


// API call to log out the user
export const logoutUser = async (accessToken) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

