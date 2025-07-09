import { getAllUsers, getUserById } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";
export default function useUser({
  params,
  userId,
}: {
  params?: string;
  userId?: string;
}) {
  const getAllUsersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      return getAllUsers(params || "");
    },
  });
  const getUserByIdQuery = useQuery({
    queryKey: ["user", params],
    queryFn: async () => {
      return getUserById(userId!);
    },
    enabled: !!userId,
  });
  return {
    getAllUsersQuery,
    getUserByIdQuery,
  };
}
