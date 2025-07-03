import React from "react";
import { cn } from "@/lib/utils";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  content?: string;
};
export function Button({ className, content, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-5 py-3 outline-none bg-primary text-white hover:bg-white border hover:border-primary-200 hover:text-primary cursor-pointer transition-all transition-duration-300 rounded-lg text-lg",
        className
      )}
      {...props}
    >
      {content}
    </button>
  );
}
