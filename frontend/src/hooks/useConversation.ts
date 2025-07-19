import {
  createConversation,
  getConversationById,
  getConversationsByUserId,
} from "@/api/conversation.api";
import { CreateConversationData } from "@/types/conversation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useConversation({
  conversationId,
  userId,
}: {
  conversationId?: number;
  userId?: number;
}) {
  const queryClient = useQueryClient();
  const getConversationByUserIdQuery = useQuery({
    queryKey: ["conversations", userId],
    queryFn: () => {
      if (!userId) return [];
      return getConversationsByUserId(userId);
    },
    enabled: !!userId,
  });
  const getConversationByIdQuery = useQuery({
    queryKey: ["conversation", conversationId],
    queryFn: () => {
      if (!conversationId) return null;
      return getConversationById(conversationId);
    },
    enabled: !!conversationId,
  });
  const createConversationMutation = useMutation({
    mutationFn: (data: CreateConversationData) => {
      return createConversation(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
  return {
    getConversationByUserIdQuery,
    getConversationByIdQuery,
    createConversationMutation,
  };
}
