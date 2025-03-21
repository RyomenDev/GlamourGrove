import axios from "axios";
import conf from "../../conf/conf";

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
    // return response.data.products;
    // console.log( response.data);
    return response.data; // Assuming `data` contains the products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch products by category. This function is used in the Gallery component
export const fetchProducts = async (category) => {
  try {
    let url;
    if (category === "All") {
      url = `${baseUrl}/api/product/getAllProducts?categoryType=Men`; // Default to 'Men' for "All"
    } else {
      url = `${baseUrl}/api/product/getAllProducts?categoryName=${category}`;
    }

    const response = await axios.get(url);
    return response.data.products; // Assuming the products are in the `products` field
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Fetch all products with optional pagination.
export const fetchAllProductsByPage = async (page = 1) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAllProducts`, {
      params: { page }, // Pass the page number as a query parameter
    });
    return response.data.products; // Assuming products are returned in the 'products' field
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};
