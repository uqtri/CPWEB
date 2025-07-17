import { Button } from "@/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/ui/Table";
import { useState } from "react";
import { useProblem } from "@/hooks/useProblem";
import { useSearchParams } from "react-router-dom";
import type { Problem } from "@/types/problem";
import CreateAndUpdateProblemModal from "./Partials/CreateAndUpdateProblemModal/CreateAndUpdateProblemModal";
export default function Problem() {
  const [params, setParams] = useSearchParams();
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getProblemListQuery } = useProblem({ params: params.toString() });

  const problems = getProblemListQuery.data?.problems || [];

  return (
    <div className="w-full px-10 py-10">
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Quản lí các bài tập</h1>
          <Button
            className=""
            content="Thêm bài tập"
            onClick={() => {
              setEditingProblem(null);
              setIsOpenModal(true);
            }}
          />
        </div>
        <Table className="border-collapse">
          <TableCaption>Danh sách bài tập</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              {/* <TableHead>Dạng bài</TableHead> */}
              <TableHead>Bộ nhớ</TableHead>
              <TableHead>Thời gian chạy</TableHead>
              <TableHead>Độ khó</TableHead>
              <TableHead>Điểm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems?.map((problem: Problem) => (
              <TableRow
                key={problem.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setEditingProblem(problem);
                  setIsOpenModal(true);
                }}
              >
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.memoryLimit} MB</TableCell>
                <TableCell>{problem.executionTime} ms</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell>{problem.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/*Modal*/}
      {isOpenModal && (
        <CreateAndUpdateProblemModal
          problem={editingProblem}
          setModal={() => {
            setIsOpenModal(false);
          }}
        />
      )}
    </div>
  );
}
