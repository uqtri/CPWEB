import { Button } from "@/ui/Button";
import { useState } from "react";
import CreateAndUpdateContestModal from "./Paritials/CreateAndUpdateContestModal/CreateAndUpdateContestModal";
import { useContest } from "@/hooks/useContest";

import type { Contest } from "@/types/contest";
import ContestCard from "./Components/ContestCard/ContestCard";
export default function Contest() {
  const [editingContest, setEditingContest] = useState<any>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { getContestsQuery } = useContest({});

  const contests = getContestsQuery.data || [];

  console.log("Contests@@:", contests);
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h1 className="text-3xl font-bold mb-5">Quản lí các kì thi</h1>
          <p className="mb-5 text-gray-700">
            Đây là trang quản lí các kì thi. Bạn có thể tạo, chỉnh sửa và xóa
            các kì thi tại đây.
          </p>
        </div>
        <div>
          <Button
            content="Tạo kì thi mới"
            onClick={() => {
              setEditingContest(null);
              setIsOpenModal(true);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {contests.length > 0 &&
          contests.map((contest: Contest) => {
            return (
              <ContestCard
                contest={contest}
                key={contest.id}
                onEdit={() => {
                  setEditingContest(contest);
                  setIsOpenModal(true);
                }}
              />
            );
          })}
      </div>
      {isOpenModal && (
        <CreateAndUpdateContestModal
          contest={editingContest}
          setModal={() => {
            setIsOpenModal(false);
          }}
        />
      )}
    </div>
  );
}
