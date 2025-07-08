import { useProblem } from "@/hooks/useProblem";
import { useTestCase } from "@/hooks/useTestCases";
import { Problem } from "@/types/problem";
import { Button } from "@/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
import { Newspaper, Settings } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function TestCaseDetail() {
  const params = useParams();

  const slug = params.problemSlug as string;
  const { getProblemBySlugQuery } = useProblem({ slug: slug });
  const problem = getProblemBySlugQuery.data as Problem;

  const { getTestCaseByProblemSlugQuery } = useTestCase({
    slug: slug,
  });

  const testCasesData = getTestCaseByProblemSlugQuery.data || {};

  const { createTestCaseMutation } = useTestCase({
    problemId: problem?.id,
  });
  const handleUpload = async () => {
    const form = document.getElementById("test-cases-form") as HTMLFormElement;

    const formData = new FormData(form);

    if (!formData.has("test-cases")) {
      toast.error("Vui lòng chọn file zip để tải lên.");
      return;
    }
    try {
      await createTestCaseMutation.mutateAsync(formData);
      toast.success("Tải testcase lên thành công!");
    } catch (error) {
      console.error("Error in handleUpload:", error);
      toast.error("Tải testcase lên thất bại. Vui lòng thử lại sau.");
    }
  };
  return (
    <div className="p-10 w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="">
          <h1 className="text-2xl mb-4">
            Chỉnh sửa testcase cho bài{" "}
            <span className="font-bold">{`[${problem?.title}]`}</span>
          </h1>
          <p className="text-gray-500">
            Bạn có thể chỉnh sửa testcase cho bài tập này. Hãy chắc chắn rằng
            testcase của bạn là chính xác.
          </p>
        </div>
        <div>
          <Button content={"Lưu thay đổi"} onClick={handleUpload}></Button>
        </div>
      </div>
      <div className="p-4 bg-white rounded-md shadow-md">
        <h1 className="flex gap-4 font-semibold mb-5">
          <Settings />
          Chỉnh sửa testcase
        </h1>
        <div>
          <div>
            <h2 className="font-serif">Tải zip file lên</h2>
            <div className="flex items-center gap-4">
              <p className="p-3 rounded-md shadow-md bg-gray-100">
                Hiện tại:{" "}
                <span className="font-light">
                  {testCasesData?.testCases?.path || "default.zip"}
                </span>
              </p>
              <form id="test-cases-form" className="">
                <input
                  type="file"
                  accept=".zip"
                  id="test-cases"
                  name="test-cases"
                  className="border border-gray-300 rounded-md p-2 "
                />
              </form>
              <label
                htmlFor="test-cases"
                className="px-7 py-4 bg-primary text-white rounded-lg cursor-pointer shadow-md hover:bg-white hover:text-primary border-primary border transition-all duration-300"
              >
                Tải lên
              </label>
              <a
                href={
                  import.meta.env.VITE_BACKEND_URL +
                  "/test-cases/problemSlug/" +
                  slug +
                  "/download"
                }
              >
                <Button content="Tải zip file" className="px-7 py-4"></Button>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md rounded-lg mt-5 p-3">
        <h1 className="flex gap-4 font-semibold mb-4">
          <Newspaper />
          Danh sách testcase
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>STT</TableHead>
              <TableHead>Tên thư mục</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testCasesData?.directories?.map((testCase: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-semibold">{index + 1}</TableCell>
                <TableCell>
                  <span className="font-light">{testCase.name}</span>
                </TableCell>
                <TableCell>
                  <a
                    href={
                      import.meta.env.VITE_BACKEND_URL +
                      "/test-cases/problemSlug/" +
                      slug +
                      "/download" +
                      "/" +
                      index.toString()
                    }
                  >
                    <Button content={"Tải testcase"}></Button>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
