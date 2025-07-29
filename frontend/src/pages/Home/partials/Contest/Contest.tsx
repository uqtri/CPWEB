import { Link } from "react-router-dom";
import ContestCard from "../../../../components/ContestCard/ContestCard";
import { Button } from "@/ui/Button";
import { useContest } from "@/hooks/useContest";
import type { Contest } from "@/types/contest";

export default function Contest() {
  const { getContestsQuery } = useContest({});
  const contests = getContestsQuery?.data || [];

  return (
    <div className="contest-section p-5 lg:p-10 mt-10 shadow-lg rounded-xl">
      <p className="text-4xl text-center font-bold">Cuộc thi nổi bật</p>
      <p className="text-center text-gray-500 font-medium mt-2">
        Tham gia các cuộc thi lập trình để thử thách bản thân, nâng cao kỹ năng
        và cơ hội thắng giải thưởng hấp dẫn.
      </p>
      <div className="contests grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-4">
        {contests?.map((contest: Contest) => (
          <ContestCard key={contest.id} contest={contest} />
        ))}
      </div>
      <div className="mt-6 p-4 font-bold flex">
        <Link to={"/contest"} className="mx-auto">
          <Button content="Tham gia tất cả cuộc thi" />
        </Link>
      </div>
    </div>
  );
}
