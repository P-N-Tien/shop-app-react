import apiClient from "@/configs/api";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => apiClient.get("/api/v1/auth/logout"),
    onSuccess: () => {
      console.log("Logout successful");
    },
    onError: () => {},
  });
};
