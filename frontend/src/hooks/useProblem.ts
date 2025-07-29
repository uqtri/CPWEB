import {
  createProblem,
  deleteProblem,
  getProblemBySlug,
  getProblemList,
  updateProblem,
} from "@/api/problem.api";
import { CreateProblemData, UpdateProblemData } from "@/types/problem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProblem({
  params,
  slug,
}: {
  params?: string;
  slug?: string;
}) {
  const queryClient = useQueryClient();
  const getProblemListQuery = useQuery({
    queryKey: ["problems", params],
    queryFn: () => {
      return getProblemList(params);
    },
  });
  const getProblemBySlugQuery = useQuery({
    queryKey: ["problem", slug],
    queryFn: () => {
      return getProblemBySlug(slug!);
    },
    enabled: !!slug,
    retry: false,
  });
  const createProblemMutation = useMutation({
    mutationFn: (data: CreateProblemData) => {
      return createProblem(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
  const updateProblemMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateProblemData }) => {
      return updateProblem(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
  const deleteProblemMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteProblem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["problems"] });
    },
  });
  return {
    getProblemListQuery,
    createProblemMutation,
    updateProblemMutation,
    deleteProblemMutation,
    getProblemBySlugQuery,
  };
}
