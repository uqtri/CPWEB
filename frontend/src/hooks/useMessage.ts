import { createMessage, getMessageByConversationId } from "@/api/message.api";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export function useMessage({
  conversationId,
  params,
}: {
  conversationId?: number;
  params?: string;
}) {
  // const getMessageByConversationIdQuery = useInfiniteQuery({
  //   queryKey: ["messages", conversationId, params || ""],
  //   queryFn: ({ pageParam = 1 }) =>
  //     getMessageByConversationId({
  //       // conversationId: conversationId!!,
  //       // params: params,
  //     }),
  //   getNextPageParam: (lastPage, allPages) => {
  //     const nextPage = allPages.length + 1;
  //     return lastPage.length > 0 ? nextPage : undefined;
  //   },
  //   enabled: !!conversationId,
  // });
  const queryClient = useQueryClient();
  const getMessageByConversationIdQuery = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    initialPageParam: 1000000000,
    queryFn: ({ pageParam }) =>
      getMessageByConversationId({
        conversationId: conversationId!!,
        params: `id=${pageParam}`,
      }),
    getNextPageParam: (lastPage, allPages) => {
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
