import React from "react";
import { motion } from "motion/react";
import { BG_COLORS } from "../../../../constants/color";
import Button from "../../../../components/Button/Button";
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
        <p className="font-bold text-xl">9,875 điểm</p>
      </div>
      <div className="p-4 text-center">
        <img
          src="https://dongvat.edu.vn/upload/2025/01/capybara-meme-45.webp"
          className="w-[100px] h-[100px] text-center rounded-full object-cover mx-auto"
          alt="user"
        />
        <p className="font-bold text-lg">{user.name}</p>
        <div className="flex gap-3 mt-4 justify-center">
          <div className="bg-gray-50 p-3 rouned-md ">
            <p className="text-center text-sm"> Đã giải</p>
            <p className="text-center text-lg font-bold">482 bài</p>
          </div>
          <div className="bg-gray-50 p-3 rouned-md ">
            <p className="text-center text-sm">Chuỗi ngày</p>
            <p className="text-center text-lg font-bold">124</p>
          </div>
        </div>
        <div className="mt-4">
          <Button link="" label="Xemh hồ sơ" color="primary" />
        </div>
      </div>
    </motion.div>
  );
}
