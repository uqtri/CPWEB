import CategoryCard from "./components/CategoryCard";
import { Button } from "@/ui/Button";
import { useState } from "react";
import CreateAndUpdateCategoryModal from "./partials/CreateAndUpdateCategoryModal/CreateAndUpdateCategoryModal";
import type { Category } from "@/types/category";
import { useCategory } from "@/hooks/useCategory";

export default function Category() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingCategory] = useState<Category | null>(null);

  const { getCategoryListQuery } = useCategory();
  const data = getCategoryListQuery.data || [];

  return (
    <div className="w-full px-10 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-10">Quản lí các dạng bài tập</h1>
        <Button
          content="Thêm dạng bài mới"
          onClick={() => {
            setIsOpenModal(true);
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data?.map((category) => {
          return (
            <CategoryCard
              category={category}
              // setEditingCategory={setEditingCategory}
            />
          );
        })}
      </div>
      {/* Modal for creating new category */}
      {isOpenModal && (
        <CreateAndUpdateCategoryModal
          category={editingCategory}
          callback={() => {
            setIsOpenModal(false);
          }}
        />
      )}
    </div>
  );
}
