import { useCategory } from "@/hooks/useCategory";
import { useProblem } from "@/hooks/useProblem";
import { Category } from "@/types/category";
import { Problem } from "@/types/problem";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/ui/Table";
import { Select, Tag, Slider } from "antd";
import type { SelectProps } from "antd";
import { get } from "http";
import { CircleCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Problemset() {
  const navigate = useNavigate();
  const { getProblemListQuery } = useProblem({});
  const { getCategoryListQuery } = useCategory();
  const problems = getProblemListQuery?.data || [];
  const categories = getCategoryListQuery?.data || [];
  console.log(categories);
  return (
    <div className="mt-[62px] px-10 py-5 lg:py-5 lg:px-10">
      <p className="text-3xl font-semibold border-b pb-1">Các thử thách</p>
      <div className="flex flex-col lg:flex-row lg:gap-4 justify-center mt-4">
        <div className="grow order-2 lg:order-1 sm:mt-10 lg:mt-0">
          <Table>
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
                problems.map((value: Problem, index: number) => {
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
                      <TableCell className="py-4">{index + 50}</TableCell>
                      <TableCell className="py-4">
                        <CircleCheck color="hsl(221.2 83.2% 53.3%)" />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
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
            />
            <div className="mt-4">
              <input type="checkbox" id="hideSolvedProblems" />
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
                options={categories.map((category: Category) => {
                  return { label: category.name, value: category.name };
                })}
              />
            </div>
            <div className="mt-4">
              <label className="" htmlFor="point-range">
                Chọn điểm
              </label>
              <Slider
                range
                defaultValue={[0, 100]}
                onChange={(e) => {
                  console.log(e);
                }}
              />
            </div>
            <Link to="/problemset">
              <button className="text-primary border border-primary rounded-md px-4 py-2 mt-4 w-full cursor-pointer">
                Tìm
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
