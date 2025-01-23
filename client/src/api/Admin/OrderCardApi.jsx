import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

// Fetch product details based on productId
const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/product/getProduct/${productId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

// Update order delivery status
const updateOrderStatus = async (orderId, accessToken) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/order/updateDelivery/${orderId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data; // Assuming response contains the updated order status
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

export default {
  fetchProductDetails,
  updateOrderStatus,
};
