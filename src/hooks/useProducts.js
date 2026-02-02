import { useQuery } from "@tanstack/react-query";
import { getApi } from "../configs/api";

export const useProducts = (categoryId) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      const url = !!categoryId
        ? `/api/v1/products?categoryId=${categoryId}`
        : "/api/v1/products";
      return getApi(url);
    },
    // enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ["productById"],
    queryFn: () => getApi(`/api/v1/products/${id}`),
  });
};

export const useProductByName = (name) => {
  return useQuery({
    queryKey: ["productByName"],
    queryFn: () => getApi(`/api/v1/products/details?name=${name}`),
    enabled: !!name,
  });
};
