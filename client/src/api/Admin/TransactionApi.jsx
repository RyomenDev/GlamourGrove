import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL; 

const fetchOrders = async (accessToken) => {
  try {
    const response = await axios.get(`${baseUrl}/api/order/getAllOrders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data; // Assuming the API response structure
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error; // Rethrow error to be handled in the calling component
  }
};

export default {
  fetchOrders,
};
