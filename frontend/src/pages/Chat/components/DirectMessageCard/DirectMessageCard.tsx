import { useAppStore } from "@/store";
import { Conversation } from "@/types/conversation";
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import UserAvatar from "@/assets/user.png";
export default function DirectMessageCard({
  conversation,
}: {
  conversation: Conversation;
}) {
  const user = useAppStore((state) => state.user);
  const params = useParams();
  const conversationId = parseInt(params?.conversationId || "");
  const navigate = useNavigate();
  if (!user) return null;
  const anotherUser = conversation?.participants.find((value) => {
    return value.id != user.id;
  });
  return (
    <div
      className={cn(
        `py-2 px-8 bg-white hover:bg-gray-200 rounded cursor-pointer flex gap-2 items-center mt-4`,
        conversationId === conversation.id && "bg-gray-300 hover:bg-gray-300"
      )}
      onClick={() => {
        navigate(`/chat/${conversation.id}`);
      }}
    >
      <img
        src={anotherUser?.avatarUrl || UserAvatar}
        className="w-18 h-18 p-2 rounded-full"
        alt="Ảnh avatar cho group chat"
      />
      <div>
        <h2 className="text-lg font-semibold line-clamp-1">
          {anotherUser?.username}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-1">
          {conversation?.lastMessage || "Chưa có tin nhắn nào."}
        </p>
        <p className="text-xs text-gray-500">
          {conversation?.lastMessage &&
            new Date(conversation.updatedAt).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
        </p>
      </div>
    </div>
  );
}
