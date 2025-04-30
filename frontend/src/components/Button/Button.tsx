import { Link } from "react-router-dom";
import React from "react";
import { link } from "framer-motion/client";
import { BORDER_COLORS, TEXT_COLORS } from "../../constants/color";
type buttonProps = {
  label: string;
  color: "red" | "green" | "yellow" | "blue" | "purple" | "primary";
  link: string;
};
export default function Button({ label, color, link }: buttonProps) {
  return (
    <Link to={link}>
      <button
        className={`py-3 w-full border ${BORDER_COLORS[color]}  ${TEXT_COLORS[color]} rounded-md text-center`}
      >
        {label}
      </button>
    </Link>
  );
}
