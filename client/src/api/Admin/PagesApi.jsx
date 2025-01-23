import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL; // Base URL for API requests

// Fetch product details by ID.
export const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/product/getProduct/${productId}`
    );
    return response.data; // Assumes the response contains product data
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Update product details by ID.
export const updateProductDetails = async (
  productId,
  productData,
  accessToken
) => {
  try {
    const formData = new FormData();

    // Append product data to FormData
    Object.keys(productData).forEach((key) => {
      if (Array.isArray(productData[key])) {
        formData.append(key, productData[key].join(", "));
      } else {
        formData.append(key, productData[key]);
      }
    });

    const response = await axios.patch(
      `${baseUrl}/api/product/updateProduct/${productId}`,
      formData,
      {
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      }
    );

    return response.data; // Assumes the response contains updated product data
  } catch (error) {
    console.error("Error updating product details:", error);
    throw error;
  }
};
