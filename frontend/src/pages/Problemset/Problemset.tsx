import { useCategory } from "@/hooks/useCategory";
import { useProblem } from "@/hooks/useProblem";
import { useAppStore } from "@/store";
import { Category } from "@/types/category";
import { Problem } from "@/types/problem";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/ui/Table";
import { Select, Slider, Pagination } from "antd";

import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
const difficulty = [
  { label: "Tất cả", value: "" },
  { label: "Dễ", value: "Dễ" },
  { label: "Trung bình", value: "Trung bình" },
  { label: "Khó", value: "Khó" },
];
const size = 10;
export default function Problemset() {
  const [query, setSearchQuery] = useSearchParams();
  const navigate = useNavigate();
  const { getProblemListQuery } = useProblem({ params: query.toString() });
  const { getCategoryListQuery } = useCategory();
  const problems = getProblemListQuery?.data?.problems || [];
  const categories = getCategoryListQuery?.data || [];
  const user = useAppStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    difficulty: "",
    categories: [],
    pointRange: [0, 500],
    hideSolved: false,
    userId: null,
    page: 1,
    limit: size,
  });
  useEffect(() => {
    if (user) {
      setSearchTerm((prev) => ({
        ...prev,
        userId: user?.id,
      }));
    }
  }, [user]);

  const handleSeachProblems = () => {
    const query: any = {};
    if (searchTerm.title) {
      query.title = searchTerm.title;
    }
    if (searchTerm.difficulty) {
      query.difficulty = searchTerm.difficulty;
    }
    if (searchTerm.categories.length > 0) {
      query.categories = searchTerm.categories;
    }
    if (searchTerm.pointRange) {
      query.pointRange = searchTerm.pointRange.join(",");
    }
    if (searchTerm.hideSolved) {
      query.hideSolved = 1;
    }

    if (searchTerm.userId) {
      query.userId = searchTerm.userId;
    }
    query.page = searchTerm.page;
    query.limit = searchTerm.limit;
    setSearchQuery(query);
  };
  return (
    <div className="mb-[100px] lg:mb-0">
      <p className="text-3xl font-semibold border-b pb-1">Các thử thách</p>
      <div className="flex flex-col lg:flex-row lg:gap-4 justify-center mt-4">
        <div className="grow order-2 lg:order-1 mt-10 lg:mt-0">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableCell>Tên bài</TableCell>
                <TableCell>Độ khó</TableCell>
                <TableCell>Điểm số</TableCell>
                <TableCell>Tình trạng</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems &&
                problems.map((value: Problem) => {
                  return (
                    // <Link to={`/problem/${value.id}`}>
                    <TableRow
                      key={value.id}
                      className="hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/problem/${value.slug}`);
                      }}
                    >
                      <TableCell className="font-bold py-4">
                        {value.title}
                      </TableCell>
                      <TableCell className="">{value.difficulty}</TableCell>
                      <TableCell className="py-4">{value?.points}</TableCell>
                      <TableCell className="py-4">
                        <CircleCheck color="hsl(221.2 83.2% 53.3%)" />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination
              className="flex items-center justify-center"
              total={getProblemListQuery?.data?.totalProblems || 0}
              pageSize={size}
              onChange={(page) => {
                setSearchTerm((prev) => ({
                  ...prev,
                  page: page,
                }));
                handleSeachProblems();
              }}
            />
          </div>
        </div>
        <div className="overflow-hidden order-1 lg:w-[300px] border border-gray-300 h-min rounded-md">
          <p className="text-lg font-light text-center text-white bg-primary py-1">
            Tìm kiếm thử thách
          </p>
          <div className="p-3 mt-4">
            <input
              type="text"
              placeholder="Tên bài tập..."
              className="border border-gray-500 outline-none rounded-md px-2 py-1 w-full"
              name="title"
              onChange={(e) => {
                setSearchTerm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <div className="mt-4">
              <input
                type="checkbox"
                id="hideSolvedProblems"
                onChange={() => {
                  setSearchTerm((prev) => ({
                    ...prev,
                    hideSolved: !prev.hideSolved,
                  }));
                }}
              />
              <label htmlFor="hideSolvedProblem"> Ẩn các bài đã giải</label>
            </div>
            <div className="mt-4">
              <label className="" htmlFor="category">
                Chọn dạng bài
              </label>
              <Select
                id="category"
                mode="multiple"
                style={{ width: "100%" }}
                onChange={(value) => {
                  setSearchTerm((prev) => ({
                    ...prev,
                    categories: value,
                  }));
                }}
                options={categories.map((category: Category) => {
                  return { label: category.name, value: category.name };
                })}
              />
            </div>
            <div className="mt-4">
              <label className="" htmlFor="category">
                Chọn độ khó
              </label>
              <Select
                id="difficulty"
                defaultValue={"Tất cả"}
                style={{ width: "100%" }}
                onChange={(value) => {
                  setSearchTerm((prev) => ({
                    ...prev,
                    difficulty: value,
                  }));
                }}
                options={difficulty}
              />
            </div>
            <div className="mt-4">
              <label className="" htmlFor="point-range">
                Chọn điểm
              </label>
              <Slider
                range
                defaultValue={[0, 500]}
                max={500}
                min={0}
                onChange={(e) => {
                  setSearchTerm((prev) => ({
                    ...prev,
                    pointRange: e,
                  }));
                }}
              />
            </div>
            <button
              className="text-primary border border-primary rounded-md px-4 py-2 mt-4 w-full cursor-pointer"
              onClick={handleSeachProblems}
            >
              Tìm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
