import {
  registerContest,
  getRegisteredContestsByUserId,
  getRegisteredContestByContestId,
} from "@/api/contestRegistration.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useContestRegistration({
  userId,
  contestId,
}: {
  userId?: number;
  contestId?: number;
}) {
  const queryClient = useQueryClient();

  const registerContestMutation = useMutation({
    mutationFn: (contestId: number) => {
      return registerContest(contestId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["contests"],
      });
      queryClient.invalidateQueries({
        queryKey: ["registrations-user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["registrations-contest", contestId],
      });
    },
  });

  const getRegisteredContestsByUserIdQuery = useQuery({
    queryKey: ["registrations-user", userId],
    queryFn: () => getRegisteredContestsByUserId(userId!),
    enabled: !!userId,
  });

  const getRegisteredContestByContestIdQuery = useQuery({
    queryKey: ["registrations-contest", contestId],
    queryFn: () => getRegisteredContestByContestId(contestId!),
    enabled: !!contestId,
  });

  return {
    registerContestMutation,
    getRegisteredContestsByUserIdQuery,
    getRegisteredContestByContestIdQuery,
  };
}
