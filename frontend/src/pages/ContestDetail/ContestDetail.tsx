import { useContest } from "@/hooks/useContest";
import { Calendar, Star, Timer, Users } from "lucide-react";
import { useParams } from "react-router-dom";
import { formatDate } from "@/lib/formatDate";
import { useState } from "react";
import Problems from "./Partials/Problems/Problems";
import { cn } from "@/lib/utils";
import Leaderboard from "./Partials/Leaderboard/Leaderboard";
export default function ContestDetail() {
  const params = useParams();
  const contestSlug = params.contestSlug;
  const [tab, setTab] = useState("problems");

  const { getContestBySlugQuery } = useContest({ slug: contestSlug });
  const contest = getContestBySlugQuery.data || {};
  console.log("contest", contest);
  const diff =
    new Date(contest?.endTime).getTime() -
    new Date(contest?.startTime).getTime();
  console.log("diff", new Date(diff).getHours());
  const hours = new Date(diff).getHours();
  const minutes = new Date(diff).getMinutes();

  return (
    <div className="p-10">
      <h1 className="text-2xl">{contest?.title}</h1>
      <p className="text-gray-600 mt-2">{contest?.description}</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ">
        <div className="flex items-center gap-2">
          <Calendar className="p-2 w-[40px] h-[40px] text-primary bg-primary/30 rounded-lg" />
          <div className="">
            {" "}
            <p className="block text-gray-400">Thời gian bắt đầu</p>
            <p className="block font-bold">{formatDate(contest?.startTime)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Timer className="p-2 w-[40px] h-[40px] text-green-400 bg-green-400/20 rounded-lg" />
          <div className="">
            {" "}
            <p className="block text-gray-400">Tổng thời gian </p>
            <p className="block font-bold">
              {hours} giờ {minutes} phút
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="p-2 w-[40px] h-[40px] text-violet-400 bg-violet-400/20 rounded-lg" />
          <div className="">
            {" "}
            <p className="block text-gray-400">Số người đăng ký </p>
            <p className="block font-bold">
              {contest?.participants?.length || 0} người
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Star className="p-2 w-[40px] h-[40px] text-yellow-400 bg-yellow-400/20 rounded-lg" />
          <div className="">
            {" "}
            <p className="block text-gray-400">Số bài tập </p>
            <p className="block font-bold">
              {contest?.problems?.length || 0} bài
            </p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 px-5 pt-3 mt-4 mb-4 rounded-lg shadow-md pb-5">
        <div className="w-full flex gap-4 text-md font-semibold border-b-1 border-gray-300">
          <p
            className={cn(
              "py-2 px-3 hover:border-b-2 text-gray-400 hover:border-gray-500/20",
              tab === "problems" && "border-b-2 border-blue-400 text-blue-400"
            )}
            onClick={() => setTab("problems")}
          >
            Bài tập
          </p>
          <p
            className={cn(
              "py-2 px-3 hover:border-b-2 text-gray-400 hover:border-gray-500/20",
              tab === "leaderboard" &&
                "border-b-2 border-blue-400 text-blue-400"
            )}
            onClick={() => setTab("leaderboard")}
          >
            {" "}
            Bảng xếp hạng
          </p>
        </div>
        {tab === "problems" && (
          <Problems
            contestSlug={contest?.slug}
            contestId={contest?.id}
            problems={contest?.problems}
          />
        )}
        {tab === "leaderboard" && (
          <Leaderboard
            contestSlug={contest?.slug}
            problems={contest?.problems}
          />
        )}
      </div>
    </div>
  );
}
