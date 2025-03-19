import jwtDecode from "jwt-decode";

const setTokens = (accessToken, refreshToken) => {
  if (accessToken) {
    const { exp: accessExp } = jwtDecode(accessToken); // Decode expiry time
    const accessExpiryTime = accessExp * 1000; // Convert to milliseconds
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("accessExpiry", accessExpiryTime.toString());
  }

  if (refreshToken) {
    const { exp: refreshExp } = jwtDecode(refreshToken); // Decode expiry time
    const refreshExpiryTime = refreshExp * 1000; // Convert to milliseconds
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("refreshExpiry", refreshExpiryTime.toString());
  }
};


const monitorTokenExpiry = () => {
  const accessExpiry = localStorage.getItem("accessExpiry");
  const refreshExpiry = localStorage.getItem("refreshExpiry");

  const currentTime = Date.now();

  // Check access token expiration
  if (accessExpiry && currentTime >= accessExpiry) {
    console.log("Access token expired. Attempting to refresh...");
    refreshAccessToken(); // Implement token refresh logic
  }

  // Check refresh token expiration
  if (refreshExpiry && currentTime >= refreshExpiry) {
    console.log("Refresh token expired. Logging out...");
    logoutUser(); // Implement logout logic
  }
};
