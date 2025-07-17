import { useContest } from "@/hooks/useContest";
import { useEscape } from "@/hooks/useEscape";
import { useProblem } from "@/hooks/useProblem";
import { popEscapeHandler } from "@/lib/escapeStackManager";
import { formatDatetimeLocal } from "@/lib/formatDate";

import { slug } from "@/lib/slugify";
import { Problem } from "@/types/problem";
import { Button } from "@/ui/Button";
import { Select } from "antd";
import { ChangeEvent, FormEvent, MouseEventHandler, useState } from "react";
// import { omit, set } from "lodash";
import { toast } from "react-toastify";
export default function CreateAndUpdateContestModal({
  contest,
  setModal,
}: {
  contest: any;
  setModal: () => void;
}) {
  useEscape(setModal);

  const { getProblemListQuery } = useProblem({});
  const { updateContestMutation, createContestMutation } = useContest({});
  const problems = getProblemListQuery?.data?.problems || [];
  const [data, setData] = useState({
    title: contest ? contest.title : "",
    problems: contest ? contest.problems?.map((p: any) => p.problemId) : [],
    startTime: contest ? contest.startTime : "",
    endTime: contest ? contest.endTime : "",
    description: contest ? contest.description : "",
    slug: contest ? contest.slug : "",
  });

  const handleChangeContestData = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Contest data:", contest?.problems);
  const handeleCreateAndUpdateContest = async () => {
    try {
      if (contest) {
        await updateContestMutation.mutateAsync({
          id: contest.id,
          data,
        });
        toast.success("Cập nhật kì thi thành công!");
      } else {
        await createContestMutation.mutateAsync(data);
        toast.success("Tạo kì thi thành công!");
      }
      setModal();
    } catch (error) {
      console.log(error);
      toast.error(
        contest
          ? "Cập nhật kì thi thất bại. Vui lòng thử lại sau."
          : "Tạo kì thi thất bại. Vui lòng thử lại sau."
      );
    }
  };
  console.log("Contest data: vvv", contest?.problems);
  return (
    <div
      className="modal-overlay flex items-center justify-center"
      onClick={() => {
        setModal();
        popEscapeHandler();
      }}
    >
      <form
        className="p-6 bg-white rounded shadow-lg w-full max-w-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-2xl font-bold mb-4">
          {contest ? "Chỉnh sửa kì thi" : "Tạo kì thi mới"}
        </h2>

        {/* Add more form fields as needed */}
        <div className="mt-4">
          <label className="block text-xl font-medium mb-2">Tên kì thi</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            defaultValue={data?.title || ""}
            required
            name="title"
            onChange={handleChangeContestData}
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium mb-2">Slug</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            defaultValue={data?.slug || ""}
            required
            name="slug"
            onChange={handleChangeContestData}
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium mb-2">Chọn bài tập</label>
          <Select
            mode="multiple"
            className="w-full"
            options={problems?.map((problem: Problem) => ({
              label: problem.title,
              value: problem.id,
            }))}
            value={data?.problems}
            onChange={(value) => {
              console.log("Selected problems:", value);
              setData((prev) => ({
                ...prev,
                problems: value,
              }));
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-xl font-medium mb-2">
              Thời gian bắt đầu
            </label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded"
              name="startTime"
              defaultValue={formatDatetimeLocal(data?.startTime || "")}
              onChange={handleChangeContestData}
            />
          </div>
          <div>
            <label className="block text-xl font-medium mb-2">
              Thời gian kết thúc
            </label>
            <input
              type="datetime-local"
              name="endTime"
              className="w-full p-2 border rounded"
              value={formatDatetimeLocal(data?.endTime || "")}
              onChange={handleChangeContestData}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-xl font-medium mb-2">Mô tả</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            defaultValue={contest ? contest.description : ""}
            onChange={handleChangeContestData}
          />
        </div>
        <div className="flex justify-end">
          <Button
            className="mt-4"
            content={contest ? "Cập nhật kì thi" : "Tạo mới kì thi"}
            onClick={(e) => {
              e.preventDefault();
              handeleCreateAndUpdateContest();
            }}
          />
        </div>
      </form>
    </div>
  );
}
