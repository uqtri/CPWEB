import React from "react";
import { motion } from "motion/react";
import {
  BG_COLORS,
  BORDER_COLORS,
  HOVER_TEXT_COLORS,
  TEXT_COLORS,
} from "../../../../constants/color";
import { Button } from "@/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "@/assets/user.png";

type RankingCardProps = {
  user: any;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "primary";
  ranking: number;
  icon: React.ReactElement;
};
export default function RankingCard({
  user,
  color,
  ranking,
  icon,
}: RankingCardProps) {
  const navigate = useNavigate();

  console.log("user", user);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-md shadow-xl w-full overflow-hidden"
    >
      <div
        className={`w-full rounded-md py-3 px-4 flex items-center ${BG_COLORS[color]} text-white justify-between`}
      >
        <div className="flex gap-2 items-center">
          {icon}
          <p className="font-bold text-xl">#{ranking}</p>
        </div>
        <p className="font-bold text-xl">{user?.points} điểm </p>
      </div>
      <div className="p-4 text-center">
        <img
          src={user?.avatarUrl || UserAvatar}
          className="w-[100px] h-[100px] text-center rounded-full object-cover mx-auto"
          alt="user"
        />
        <p className="font-bold text-lg">{user?.username}</p>
        <div className="flex gap-3 mt-4 justify-center">
          <div className="bg-gray-50 p-3 rouned-md ">
            <p className="text-center text-sm"> Số bài đã giải</p>
            <p className="text-center text-lg font-bold">
              {user?.solvedProblems?.length}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rouned-md ">
            <p className="text-center text-sm">Số kì thi tham gia</p>
            <p className="text-center text-lg font-bold">
              {user?.participatedContests?.length}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            content="Xem hồ sơ"
            className={`${BG_COLORS[color]} ${BORDER_COLORS[color]} ${HOVER_TEXT_COLORS[color]}`}
            onClick={() => {
              navigate(`/profile/${user?.id}`);
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
