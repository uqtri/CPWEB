import { Calendar, Circle, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { formatDate } from "@/lib/formatDate";

export default function ContestCard({ contest, options = {} }: any) {
  console.log(contest);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="contest-card rounded-md bg-white shadow-xl w-full overflow-hidden"
    >
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
