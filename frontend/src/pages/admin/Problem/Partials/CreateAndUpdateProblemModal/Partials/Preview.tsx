import Markdown from "@/components/Markdown/Markdown";
import { useEscape } from "@/hooks/useEscape";
import { CreateProblemData, UpdateProblemData } from "@/types/problem";
import { Button } from "@/ui/Button";
import { Check, Clock, FileArchive, MenuIcon } from "lucide-react";

export default function Preview({
  callback,
  problem,
}: {
  callback: () => void;
  problem: CreateProblemData | UpdateProblemData;
}) {
  useEscape(callback);

  // const title = (problem.get("title") as string) || "";
  // const content = (problem.get("content") as string) || "";
  return (
    <div className="problem-detail fixed top-0 left-0 w-full h-full bg-white z-50 p-6 overflow-y-auto">
      <p className="text-3xl font-semibold border-b pb-1">{problem?.title}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 p-4 bg-yellow/20 rounded-md gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Check />
          <p>
            <span className="font-bold">Điểm số:</span> {problem?.points}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock />
          <p>
            <span className="font-bold">Giới hạn thời gian:</span>{" "}
            {problem?.executionTime} giây
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MenuIcon />
          <p>
            <span className="font-bold"> Giới hạn bộ nhớ: </span>{" "}
            {problem?.memoryLimit} MB
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileArchive />
          <p>
            <span className="font-bold">Độ khó:</span> {problem?.difficulty}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* <FileArchive />
          <p>
            <span className="font-bold">Xem các nộp bài:</span> {problem.output}
          </p> */}
        </div>
        <div>
          <Button content="Nộp bài" />
        </div>
      </div>

      <div className="prose max-w-none mt-6 p-15 shadow-md rounded-md">
        <Markdown markdown={problem?.content || ""} />
      </div>
    </div>
  );
}
