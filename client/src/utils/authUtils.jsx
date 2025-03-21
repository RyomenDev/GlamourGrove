import { useSelector } from "react-redux";

export const getHeaders = () => {
  // Try to get the token from Redux state first
  const { accessToken } = useSelector((state) => state.user);

  // Fallback to localStorage if Redux state doesn't have the token
  const token = accessToken || localStorage.getItem("access_token");

  if (!token) {
    console.warn("No access token found");
    return {}; // Return empty headers instead of throwing an error
  }

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};
