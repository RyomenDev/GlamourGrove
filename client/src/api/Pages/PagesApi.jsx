import axios from "axios";
import conf from "../../conf/conf";

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

// API call for logging in
export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/login`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Returns the response object
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// API call to fetch products by category
export const fetchProductsByCategory = async (categoryName, currentPage) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/product/getAllProducts`,
      {
        params: {
          categoryName,
          page: currentPage,
        },
      }
    );
    return response.data; // Return the fetched data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }
};

// Fetch product details by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getProduct/${productId}`);
    return response.data; // Assuming the data contains the product details
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};

// Fetch related products by category
export const fetchRelatedProducts = async (categoryName, perPage = 6) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAllProducts`, {
      params: { categoryName, perPage },
    });
    return response.data; // Assuming the data contains the related products
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch related products");
  }
};

// User Registration API
export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // Return API response
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to register user"
    );
  }
};