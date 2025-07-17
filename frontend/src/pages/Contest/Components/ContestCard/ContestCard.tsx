import { Contest } from "@/types/contest";
import { cn } from "@/lib/utils";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/ui/Button";
import { useContestRegistration } from "@/hooks/useContestRegistration";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function getStatusColor(status: string) {
  switch (status) {
    case "upcoming":
      return "bg-amber-300 text-gray-800";
    case "ongoing":
      return "bg-green-300 text-gray-800";
    case "ended":
      return "bg-gray-300 text-gray-600";
    default:
      return "";
  }
}
function getStatusText(status: string) {
  switch (status) {
    case "upcoming":
      return "Sắp diễn ra";
    case "ongoing":
      return "Đang diễn ra";

    case "ended":
      return "Đã kết thúc";
    default:
      return "Chưa bắt đầu";
  }
}
export default function ContestCard({
  contest,
  options,
  isRegistered,
}: {
  contest: Contest;
  isRegistered?: boolean;
  options?: any;
}) {
  const { registerContestMutation } = useContestRegistration({
    contestId: contest?.id,
  });
  const status =
    new Date(contest?.startTime) > new Date()
      ? "upcoming"
      : new Date(contest?.endTime) < new Date()
      ? "ended"
      : "ongoing";
  const handleRegister = async () => {
    if (isRegistered) return;
    try {
      await registerContestMutation.mutateAsync(contest.id);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      toast.error("Đăng ký thất bại, vui lòng thử lại sau.");
    }
  };
  return (
    <div className="border border-gray-200 rounded-t-lg overflow-hidden shadow-lg">
      <div className={cn("py-2 text-center", getStatusColor(status))}>
        {" "}
        {getStatusText(status)}
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{contest?.title}</h2>
        <p className="text-gray-600 mb-1 line-clamp-2 min-h-[60px]">
          {contest?.description}
        </p>
        <div className="flex flex-col justify-between">
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-3">
            <Calendar />
            <span className="font-semibold">Bắt đầu:</span>{" "}
            {new Date(contest?.startTime).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-3">
            <Clock />
            <span className="font-semibold">Kết thúc:</span>{" "}
            {new Date(contest?.endTime).toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-3">
            <Users />
            <span className="font-semibold">
              Số người tham gia: {contest?.participants?.length || 0}
            </span>{" "}
            {/* {|| 0} */}
          </div>
        </div>
        <div>
          {status === "ended" && (
            <Button content="Xem chi tiết" className="w-full mt-4" />
          )}
          {status === "ongoing" &&
            (isRegistered ? (
              <Link to={`/contest/${contest.slug}`}>
                <Button
                  content="Tham gia ngay"
                  // onClick={handleRegister}
                  className="w-full mt-4"
                />
              </Link>
            ) : (
              <Button
                content="Đăng ký ngay"
                onClick={handleRegister}
                className="w-full mt-4"
              />
            ))}
          {status === "upcoming" &&
            (isRegistered ? (
              <Button content="Đã Đăng ký" className={`w-full mt-4`} />
            ) : (
              <Button
                content="Đăng ký ngay"
                onClick={handleRegister}
                className={`w-full mt-4`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
