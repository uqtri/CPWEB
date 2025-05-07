import { Select, Tag, Slider } from "antd";
import type { SelectProps } from "antd";
import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
const categories: SelectProps["options"] = [
  { value: "Dynamic programming" },
  { value: "Adhoc" },
  { value: "Hình học" },
  { value: "Số học" },
];

const problemset: any[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    acceptance: 49.7,
    submissions: 13829734,
    solved: true,
    attempted: true,
    slug: "two-sum",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    tags: ["Linked List", "Math", "Recursion"],
    acceptance: 38.6,
    submissions: 7283921,
    solved: false,
    attempted: true,
    slug: "add-two-numbers",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: 33.8,
    submissions: 6192837,
    solved: false,
    attempted: false,
    slug: "longest-substring-without-repeating-characters",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: 35.2,
    submissions: 2938472,
    solved: false,
    attempted: false,
    slug: "median-of-two-sorted-arrays",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    tags: ["String", "Dynamic Programming"],
    acceptance: 32.4,
    submissions: 3204958,
    solved: false,
    attempted: false,
    slug: "longest-palindromic-substring",
  },
  {
    id: 6,
    title: "Reverse Integer",
    difficulty: "easy",
    tags: ["Math"],
    acceptance: 26.9,
    submissions: 6293847,
    solved: true,
    attempted: true,
    slug: "reverse-integer",
  },
  {
    id: 7,
    title: "String to Integer (atoi)",
    difficulty: "medium",
    tags: ["String", "Math"],
    acceptance: 16.6,
    submissions: 3847593,
    solved: false,
    attempted: false,
    slug: "string-to-integer-atoi",
  },
  {
    id: 8,
    title: "Palindrome Number",
    difficulty: "easy",
    tags: ["Math"],
    acceptance: 53.3,
    submissions: 2938475,
    solved: true,
    attempted: true,
    slug: "palindrome-number",
  },
  {
    id: 9,
    title: "Container With Most Water",
    difficulty: "medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    acceptance: 54.1,
    submissions: 1293847,
    solved: false,
    attempted: true,
    slug: "container-with-most-water",
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptance: 28.2,
    submissions: 1039485,
    solved: false,
    attempted: false,
    slug: "regular-expression-matching",
  },
  {
    id: 1,
    title: "Two Sum",
    difficulty: "easy",
    tags: ["Array", "Hash Table"],
    acceptance: 49.7,
    submissions: 13829734,
    solved: true,
    attempted: true,
    slug: "two-sum",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "medium",
    tags: ["Linked List", "Math", "Recursion"],
    acceptance: 38.6,
    submissions: 7283921,
    solved: false,
    attempted: true,
    slug: "add-two-numbers",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: 33.8,
    submissions: 6192837,
    solved: false,
    attempted: false,
    slug: "longest-substring-without-repeating-characters",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "hard",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: 35.2,
    submissions: 2938472,
    solved: false,
    attempted: false,
    slug: "median-of-two-sorted-arrays",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "medium",
    tags: ["String", "Dynamic Programming"],
    acceptance: 32.4,
    submissions: 3204958,
    solved: false,
    attempted: false,
    slug: "longest-palindromic-substring",
  },
  {
    id: 6,
    title: "Reverse Integer",
    difficulty: "easy",
    tags: ["Math"],
    acceptance: 26.9,
    submissions: 6293847,
    solved: true,
    attempted: true,
    slug: "reverse-integer",
  },
  {
    id: 7,
    title: "String to Integer (atoi)",
    difficulty: "medium",
    tags: ["String", "Math"],
    acceptance: 16.6,
    submissions: 3847593,
    solved: false,
    attempted: false,
    slug: "string-to-integer-atoi",
  },
  {
    id: 8,
    title: "Palindrome Number",
    difficulty: "easy",
    tags: ["Math"],
    acceptance: 53.3,
    submissions: 2938475,
    solved: true,
    attempted: true,
    slug: "palindrome-number",
  },
  {
    id: 9,
    title: "Container With Most Water",
    difficulty: "medium",
    tags: ["Array", "Two Pointers", "Greedy"],
    acceptance: 54.1,
    submissions: 1293847,
    solved: false,
    attempted: true,
    slug: "container-with-most-water",
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "hard",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptance: 28.2,
    submissions: 1039485,
    solved: false,
    attempted: false,
    slug: "regular-expression-matching",
  },
];
// const fields = []
export default function Problemset() {
  const navigate = useNavigate();
  return (
    <div className="mt-[62px] px-10 py-5 lg:py-5 lg:px-10">
      <p className="text-3xl font-semibold border-b pb-1">Problemset</p>
      <div className="flex flex-col lg:flex-row lg:gap-4 justify-center mt-4">
        <div className="grow order-2 lg:order-1 sm:mt-10 lg:mt-0">
          <table className="w-full">
            <thead>
              <tr className="font-light bg-gray-100 uppercase text-gray-400 text-lg">
                <td className="py-2">Title</td>
                <td className="py-2">Difficulty</td>
                <td className="py-2">Points</td>
                <td className="py-2">Status</td>
              </tr>
            </thead>
            <tbody>
              {problemset &&
                problemset.map((value, index) => {
                  return (
                    // <Link to={`/problem/${value.id}`}>
                    <tr
                      className="hover:bg-gray-100 bg-white hover:cursor-pointer"
                      onClick={() => {
                        navigate(`/problem/${value.id}`);
                      }}
                    >
                      <td className="font-bold py-4">{value.title}</td>
                      <td className="py-4 capitalize">{value.difficulty}</td>
                      <td className="py-4">{index + 50}</td>
                      <td className="py-4">
                        <CircleCheck color="hsl(221.2 83.2% 53.3%)" />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="overflow-hidden order-1 lg:w-[300px] border border-gray-300 h-min rounded-md">
          <p className="text-lg font-light text-center text-white bg-primary py-1">
            Problem Search
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
                options={categories}
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
            <a href="/problemset">
              <button className="text-primary border border-primary rounded-md px-4 py-2 mt-4 w-full cursor-pointer">
                Go
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
