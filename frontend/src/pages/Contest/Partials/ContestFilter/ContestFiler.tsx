import { Search } from "lucide-react";

export default function ContestFiler() {
  return (
    <div className="p-4">
      <div className="flex items-center">
        <Search />
        <input
          type="text"
          placeholder="Tìm kiếm kì thi..."
          className="ml-2 p-2 border rounded"
        />
      </div>
      <div></div>
    </div>
  );
}
