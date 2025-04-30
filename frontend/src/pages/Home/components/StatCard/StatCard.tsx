import React from "react";

type StatCardProps = {
  icon: React.ReactElement;
  title: string;
  description: string;
};
export default function StatCard({ icon, title, description }: StatCardProps) {
  return (
    <div className="p-4 bg-white border border-gray-500 rounded-md hover:shadow-md hover:scale-103 transition-all duration-200">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="font-bold text-xl">{title}</p>
      </div>
      <p className="mt-2 text-gray-500 text-sm font-medium">{description}</p>
    </div>
  );
}
