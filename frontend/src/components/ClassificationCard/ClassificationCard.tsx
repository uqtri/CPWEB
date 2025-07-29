import React from "react";
import { motion } from "motion/react";
import { Button } from "@/ui/Button";
import { Link } from "react-router-dom";
import { useProblem } from "@/hooks/useProblem";
import { BG_COLORS } from "@/constants/color";

type ClassificationCardProps = {
  title: string;
  icon: React.ReactElement;
  description: string;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "primary";
  tags: string[];
  numberOfProblems: number;
  link: string;
};

export default function ClassificationCard({
  title,
  icon,
  description,
  color,
  tags,
}: ClassificationCardProps) {
  const params = `${tags.map((tag) => `categories=${tag}`).join("&")}`;
  console.log(params);
  const { getProblemListQuery } = useProblem({
    params: params,
  });
  const data = getProblemListQuery?.data || {};
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-md  shadow-xl w-full overflow-hidden flex flex-col "
    >
      <div
        className={`w-full rounded-md py-3 px-4 flex items-center ${BG_COLORS[color]} text-black justify-between`}
      >
        <p className="font-bold text-xl">{title}</p>
        {icon}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <p className="text-xl font-bold mt-2">{data?.totalProblems} bài tập</p>

        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
          <div
            className={`h-full bg-[var(${color})] rounded-full`}
            style={{
              width: "30%",
            }}
          ></div>
        </div>
        <div className="tags flex gap-2 flex-wrap mt-4 flex-">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`bg-primary/20 text-[var(${color})] rounded-full px-2 py-1 text-xs font-semibold `}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto p-4">
        <Link to={"/problemset?" + params}>
          <Button content="Xem chi tiết" className="w-full" />
        </Link>
      </div>
    </motion.div>
  );
}
