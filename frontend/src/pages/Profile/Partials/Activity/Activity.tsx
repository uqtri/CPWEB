import { Code, Trophy } from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Contest from "./Partials/Contest/Contest";
import Problem from "./Partials/Problem/Problem";
export default function Activity({ user }: { user: any }) {
  const [tabs, setTabs] = useState("contests");
  console.log("user", user);
  return (
    <div>
      <div className="activity-header flex gap-4 border border-gray-200 rounded-lg">
        <div
          className={cn(
            `flex gap-2 p-4 cursor-pointer hover:border-b-2 hover:border-blue-200`,
            tabs === "contests" && "border-b-2 border-blue-500"
          )}
          onClick={() => setTabs("contests")}
        >
          <Trophy />
          <p>Kì thi đã tham gia</p>
        </div>
        <div
          className={cn(
            `flex gap-2 p-4 cursor-pointer  h-full hover:border-b hover:border-b-2 hover:border-blue-200`,
            tabs === "problems" && "border-b-2 border-blue-500"
          )}
          onClick={() => setTabs("problems")}
        >
          <Code />
          <p>Bài tập đã giải</p>
        </div>
      </div>
      <div>
        {/* {tabs === "contests" && <Contest user={user} />} */}
        {tabs === "problems" && (
          <div className="problem-activity p-4">
            <Problem problems={user?.solvedProblems || []} />
          </div>
        )}
      </div>
    </div>
  );
}
