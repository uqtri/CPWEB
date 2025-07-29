import { Calendar, Circle, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { formatDate } from "@/lib/formatDate";
import { getStatusText } from "@/utils/status";
import { cn } from "@/lib/utils";
function getStatusColor(status: string) {
  switch (status) {
    case "upcoming":
      return "bg-yellow-200 text-yellow-800"; // matches your current "Sắp diễn ra"
    case "ongoing":
      return "bg-green-100 text-green-800"; // matches your current "Đang diễn ra"
    case "ended":
      return "bg-purple-100 text-purple-800";
    // clean subtle neutral for ended
    default:
      return "";
  }
}

export default function ContestCard({ contest, options = {} }: any) {
  const status =
    new Date(contest?.startTime) > new Date()
      ? "upcoming"
      : new Date(contest?.endTime) < new Date()
      ? "ended"
      : "ongoing";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="contest-card rounded-md bg-white shadow-xl w-full overflow-hidden"
    >
      <div
        className={cn(
          `bg-red-500 text-center text-white px-4 py-2 flex items-center`,
          getStatusColor(status)
        )}
      >
        <Circle className="animate-ping" size={10} />{" "}
        <p className="flex-grow text-center">{getStatusText(status)}</p>
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
        {options?.showButton && (
          <Link to={`/contest/${contest?.slug}`}>
            <button className="p-2 border border-primary text-primary w-full mt-4 rounded-md cursor-pointer">
              Tham gia ngay
            </button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
