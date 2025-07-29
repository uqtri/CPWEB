import SubmissionCard from "@/components/SubmissionCard/SubmissionCard";
import { useProblem } from "@/hooks/useProblem";
import { useSubmission } from "@/hooks/useSubmission";
import { useAppStore } from "@/store";
import { Submission } from "@/types/submission";
import { Pagination } from "antd";
import { ArrowLeft } from "lucide-react";
import { Link, useParams, useSearchParams } from "react-router-dom";

const limit = 10;
export default function SubmissionForSpecificProblem() {
  const user = useAppStore((state) => state.user);
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { getProblemBySlugQuery } = useProblem({
    slug: params.problemSlug,
  });
  const problem = getProblemBySlugQuery.data;
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { getSubmissionsByUserIdQuery } = useSubmission({
    userId: user?.id,
    params: `problemId=${problem?.id || undefined}&page=${page}`,
  });
  const submissions = getSubmissionsByUserIdQuery.data?.submissions || [];

  return (
    <div className="h-full">
      <Link to={`/problem/${params.problemSlug}`}>
        <div className="flex text-gray-500 items-center gap-2 mb-4">
          <ArrowLeft />
          <span className="cursor-pointer">Quay lại</span>
        </div>
      </Link>
      <h1 className="text-2xl font-semibold mb-4">
        Bài nộp cho vấn đề: {problem?.title}
      </h1>
      <div className="bg-white rounded-lg shadow-md p-4 h-full">
        {submissions.length === 0 && (
          <p className="text-gray-500">Bạn chưa nộp bài cho bài tập này.</p>
        )}
        {submissions?.map((submission: Submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <Pagination
          className="text-primary"
          current={page}
          pageSize={limit}
          total={getSubmissionsByUserIdQuery.data?.total || 0}
          onChange={(page) => {
            setSearchParams((prev) => {
              return {
                ...prev,
                page: page.toString(),
              };
            });
          }}
        />
      </div>
    </div>
  );
}
