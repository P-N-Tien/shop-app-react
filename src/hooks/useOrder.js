import { useMutation } from "@tanstack/react-query";
import { postApi } from "../configs/api";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (payload) => postApi("/api/v1/orders/checkout", payload),
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
    },
    onError: (error) => {
      console.error("Checkout failed:", error);
    },
  });
};
