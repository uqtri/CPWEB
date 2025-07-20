import { Calendar, Circle, Clock, Edit, Trash, Users } from "lucide-react";
import { formatDate } from "@/lib/formatDate";

export default function ContestCard({ contest, onEdit }: any) {
  return (
    <div className="contest-card rounded-md bg-white shadow-xl w-full overflow-hidden">
      <div className="bg-red-500 text-center text-white px-4 py-2 flex items-center">
        <Circle className="animate-ping" size={10} />{" "}
        <p className="flex-grow text-center">{"Đang diễn ra"}</p>
      </div>
      <div className="p-5">
        <p className="font-bold text-xl min-h-[40px] line-clamp-2">
          {contest?.title || "Kì thi đầu tiên"}
        </p>
        <p className="text-gray-500 text-sm font-semibold min-h-[60px] line-clamp-3">
          {contest?.description}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <Calendar />
          <p className="text-gray-500 text-sm font-semibold">
            Bắt đầu: {formatDate(contest?.startTime)}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Clock />
          <p className="text-gray-500 text-sm font-semibold">
            Kết thúc: {formatDate(contest?.endTime)}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Users />
          <p className="text-gray-500 text-sm font-semibold">
            {contest?.participants?.length || 0} người tham gia
          </p>
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <Edit
            className="cursor-pointer"
            onClick={() => {
              onEdit();
            }}
          />
          <Trash className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
