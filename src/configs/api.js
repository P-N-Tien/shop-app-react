import axios from "axios";

export const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${baseURL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Session expired, please login again.");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const getApi = (url, params = {}, config = {}) => {
  return apiClient.get(url, { params, ...config });
};

export const postApi = (url, data = {}, config = {}) => {
  return apiClient.post(url, data, config);
};

export const putApi = (url, data = {}, config = {}) => {
  return apiClient.put(url, data, config);
};

export const delApi = (url, config = {}) => {
  return apiClient.delete(url, config);
};

export default apiClient;
