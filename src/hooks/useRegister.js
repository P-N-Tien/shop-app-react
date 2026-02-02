import { baseURL } from "@/configs/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload) =>
      axios.post(`${baseURL}/api/v1/auth/register`, payload),
    onSuccess: () => {
      console.log("Register successful:");
    },
    onError: (error) => {},
  });
};
