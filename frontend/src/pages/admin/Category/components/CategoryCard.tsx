import { Category } from "@/types/category";
import { Edit, Trash } from "lucide-react";

export default function CategoryCard({ category }: { category: Category }) {
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
            // Handle edit action
            console.log(`Edit category: ${category.name}`);
          }}
        />
      </div>
      <div className="flex justify-between"></div>
    </div>
  );
}
