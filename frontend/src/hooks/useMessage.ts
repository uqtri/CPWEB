import { createMessage, getMessageByConversationId } from "@/api/message.api";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export function useMessage({
  conversationId,
}: // params,
{
  conversationId?: number;
  params?: string;
}) {
  const queryClient = useQueryClient();
  const getMessageByConversationIdQuery = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    initialPageParam: 1000000000,
    queryFn: ({ pageParam }) =>
      getMessageByConversationId({
        conversationId: conversationId!!,
        params: `id=${pageParam}`,
      }),
    getNextPageParam: (lastPage) => {
      const nextPage =
        lastPage.length > 0 ? lastPage[lastPage.length - 1].id - 1 : undefined;
      return nextPage;
    },
    enabled: !!conversationId,
  });

  const createMessageMutation = useMutation({
    mutationFn: (data: any) => {
      return createMessage(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
  return {
    getMessageByConversationIdQuery,
    createMessageMutation,
  };
}
