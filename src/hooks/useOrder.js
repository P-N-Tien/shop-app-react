import { useMutation } from "@tanstack/react-query";
import { postApi } from "../configs/api";

export const useCheckout = () => {
  return useMutation({
    mutationFn: (payload) => {
      // 1. Check there is a old Key that it's processing
      let key = localStorage.getItem("X-Idempotency-Key");

      if (!key) {
        // If not, this is a new transaction
        key = crypto.randomUUID();
        localStorage.setItem("X-Idempotency-Key", key);
      }

      return postApi("/api/v1/orders/checkout", payload, {
        headers: { "X-Idempotency-Key": key },
      });
    },
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
    },
    onError: (error) => {
      // If this is a error of user, remove the key
      if (error.response?.status < 500) {
        localStorage.removeItem("X-Idempotency-Key");
      }
      console.error("Checkout failed:", error);
    },
  });
};
