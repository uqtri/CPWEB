import { Category } from "@/types/category";
import { Edit, Trash } from "lucide-react";
import CreateAndUpdateCategoryModal from "../partials/CreateAndUpdateCategoryModal/CreateAndUpdateCategoryModal";
import { useState } from "react";

export default function CategoryCard({ category }: { category: Category }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div className="bg-white px-4 py-4 shadow-md rounded-lg">
      <h1 className="text-xl font-medium mb-4">{category.name}</h1>
      <p className="h-0.5 bg-gray-200 mb-4"></p>
      <p className="mb-4">{category.description}</p>
      <div className="flex justify-end">
        <Trash
          size={20}
          className="text-red-500 cursor-pointer mr-4"
          onClick={() => {
            // Handle delete action
            console.log(`Delete category: ${category.name}`);
          }}
        />
        <Edit
          size={20}
          className="text-blue-500 cursor-pointer"
          onClick={() => {
            setIsOpenModal(true);
          }}
        />
      </div>
      {/* Modal for creating or updating category */}
      {isOpenModal && (
        <CreateAndUpdateCategoryModal
          category={category}
          callback={() => {
            setIsOpenModal(false);
          }}
        />
      )}
    </div>
  );
}
