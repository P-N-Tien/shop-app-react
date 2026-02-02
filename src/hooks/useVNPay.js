import apiClient from "@/configs/api";
import { useMutation } from "@tanstack/react-query";

export const useValidateVNPay = () => {
  return useMutation({
    mutationFn: (payload) => {
      return apiClient.get(`/api/v1/vnpay/validate`, { params: payload });
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
