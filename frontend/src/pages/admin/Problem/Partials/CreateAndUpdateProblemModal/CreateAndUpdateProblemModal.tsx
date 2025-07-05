import { CreateProblemData, Problem, UpdateProblemData } from "@/types/problem";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useEscape } from "@/hooks/useEscape";
import { Button } from "@/ui/Button";
import { Select } from "antd";
import Preview from "./Partials/Preview";
import { useProblem } from "@/hooks/useProblem";
import { toast } from "react-toastify";
import { useCategory } from "@/hooks/useCategory";

export default function CreateAndUpdateProblemModal({
  problem,
  setModal,
}: {
  problem: Problem | null;
  setModal: () => void;
}) {
  useEscape(setModal);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState<CreateProblemData | UpdateProblemData>({
    title: "",
    content: "",
    executionTime: 0,
    memoryLimit: 0,
    points: 0,
    difficulty: "easy",
    categories: [],
  });
  useEffect(() => {
    console.log(problem);
    if (problem) {
      setData(problem);
      const initialCategories = problem.categories.map(
        (category) => category.name
      );
      setSelectedCategories(initialCategories);
    }
  }, [problem]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { createProblemMutation, updateProblemMutation } = useProblem({});
  const { getCategoryListQuery } = useCategory();
  const categories =
    getCategoryListQuery.data?.map((category) => ({
      label: category.name,
      value: category.name,
    })) || [];
  console.log(selectedCategories, "selectedCategories");
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    console.log(name, value, type, "name, value, type");
    // console.log(name, value, "name, value");
    console.log(type, "type @@");
    setData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };
  console.log(data);
  return (
    <div className="modal-overlay flex items-center justify-center">
      <form
        id="create-update-problem-form"
        className="bg-white p-6 rounded shadow-lg w-[80%]"
      >
        <div className="modal-content w-[100%] ">
          <h2 className="text-2xl font-bold mb-4">
            {problem ? "Cập nhật bài tập" : "Tạo bài tập mới"}
          </h2>
          <div className="mb-4">
            <label className="block text-xl font-medium mb-2">Tiêu đề</label>
            <input
              name="title"
              type="text"
              className="w-full p-2 border rounded"
              required
              minLength={5}
              defaultValue={data.title}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-xl font-medium mb-2">Điểm số</label>
              <input
                name="points"
                type="number"
                defaultValue={data.points}
                className="w-full p-2 border rounded"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">
                Thời gian chạy
              </label>
              <input
                type="number"
                name="executionTime"
                className="w-full p-2 border rounded"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">Bộ nhớ</label>
              <input
                type="number"
                name="memoryLimit"
                className="w-full p-2 border rounded"
                required
                defaultValue={data.memoryLimit}
                onChange={handleChange}
                // defaultValue={problem ? problem.title : ""}
              />
            </div>
            <div>
              <label className="block text-xl font-medium mb-2">Độ khó</label>
              <select
                className="w-full p-2 border rounded"
                required
                name="difficulty"
                defaultValue={data?.difficulty}
                onChange={handleChange}
                // defaultValue={problem ? problem.title : ""}
              >
                <option value="Dễ">Dễ</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Khó">Khó</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xl font-medium mb-4">Dạng bài tập</label>
            <Select
              id="categories"
              className="w-full h-[40px]"
              mode="multiple"
              value={selectedCategories}
              onChange={(value) => {
                setSelectedCategories(value as string[]);
                setData((prev) => ({
                  ...prev,
                  categories: value.map((category) => ({
                    name: category,
                    description: "",
                  })),
                }));
              }}
              options={categories}
            />
          </div>
          <textarea
            name="content"
            defaultValue={data.content}
            className="w-[100%] border-1 border-gray-300 text-lg max-h-[300px]"
            rows={10}
            onChange={handleChange}
          />
          <div className="mt-5 gap-4 flex justify-end">
            <Button
              content={"Xem trước"}
              onClick={(e) => {
                e.preventDefault();
                setIsOpenPreview(true);
              }}
            ></Button>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                try {
                  if (problem) {
                    await updateProblemMutation.mutateAsync({
                      id: problem.id,
                      data: data as UpdateProblemData,
                    });
                    toast.success("Cập nhật bài tập thành công");
                  } else {
                    await createProblemMutation.mutateAsync(
                      data as CreateProblemData
                    );
                    toast.success("Tạo bài tập thành công");
                  }
                  setModal();
                } catch (error) {
                  console.log(error);
                  if (problem) {
                    toast.error("Cập nhật bài tập thất bại");
                  } else {
                    toast.error("Tạo bài tập thất bại");
                  }
                }
              }}
              content={problem ? "Cập nhật" : "Tạo mới"}
            ></Button>
          </div>
        </div>
      </form>
      {/* Preview */}
      {isOpenPreview && (
        <Preview callback={() => setIsOpenPreview(false)} problem={data} />
      )}
    </div>
  );
}
