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
import { useParams, useSearchParams } from "react-router-dom";
import type { Problem } from "@/types/problem";
import { p } from "framer-motion/client";
import CreateAndUpdateProblemModal from "./Partials/CreateAndUpdateProblemModal/CreateAndUpdateProblemModal";
export default function Problem() {
  const [params, setParams] = useSearchParams();
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { getProblemListQuery } = useProblem({ params: params.toString() });

  const problems = getProblemListQuery.data;
  console.log(problems, "problems");

  return (
    <div className="w-full px-10 py-10">
      <div className="">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold mb-4">Quản lí các bài tập</h1>
          <Button
            className=""
            content="Thêm bài tập"
            onClick={() => {
              setIsOpenModal(true);
            }}
          />
        </div>
        <Table className="border-collapse">
          <TableCaption>Danh sách bài tập</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Dạng bài</TableHead>
              <TableHead>Bộ nhớ</TableHead>
              <TableHead>Thời gian chạy</TableHead>
              <TableHead>Độ khó</TableHead>
              <TableHead>Điểm</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Nguyễn Văn A</TableCell>
              <TableCell>12A1</TableCell>
              <TableCell>9.0</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Trần Thị B</TableCell>
              <TableCell>12A2</TableCell>
              <TableCell>8.5</TableCell>
            </TableRow>
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
