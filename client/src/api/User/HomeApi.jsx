import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Function to fetch products by category
export const getProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/product/category/${category}`
    );
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (categoryType) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAllProducts`, {
      params: { categoryType },
    });
    return response.data; // Assuming `data` contains the products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
