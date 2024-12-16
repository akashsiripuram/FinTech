const API_BASE_URL = "http://localhost:3000";

// Inside authService.js
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong during registration");
  }
};

// Login API function with error handling
export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include", // Ensures cookies are sent
    });

    if (!response.ok) {
      throw new Error("Login failed: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong during login");
  }
};

// Logout API function with error handling
export const logout = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // Ensures cookies are cleared
    });

    if (!response.ok) {
      throw new Error("Logout failed: " + response.statusText);
    }
  } catch (error) {
    throw new Error(error.message || "Something went wrong during logout");
  }
};

// Fetch protected data with error handling
export const fetchProtectedData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/protected-route`, {
      method: "GET",
      credentials: "include", // Ensures cookies are included
    });

    if (!response.ok) {
      throw new Error("Failed to fetch protected data: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong while fetching data");
  }
};
// Refresh token function with error handling
export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
      method: "POST",
      credentials: "include", // Ensure cookies are included
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token: " + response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "Something went wrong while refreshing token");
  }
};
