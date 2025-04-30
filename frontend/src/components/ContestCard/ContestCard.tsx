import { Calendar, Circle, Clock, Dot, Flag, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
type ContestCardProps = {
  status: string;
  title: string;
  description: string;
  difficulty: string;
  startTime: string;
  endTime: string;
  participants: number;
};
export default function ContestCard({
  status,
  title,
  description,
  difficulty,
  startTime,
  endTime,
  participants,
}: ContestCardProps) {
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
        <p className="flex-grow text-center">{status}</p>
      </div>
      <div className="p-5">
        <p className="font-bold text-xl">{title}</p>
        <p className="text-gray-500 text-sm font-semibold">{description}</p>
        <div className="flex items-center gap-3 mt-2">
          <Calendar />
          <p className="text-gray-500 text-sm font-semibold">
            Bắt đầu: {startTime}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Clock />
          <p className="text-gray-500 text-sm font-semibold">
            Kết thúc: {endTime}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Flag />
          <p className="text-gray-500 text-sm font-semibold">
            Độ khó: {difficulty}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <Users />
          <p className="text-gray-500 text-sm font-semibold">
            {participants} người tham gia
          </p>
        </div>
        <Link to="/">
          <button className="p-2 border border-primary text-primary w-full mt-4 rounded-md">
            Tham gia ngay
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
