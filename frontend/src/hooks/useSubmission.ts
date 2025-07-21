import { getSubmissionsByUserId } from "@/api/submissions.api";
import { useQuery } from "@tanstack/react-query";

export function useSubmission({
  userId,
  params,
}: {
  userId: number;
  params?: string;
}) {
  const getSubmissionsByUserIdQuery = useQuery({
    queryKey: ["submissions", userId, params],
    queryFn: () => {
      return getSubmissionsByUserId({ userId, params });
    },
    enabled: !!userId,
  });
  return {
    getSubmissionsByUserIdQuery,
  };
}
