import { useSubmission } from "@/hooks/useSubmission";
import { useAppStore } from "@/store";
import SubmissionCard from "./components/SubmissionCard/SubmissionCard";
import SubmissionFilter from "./Partials/SubmissionFilter/SubmissionFilter";
import Statistic from "./Partials/Statistic/Statistic";
import type { Submission } from "@/types/submission";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

const pageSize = 10;
export default function Submission() {
  const user = useAppStore((state) => state.user);
  const [searchParams] = useSearchParams();
  const { getSubmissionsByUserIdQuery } = useSubmission({
    userId: user?.id,
    params: searchParams.toString(),
  });
  const data = getSubmissionsByUserIdQuery?.data;
  const submissions = getSubmissionsByUserIdQuery.data?.submissions || [];
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="grid grid-cols-1 lg:flex gap-4 ">
      <div className="md:grid md:grid-cols-2 gap-4 lg:block">
        {/* <div> */}
        <SubmissionFilter />
        {/* </div> */}
        <div className="mt-10 md:mt-0 lg:mt-10">
          <Statistic data={data} />
        </div>
      </div>

      <div className="submission-container flex-1">
        <h1 className="text-xl font-semibold ">Bài nộp của tôi</h1>
        <p className="text-gray-400">
          Xem tất cả các bài nộp và theo dõi tiến độ học tập của bạn
        </p>
        <div className="mt-4 bg-white rounded-lg shadow-md overflow-hidden">
          <p className="w-full text-md p-4">
            Tất cả bài nộp {`(${submissions?.length})`}
          </p>
          <div className="mb-4">
            {submissions?.map((submission: Submission) => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))}
          </div>
          <div className="mb-4">
            <Pagination
              total={data?.total}
              pageSize={pageSize}
              className="flex items-center justify-center"
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
      </div>
    </div>
  );
}
