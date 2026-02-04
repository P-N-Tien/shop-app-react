import { baseURL } from "@/configs/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload) =>
      axios.post(`${baseURL}/api/v1/auth/login`, payload),
    onSuccess: () => {
      console.log("Login successful");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
