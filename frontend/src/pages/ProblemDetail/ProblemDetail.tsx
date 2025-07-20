// import "katex/dist/katex.min.css";
import { Check, Clock, FileArchive, MenuIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import Markdown from "../../components/Markdown/Markdown";
import { useProblem } from "@/hooks/useProblem";

export default function ProblemDetail() {
  const location = useLocation();
  const { problemSlug } = useParams();
  const [searchQuery] = useSearchParams();

  const { getProblemBySlugQuery } = useProblem({ slug: problemSlug || "" });

  const problem = getProblemBySlugQuery?.data;
  console.log("Problem:", problem);
  return (
    <div className="problem-detail">
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
            <span className="font-bold">Memory limit:</span>{" "}
            {problem?.memoryLimit} MB
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileArchive />
          {/* <p>
            <span className="font-bold">Input:</span> {problem.input}
          </p> */}
        </div>
        <div className="flex items-center gap-2">
          <FileArchive />
          {/* <p>
            <span className="font-bold">Output:</span> {problem.output}
          </p> */}
        </div>
        <div>
          <Button
            link={`${location.pathname}/submit?${searchQuery.toString()}`}
            color="white"
            label="Nộp bài"
            background="primary"
          />
        </div>
      </div>

      <div className="prose max-w-none mt-6">
        <Markdown markdown={problem?.content || ""} />
      </div>
    </div>
  );
}
