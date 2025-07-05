import {
  createTestCase,
  getTestCaseList,
  updateTestCase,
} from "@/api/testCase.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
export function useTestCases({ problemId }: { problemId?: number }) {
  const queryClient = useQueryClient();
  const getTestCaseListQuery = useQuery({
    queryKey: ["test-cases", problemId],
    queryFn: () => {
      return getTestCaseList(problemId!);
    },
  });

  const createTestCaseMutation = useMutation({
    mutationFn: (data: FormData) => {
      return createTestCase(problemId!, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-cases"] });
    },
  });

  const updateTestCaseMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) => {
      return updateTestCase(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["test-cases"] });
    },
  });

  // const deleteTestCaseMutation = useMutation({
  //   mutationFn: (id: number) => {
  //     return deleteTestCase(id);
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["test-cases"] });
  //   },
  // });

  return {
    getTestCaseListQuery,
    createTestCaseMutation,
    updateTestCaseMutation,
  };
}
