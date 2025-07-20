import { useContest } from "@/hooks/useContest";
import { ArrowLeft } from "lucide-react";

import { useParams } from "react-router-dom";

export default function ProblemDetail() {
  const params = useParams();
  const { contestSlug } = params;
  // const { getProblemBySlugQuery } = useProblem({ slug: problemSlug || "" });
  const { getContestBySlugQuery } = useContest({ slug: contestSlug || "" });
  const contest = getContestBySlugQuery.data || {};
  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-gray-500 p-5 rounded-md shadow-lg">
        <div className="flex gap-4 items-center">
          {" "}
          <ArrowLeft /> Trở lại kì thi
          <p className="h-[30px] w-[1.5px] bg-gray-300"></p>
          <p className="text-xl font-semibold text-black">{contest?.title}</p>
        </div>
        <div>
          <p className="block">Thời gian còn lại</p>
          <p className="text-red">00:00:00</p>
        </div>
      </div>
      <div>{/* <Markdown></Markdown> */}</div>
    </div>
  );
}
