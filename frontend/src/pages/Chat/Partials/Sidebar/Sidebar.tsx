import { useConversation } from "@/hooks/useConversation";
import { useAppStore } from "@/store";
import { Conversation } from "@/types/conversation";
import { Button } from "@/ui/Button";
import GroupAvatar from "@/assets/user.png";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
const XL_SCREEN = 1440;

export default function Sidebar() {
  const user = useAppStore((state) => state.user);
  const { getConversationByUserIdQuery } = useConversation({
    userId: user?.id,
  });
  const conversations = getConversationByUserIdQuery.data || [];
  const navigate = useNavigate();
  const params = useParams();
  const conversationId = parseInt(params?.conversationId || "");
  const socket = useAppStore((state) => state.socket);
  useEffect(() => {
    if (socket) {
      socket.on("conversation:create", () => {
        getConversationByUserIdQuery.refetch();
        toast.success("Đã tạo nhóm chat mới.");
      });
      socket.on("message:create", () => {
        getConversationByUserIdQuery.refetch();
      });
    }
    if (socket && conversations.length > 0) {
      console.log("Joining conversations");
      socket.emit(
        "conversations:join",
        conversations.map((c: Conversation) => c.id)
      );
    }
    return () => {
      // if (socket) {
      //   socket.off("conversation:create");
      //   socket.off("message:create");
      // }
    };
  }, [socket, conversations]);

  useEffect(() => {
    const handleResizeAndNavigate = () => {
      if (conversations.length > 0 && !conversationId) {
        if (window.innerWidth > XL_SCREEN) {
          navigate(`/chat/${conversations[0].id}`);
        }
      }
    };

    handleResizeAndNavigate();
    window.addEventListener("resize", handleResizeAndNavigate);
    return () => window.removeEventListener("resize", handleResizeAndNavigate);
  }, [conversations]);
  return (
    <aside
      className={cn(
        "w-full lg:w-1/4 bg-gray-100 p-4 rounded-lg",
        conversationId && "hidden lg:block"
      )}
    >
      <div className="flex gap-4 items-center justify-between">
        <h1 className="text-2xl">Nhắn tin</h1>
        <Button content="Tạo nhóm chat" />
      </div>
      <div className="flex items-center gap-2 mt-4 rounded-lg bg-gray-300 px-5 py-4">
        <Search />
        <input
          type="text"
          placeholder="Tìm kiếm tin nhắn, nhóm chat..."
          className="w-full bg-transparent border-none focus:outline-none"
        />
      </div>
      <div className="mt-4">
        {conversations?.map((conversation: Conversation) => {
          return (
            <div
              key={conversation.id}
              className={cn(
                `py-2 px-8 bg-white hover:bg-gray-200 rounded cursor-pointer flex gap-2 items-center mt-4`,
                conversationId === conversation.id &&
                  "bg-gray-300 hover:bg-gray-300"
              )}
              onClick={() => {
                navigate(`/chat/${conversation.id}`);
              }}
            >
              <img
                src={conversation?.image || GroupAvatar}
                className="w-18 h-18 p-2 rounded-full"
                alt="Ảnh avatar cho group chat"
              />
              <div>
                <h2 className="text-lg font-semibold line-clamp-1">
                  {conversation.name}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-1">
                  {conversation?.lastMessage || "Chưa có tin nhắn nào."}
                </p>
                <p className="text-xs text-gray-500">
                  {conversation?.lastMessage &&
                    new Date(conversation.updatedAt).toLocaleTimeString(
                      "vi-VN",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
