import { useCategory } from "@/hooks/useCategory";
import { useEscape } from "@/hooks/useEscape";
import {
  Category,
  CreateCategoryData,
  UpdateCategoryData,
} from "@/types/category";
import { Button } from "@/ui/Button";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateAndUpdateCategoryModal({
  category,
  callback,
}: {
  category: Category | null;
  callback: () => void;
}) {
  const [data, setData] = useState<UpdateCategoryData | CreateCategoryData>({
    name: category ? category.name : "",
    description: category ? category.description : "",
  });
  useEscape(callback);

  const { updateCategoryMutation, createCategoryMutation } = useCategory();
  const handleCreateAndUpdate = async () => {
    try {
      if (category) {
        await updateCategoryMutation.mutateAsync({
          id: category.id,
          data,
        });
        toast.success("Cập nhật dạng bài tập thành công");
      } else {
        await createCategoryMutation.mutateAsync(data);
        toast.success("Tạo dạng bài tập thành công");
      }
      setData({
        name: "",
        description: "",
      });
      callback();
    } catch (error) {
      toast.error(
        category
          ? "Cập nhật dạng bài tập thất bại"
          : "Tạo dạng bài tập thất bại"
      );
    }
  };
  return (
    <div className="modal-overlay flex items-center justify-center">
      <form className="modal-content bg-white p-6 min-w-[500px]">
        <h2 className="text-2xl font-bold mb-4">
          {category ? "Cập nhật dạng bài tập" : "Tạo dạng bài tập mới"}
        </h2>
        <div className="mb-4">
          <label className="block text-xl font-medium mb-2">
            Tên dạng bài tập
          </label>
          <input
            name="name"
            type="text"
            className="w-full p-2 border rounded"
            defaultValue={category ? category.name : ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
            minLength={3}
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl font-medium mb-2">Mô tả</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded max-h-[500px]"
            defaultValue={category ? category.description : ""}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            rows={4}
            minLength={10}
            required
          />
        </div>
        <div className="mt-5 gap-4 flex justify-end">
          <Button
            content="Đóng"
            onClick={(e) => {
              e.preventDefault();
              callback();
            }}
          ></Button>
          <Button
            content={category ? "Cập nhật" : "Tạo mới"}
            onClick={(e) => {
              e.preventDefault();
              handleCreateAndUpdate();
            }}
          ></Button>
        </div>
      </form>
    </div>
  );
}
