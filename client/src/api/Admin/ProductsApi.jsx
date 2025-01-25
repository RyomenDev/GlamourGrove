import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Fetch all products with pagination
export const fetchProductsPageApi = async (page, perPage = 9) => {
  try {
    const response = await axios.get(`${baseUrl}/api/product/getAllProducts`, {
      params: { page, perPage },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProductByIdApi = async (productId, accessToken) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/product/deleteProduct/${productId}`,
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
