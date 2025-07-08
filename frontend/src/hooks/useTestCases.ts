import {
  createTestCase,
  getTestCaseByProblemSlug,
  getTestCaseList,
  updateTestCase,
} from "@/api/testCase.api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
export function useTestCase({
  problemId,
  slug,
}: {
  problemId?: number;
  slug?: string;
}) {
  const queryClient = useQueryClient();

  const getTestCaseByProblemSlugQuery = useQuery({
    queryKey: ["test-cases", slug],
    queryFn: () => {
      return getTestCaseByProblemSlug(slug!);
    },
    enabled: !!slug,
  });
  // const getTestCaseListQuery = useQuery({
  //   queryKey: ["test-cases", problemId],
  //   queryFn: () => {
  //     return getTestCaseList(problemId!);
  //   },
  // });

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
    // getTestCaseListQuery,
    createTestCaseMutation,
    updateTestCaseMutation,
    getTestCaseByProblemSlugQuery,
  };
}
