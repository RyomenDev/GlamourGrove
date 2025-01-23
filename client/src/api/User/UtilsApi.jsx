import axios from "axios";
import conf from "../conf/conf";

const baseUrl = conf.SERVER_API_URL;

// Authenticate the user using Google OAuth.

export const googleOAuthApi = async (userDetails) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/users/google`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data; // Assumes the structure includes a `data` object with user and accessToken
  } catch (error) {
    console.error("Error in Google OAuth API:", error);
    throw error;
  }
};

// Create a Stripe checkout session.
export const createCheckoutSession = async (payload) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/stripe/create-checkout-session`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Assumes the response contains the `url`
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};