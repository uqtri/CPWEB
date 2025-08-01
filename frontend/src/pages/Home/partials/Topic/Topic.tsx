import ClassificationCard from "../../../../components/ClassificationCard/ClassificationCard";
import { Sigma } from "lucide-react";
// import { BG_COLORS } from "@/constants/color";
export default function Topic() {
  return (
    <div className="topic-section p-5 lg:p-10 mt-10 shadow-lg rounded-xl">
      <p className="text-4xl text-center font-bold">Khám Phá Các Chủ Đề</p>
      <p className="text-center text-gray-500 font-medium mt-2">
        Luyện tập và cải thiện kỹ năng của bạn với hàng trăm bài tập được chia
        thành các chủ đề khác nhau.
      </p>
      <div className="topics grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <ClassificationCard
          title="Cài đặt cơ bản"
          description="Mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị, bảng băm, và nhiều hơn nữa."
          numberOfProblems={125}
          icon={<Sigma size={30} className="rounded-full" />}
          color="blue"
          tags={[
            "Mảng",
            "Danh sách liên kết",
            "Ngăn xếp",
            "Hàng đợi",
            "Cây nhị phân",
            "Đồ thị",
          ]}
          link="/"
        />
        <ClassificationCard
          title="Cấu trúc dữ liệu"
          description="Mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị, bảng băm, và nhiều hơn nữa."
          numberOfProblems={125}
          icon={<Sigma size={30} className="rounded-full" />}
          color="blue"
          tags={["Quy hoạch động", "Chặt nhị phân", "Chặt tam phân"]}
          link="/"
        />
        <ClassificationCard
          title="Xử lí xâu"
          description="Mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị, bảng băm, và nhiều hơn nữa."
          numberOfProblems={125}
          icon={<Sigma size={30} className="rounded-full" />}
          color="blue"
          tags={[
            "Xử lí xâu",
            "Cài đặt cơ bản",
            "Hai con trỏ",
            "Đồ thị",
            "BFS",
            "DFS",
          ]}
          link="/"
        />
        <ClassificationCard
          title="Đồ thị"
          description="Mảng, danh sách liên kết, ngăn xếp, hàng đợi, cây, đồ thị, bảng băm, và nhiều hơn nữa."
          numberOfProblems={125}
          icon={<Sigma size={30} className="rounded-full" />}
          color="blue"
          tags={[
            "Mảng",
            "Danh sách liên kết",
            "Ngăn xếp",
            "Hàng đợi",
            "Cây nhị phân",
            "Đồ thị",
          ]}
          link="/"
        />
      </div>
    </div>
  );
}
