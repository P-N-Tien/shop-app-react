import apiClient from "@/configs/api";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload) => apiClient.post(`/api/v1/auth/login`, payload),
    onSuccess: () => {
      console.log("Login successful");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
