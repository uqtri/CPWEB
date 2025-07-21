import { Button } from "@/ui/Button";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SubmissionFilter() {
  const [serach, setSearch] = useState({
    status: "",
    language: "",
  });
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="py-4 px-5 min-w-[300px] bg-white">
      <div className="flex items-baseline gap-4">
        <Filter className="" />
        <h2 className="text-lg font-semibold mb-4">Lọc bài nộp</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Trạng thái:
          </label>
          <select
            className="px-3 py-1 rounded mt-2 ring-1 w-full focus:ring-blue-500"
            onChange={(e) => setSearch({ ...serach, status: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="Accepted">Đã chấp nhận</option>
            <option value="Wrong Answer">Kết quả sai</option>
            <option value="Compilation Error">Lỗi biên dịch</option>
            <option value="Pending">Đang chờ xử lý</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngôn ngữ:
          </label>
          <select
            className="px-3 py-1 rounded mt-2 ring-1 w-full focus:ring-blue-500"
            onChange={(e) => setSearch({ ...serach, language: e.target.value })}
          >
            <option value="">Tất cả</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
          </select>
        </div>
        <Button
          content="Lọc nộp bài"
          className="mt-4 py-2"
          onClick={() => {
            setSearchParams((prev) => {
              return {
                ...prev,
                status: serach.status,
                language: serach.language,
              };
            });
          }}
        />
      </div>
    </div>
  );
}
