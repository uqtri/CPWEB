import {
  getBackgroundColorByProblemDifficulty,
  getBorderColorByProblemDifficulty,
  getTextColorByProblemDifficulty,
} from "@/utils/color";
import { cn } from "@/lib/utils";
import { Menu, Timer, Users } from "lucide-react";
import { Link } from "react-router-dom";
export default function Problems({
  problems,
  // contestSlug,
  contestId,
}: {
  problems: any[];
  contestSlug: string;
  contestId: number;
}) {
  console.log("Problems component rendered with problems:", problems);

  const allProblems =
    problems
      ?.map((problem: any) => {
        return problem?.problem;
      })
      .sort((a, b) => {
        return a?.points - b?.points;
      }) || [];
  return (
    <div>
      {allProblems?.map((problem: any, index) => {
        return (
          <Link to={`/problem/${problem?.slug}?contestId=${contestId}`}>
            <div
              key={problem?.id}
              className={cn(
                `problem-card p-4 border-gray-300 border border-l-2 mt-3 rounded-lg cursor-pointer`,
                getBorderColorByProblemDifficulty(problem?.difficulty),
                "border-y-gray-300 border-r-gray-300 flex justify-between items-center"
              )}
            >
              <div className="flex items-center gap-2">
                <p className="font-bold text-gray-500 text-xl">
                  {String.fromCharCode(65 + index)}
                </p>
                <div>
                  <h3 className="text-xl font-bold">{problem?.title}</h3>
                  <div className="flex items-center gap-2">
                    <p
                      className={cn(
                        "p-2 rounded-md",
                        getTextColorByProblemDifficulty(problem?.difficulty),
                        getBackgroundColorByProblemDifficulty(
                          problem?.difficulty
                        )
                      )}
                    >
                      {problem?.difficulty}
                    </p>
                    <p>{problem?.points} điểm</p>
                  </div>
                  <div className="mt-4">
                    {problem?.categories?.map((category: any) => (
                      <span
                        key={category.id || category.name}
                        className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md mr-2"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {problem?.executionTime} đã giải
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {problem?.executionTime} giây
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Menu className="w-4 h-4 text-gray-500" />
                  <p className="text-sm text-gray-500">
                    {problem?.memoryLimit} MB
                  </p>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
