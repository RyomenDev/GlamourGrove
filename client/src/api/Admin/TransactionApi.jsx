import axios from "axios";
import conf from "../../conf/conf";

const baseUrl = conf.SERVER_API_URL;

export const fetchOrders = async (accessToken) => {
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

