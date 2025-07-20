import { Link } from "react-router-dom";
import ContestCard from "../../../../components/ContestCard/ContestCard";
import { Button } from "@/ui/Button";

export default function Contest() {
  return (
    <div className="contest-section p-5 lg:p-10 mt-10 shadow-lg rounded-xl">
      <p className="text-4xl text-center font-bold">Cuộc thi nổi bật</p>
      <p className="text-center text-gray-500 font-medium mt-2">
        Tham gia các cuộc thi lập trình để thử thách bản thân, nâng cao kỹ năng
        và cơ hội thắng giải thưởng hấp dẫn.
      </p>
      <div className="contests grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-4">
        <ContestCard
          status="Đang diễn ra"
          title="CodeForge Cup 2025"
          startTime="25/04/2025 12:00AM"
          endTime="25/04/2025 13:00AM"
          description="Cuộc thi lập trình CodeForge Cup 2025 là một trong những cuộc thi lớn nhất trong năm 2025 với sự tham gia của hàng ngàn lập trình viên trên toàn thế giới. Cuộc thi sẽ diễn ra trong vòng 24 giờ và các thí sinh sẽ phải giải quyết các bài toán lập trình khó khăn nhất để giành chiến thắng."
          difficulty="Khó"
          participants={1000}
          options={{ showButton: true }}
        />
        <ContestCard
          status="Đang diễn ra"
          title="CodeForge Cup 2025"
          startTime="25/04/2025 12:00AM"
          endTime="25/04/2025 13:00AM"
          description="Cuộc thi lập trình CodeForge Cup 2025 là một trong những cuộc thi lớn nhất trong năm 2025 với sự tham gia của hàng ngàn lập trình viên trên toàn thế giới. Cuộc thi sẽ diễn ra trong vòng 24 giờ và các thí sinh sẽ phải giải quyết các bài toán lập trình khó khăn nhất để giành chiến thắng."
          difficulty="Khó"
          participants={1000}
          options={{ showButton: true }}
        />
        <ContestCard
          status="Đang diễn ra"
          title="CodeForge Cup 2025"
          startTime="25/04/2025 12:00AM"
          endTime="25/04/2025 13:00AM"
          description="Cuộc thi lập trình CodeForge Cup 2025 là một trong những cuộc thi lớn nhất trong năm 2025 với sự tham gia của hàng ngàn lập trình viên trên toàn thế giới. Cuộc thi sẽ diễn ra trong vòng 24 giờ và các thí sinh sẽ phải giải quyết các bài toán lập trình khó khăn nhất để giành chiến thắng."
          difficulty="Khó"
          participants={1000}
          options={{ showButton: true }}
        />
        <ContestCard
          status="Đang diễn ra"
          title="CodeForge Cup 2025"
          startTime="25/04/2025 12:00AM"
          endTime="25/04/2025 13:00AM"
          description="Cuộc thi lập trình CodeForge Cup 2025 là một trong những cuộc thi lớn nhất trong năm 2025 với sự tham gia của hàng ngàn lập trình viên trên toàn thế giới. Cuộc thi sẽ diễn ra trong vòng 24 giờ và các thí sinh sẽ phải giải quyết các bài toán lập trình khó khăn nhất để giành chiến thắng."
          difficulty="Khó"
          participants={1000}
          options={{ showButton: true }}
        />
      </div>
      <div className="mt-6 p-4 font-bold flex">
        <Link to={"/contest"} className="mx-auto">
          <Button content="Tham gia tất cả cuộc thi" />
        </Link>
      </div>
    </div>
  );
}
