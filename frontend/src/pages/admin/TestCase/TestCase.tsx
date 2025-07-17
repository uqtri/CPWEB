import { useSearchParams, useNavigate } from "react-router-dom";
import { useProblem } from "@/hooks/useProblem";
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
import { Problem } from "@/types/problem";
import { slug } from "@/lib/slugify";
export default function TestCase() {
  const [params, setSearchParams] = useSearchParams();
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const { getProblemListQuery } = useProblem({ params: params.toString() });
  const navigate = useNavigate();
  const problems = getProblemListQuery.data?.problems || [];

  return (
    <div className="w-full p-10">
      <h1 className="text-2xl mb-4 font-bold">Danh sách bài tập</h1>
      <p className="text-gray-500 mb-4">
        Dưới đây là danh sách các bài tập hiện có. Bạn có thể nhấp vào tiêu đề
        của bài tập để xem chi tiết và chỉnh sửa các trường hợp kiểm tra (test
        case) của bài tập đó.
      </p>
      <Table className="border-collapse">
        <TableCaption>Danh sách bài tập</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
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
                navigate(`/admin/test-case/${slug(problem.slug)}`);
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
  );
}
