import { getApi } from "@/configs/api";
import { useQuery } from "@tanstack/react-query";

export const useValidateVNPay = (paramsObj, options = {}) => {
  return useQuery({
    queryKey: ["vnpay-validation", paramsObj],
    queryFn: async () => {
      const response = await getApi(`/api/v1/vnpay/validate`, paramsObj);

      if (response?.paymentStatus === "PENDING") {
        throw new Error("PAYMENT_PENDING");
      }

      return response;
    },
    refetchOnWindowFocus: false,
    enabled: !!paramsObj,
    ...options,
  });
};
