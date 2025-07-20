import {
  createContest,
  deleteContest,
  getContestBySlug,
  getContests,
  getLeaderboard,
  updateContest,
} from "@/api/contest.api";
import { CreateContestData, UpdateContestData } from "@/types/contest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useContest({
  params,
  slug,
}: {
  params?: string;
  slug?: string;
}) {
  const queryClient = useQueryClient();

  const getContestsQuery = useQuery({
    queryKey: ["contests", params],
    queryFn: () => getContests(params),
  });
  const getContestBySlugQuery = useQuery({
    queryKey: ["contest", slug],
    queryFn: () => getContestBySlug(slug!!),
    enabled: !!slug,
  });
  const createContestMutation = useMutation({
    mutationFn: (data: CreateContestData) => {
      return createContest(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });

  const updateContestMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateContestData }) => {
      return updateContest(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });
  const getLeaderboardQuery = useQuery({
    queryKey: ["contest", slug, "leaderboard"],
    queryFn: () => getLeaderboard(slug!!),
    enabled: !!slug,
  });
  const deleteContestMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteContest(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contests"] });
    },
  });

  return {
    getContestsQuery,
    createContestMutation,
    updateContestMutation,
    deleteContestMutation,
    getContestBySlugQuery,
    getLeaderboardQuery,
  };
}
