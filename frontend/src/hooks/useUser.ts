import { getAllUsers } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";
export default function useUser({ params }: { params?: string }) {
  const getAllUsersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      return getAllUsers(params || "");
    },
  });

  return {
    getAllUsersQuery,
  };
}
