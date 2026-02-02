import { useQuery } from "@tanstack/react-query";
import { getApi } from "../configs/api";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getApi("/api/v1/categories"),
  });
};
