import GroupAvatar from "@/assets/user.png";
import { useMessage } from "@/hooks/useMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useConversation } from "@/hooks/useConversation";
import { ArrowLeftToLine, SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import UserAvatar from "@/assets/user.png";
import { useQueryClient } from "@tanstack/react-query";
import { useAppStore } from "@/store";
import { toast } from "react-toastify";
import { omit } from "lodash";
import { cn } from "@/lib/utils";

export default function Message() {
  const params = useParams();
  const conversationId = parseInt(params?.conversationId || "");
  const [text, setText] = useState("");
  const firstMessageRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);
  const shouldScrollToBottom = useRef(true);
  const socket = useAppStore((state) => state.socket);
  console.log("Socket in Message:", socket);
  const navigate = useNavigate();
  const { getMessageByConversationIdQuery, createMessageMutation } = useMessage(
    {
      conversationId: conversationId,
    }
  );
  const queryClient = useQueryClient();
  const { getConversationByIdQuery } = useConversation({
    conversationId: conversationId,
  });
  const currentConversation = getConversationByIdQuery?.data || {};

  const isDirectConversation =
    !currentConversation?.isCommunity && !currentConversation?.isGroup;

  const user = useAppStore((state) => state.user);
  const anotherUser = currentConversation?.participants?.find((value: any) => {
    return value.id != user?.id;
  });
  const messages =
    getMessageByConversationIdQuery?.data?.pages
      .flatMap((page) => page)
      .reverse() || [];

  if (!conversationId) {
    return <div className="flex-1">Chọn một cuộc trò chuyện để bắt đầu.</div>;
  }
  const handleSendMessage = async ({ message, sentByCurrentUser }: any) => {
    if (sentByCurrentUser) {
      message = {
        sender: user,
        senderId: user?.id,
        conversationId: conversationId,
        content: text,
        createdAt: new Date().toISOString(),
        id: Math.floor(Math.random() * 1000000000),
      };
    }
    if (message.senderId === user?.id && !sentByCurrentUser) {
      return;
    }
    if (message.content.trim() === "") return;

    try {
      await queryClient.setQueryData(
        ["messages", conversationId],
        (oldMessages: any) => {
          return {
            ...oldMessages,
            pages: oldMessages.pages.map((page: any, index: number) => {
              if (index === 0) {
                return [message, ...page];
              }
              return page;
            }),
          };
        }
      );
      if (sentByCurrentUser) {
        console.log("Emitting message:create", {
          message,
          conversationId: conversationId,
        });
        socket?.emit("message:create", {
          message,
          conversationId: conversationId,
        });
        setText("");

        await createMessageMutation.mutateAsync(omit(message, "sender"));
        shouldScrollToBottom.current = true;
      }
    } catch (error) {
      console.log(error);
      toast.error("Gửi tin nhắn thất bại. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (messages.length === 0) return;
    if (
      firstMessageRef.current &&
      messagesRef.current &&
      messagesRef.current.scrollTop === 0 &&
      !shouldScrollToBottom.current
    ) {
      messagesRef.current.scrollTop = firstMessageRef.current.offsetHeight;
    }
    if (messagesRef.current && shouldScrollToBottom.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      shouldScrollToBottom.current = false;
    }
  }, [firstMessageRef, messages]);
  const handleFetchOldMessages = async (e: React.UIEvent<HTMLDivElement>) => {
    if (e.currentTarget.scrollTop == 0) {
      shouldScrollToBottom.current = false;
      await getMessageByConversationIdQuery.fetchNextPage();
    }
  };
  useEffect(() => {
    if (socket) {
      socket.on("message:create", async (data: any) => {
        const message = data.message;
        console.log("Received message:create", data);
        if (message.conversationId === conversationId) {
          await handleSendMessage({ message, sentByCurrentUser: false });
          shouldScrollToBottom.current = true;
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("message:create");
      }
    };
  }, [socket]);

  useEffect(() => {
    if (socket && conversationId) {
      socket.emit("conversations:join", [conversationId]);
    }

    return () => {
      if (socket && conversationId) {
        socket.emit("conversations:leave", [conversationId]);
      }
    };
  }, [socket, conversationId]);
  console.log(anotherUser, " ANOTHER");
  return (
    <div className="flex-1 flex flex-col border border-gray-200 shadow-md rounded-lg overflow-hidden relative h-full">
      {/* <h1>kkkk</h1> */}
      <div className="p-2 flex gap-4 items-center bg-gray-100 shadow-md h-[75px]">
        <ArrowLeftToLine
          className="cursor-pointer block lg:hidden"
          onClick={() => {
            navigate("/chat");
          }}
        />
        <img
          className="w-12 h-12 rounded-full"
          src={
            isDirectConversation
              ? anotherUser?.avatarUrl || GroupAvatar
              : currentConversation?.image || GroupAvatar
          }
          alt="Ảnh nhóm"
        />
        <p className="font-bold">
          {isDirectConversation
            ? anotherUser?.username
            : currentConversation?.name}
        </p>
      </div>
      <div
        className="overflow-y-auto p-2 flex-1 mb-[60px]"
        ref={messagesRef}
        onScroll={handleFetchOldMessages}
      >
        {messages.map((message, index: number) => (
          <div
            key={index}
            ref={index === 0 ? firstMessageRef : null}
            className="flex gap-4 items-center mt-3"
          >
            <img
              className={cn(
                `w-10 h-10 rounded-full`,
                message.senderId === user?.id && "hidden"
              )}
              src={message?.sender?.avatar || UserAvatar}
            />
            <div className="w-full">
              <div
                className={cn(
                  "flex gap-2 text-xs ml-auto",
                  message.senderId === user?.id && "hidden"
                )}
              >
                <p>{message.sender?.username || "Người dùng"}</p>
                <p className="text-gray-500 mb-1">
                  {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div
                className={`px-4 py-2 ${
                  message.senderId === user?.id
                    ? "bg-blue-100 ml-auto"
                    : "bg-gray-200"
                } rounded-lg w-fit max-w-[70%]`}
              >
                <p>{message.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 h-[50px] bg-gray-200 flex items-center gap-4 p-4 w-full">
        {/* <Image className="cursor-pointer" /> */}
        <input
          type="text"
          placeholder="Aa"
          className="py-2 px-3 bg-gray-50 rounded-full flex-1"
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage({ sentByCurrentUser: true });
            }
          }}
        />
        <SendHorizonal
          className="cursor-pointer"
          onClick={() => {
            handleSendMessage({ sentByCurrentUser: true });
          }}
        />
      </div>
    </div>
  );
}
