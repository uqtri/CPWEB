import { Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useContest } from "@/hooks/useContest";
import type { Contest } from "@/types/contest";
import ContestList from "./Partials/ContestList/ContestList";
export default function Contest() {
  const [contestStatus, setContestStatus] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const { getContestsQuery } = useContest({});

  const contests = getContestsQuery.data || [];

  console.log("FETCH CONTESTS");
  const upcomingContests =
    contests?.filter((contest: Contest) => {
      const currentTime = new Date();
      const startTime = new Date(contest.startTime);
      return startTime > currentTime;
    }) || [];
  const ongoingContests =
    contests?.filter((contest: Contest) => {
      const currentTime = new Date();
      const startTime = new Date(contest.startTime);
      const endTime = new Date(contest.endTime);
      return startTime <= currentTime && endTime >= currentTime;
    }) || [];
  const endedContests =
    contests?.filter((contest: Contest) => {
      const currentTime = new Date();
      const endTime = new Date(contest.endTime);
      return endTime < currentTime;
    }) || [];
  // const registeredContests =
  return (
    <div>
      <div>
        <h1>Các kì thi lập trình</h1>
        <p>
          Tham gia vào kì thi lập trình thi đấu và cải thiện kĩ năng thuật toán
          của bạn
        </p>
      </div>
      <div className="flex items-center border-1 border-gray-300 pl-2">
        <Search />
        <input
          type="text"
          placeholder="Tìm kiếm kì thi..."
          className="ml-2 p-2 border-none outline-none"
          onChange={(e) => setTextSearch(e.target.value)}
        />
      </div>
      <div className="mt-4 mb-4">
        <div className="flex gap-4 border border-gray-200">
          <p
            className={cn(
              `p-4 hover:border-b-2 hover:border-blue-200 cursor-pointer`,
              contestStatus === "" && "border-b-2 border-blue-500"
            )}
            onClick={() => {
              setContestStatus("");
            }}
          >
            Tất cả
          </p>
          <p
            className={cn(
              `p-4  hover:border-b-2 hover:border-blue-200 cursor-pointer`,
              contestStatus === "ongoing" && "border-b-2 border-blue-500"
            )}
            onClick={() => {
              setContestStatus("ongoing");
            }}
          >
            Đang diễn ra
          </p>

          <p
            className={cn(
              `p-4 hover:border-b-2 hover:border-blue-200 cursor-pointer`,
              contestStatus === "upcoming" && "border-b-2 border-blue-500"
            )}
            onClick={() => {
              setContestStatus("upcoming");
            }}
          >
            Sắp diễn ra
          </p>
          <p
            className={cn(
              `p-4 hover:border-b-2 hover:border-blue-200 cursor-pointer`,
              contestStatus === "ended" && "border-b-2 border-blue-500"
            )}
            onClick={() => {
              setContestStatus("ended");
            }}
          >
            Đã kết thúc
          </p>
        </div>
      </div>
      {contestStatus === "" && <ContestList contests={contests} />}
      {contestStatus === "upcoming" && (
        <ContestList contests={upcomingContests} />
      )}
      {contestStatus === "ongoing" && (
        <ContestList contests={ongoingContests} />
      )}
      {contestStatus === "ended" && <ContestList contests={endedContests} />}
    </div>
  );
}
