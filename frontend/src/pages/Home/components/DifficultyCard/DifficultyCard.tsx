import { number } from "framer-motion";
import React from "react";
import Button from "../../../../components/Button/Button";
import { BG_COLORS, TEXT_COLORS } from "../../../../constants/color";
type DifficultyCardProps = {
  title: string;
  description: string;
  numberOfProblems: number;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "primary";
};
export default function DifficultyCard({
  title,
  description,
  numberOfProblems,
  color,
}: DifficultyCardProps) {
  return (
    <div className="border border-gray-500 p-4 rounded-md">
      <div className={`${BG_COLORS[color]} h-1 rounded-full`}></div>
      <p className="font-xl text-2xl text-center font-bold mt-4">{title}</p>
      <p className="text-gray-500 text-sm text-center mt-4">{description}</p>
      <p className="font-xl text-xl text-center font-bold my-4">
        {numberOfProblems} bài
      </p>
      <Button label="Luyện tập" color={color} link="/" />
    </div>
  );
}
