import axios from "axios";

// Use environment variable for base URL
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Works on Vercel + Local
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Access Token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Token Refresh Automatically
axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If access token expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        // No refresh token → logout
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        // Refresh token API
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccess = response.data.access;

        // Save new access token
        localStorage.setItem("access_token", newAccess);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

