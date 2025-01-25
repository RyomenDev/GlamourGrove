import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Fetch products
export const fetchProducts = async (searchQuery) => {
  try {
    const res = await axios.get(`${baseUrl}/api/product/getProducts?${searchQuery}`);
    return res.data; // Return the API response
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Throw the error to handle it in the component
  }
};
