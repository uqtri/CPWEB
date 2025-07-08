import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from "@/api/category.api";
import { CreateCategoryData, UpdateCategoryData } from "@/types/category";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategory() {
  const queryClient = useQueryClient();
  const getCategoryListQuery = useQuery({
    queryKey: ["categoryList"],
    queryFn: getCategoryList,
  });

  const createCategoryMutation = useMutation({
    mutationFn: (data: CreateCategoryData) => {
      return createCategory(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
  });
  const updateCategoryMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) => {
      return updateCategory(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
  });
  const deleteCategoryMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteCategory(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryList"] });
    },
  });
  return {
    getCategoryListQuery,
    createCategoryMutation,
    updateCategoryMutation,
    deleteCategoryMutation,
  };
}
