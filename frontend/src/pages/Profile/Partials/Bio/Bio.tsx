import { BookOpen } from "lucide-react";
import { A } from "node_modules/framer-motion/dist/types.d-DDSxwf0n";
import React from "react";

const defaultText =
  "Passionate competitive programmer with expertise in algorithms and data structures. Love solving complex problems and participating in programming contests";

export default function Bio({ user }: { user: any }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
        Giới thiệu bản thân
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {user?.aboutMe || defaultText}
      </p>
    </div>
  );
}
