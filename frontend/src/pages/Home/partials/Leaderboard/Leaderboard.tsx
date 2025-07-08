import RankingCard from "../../components/RankingCard/RankingCard";
import { Trophy } from "lucide-react";
type User = {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  solved: number;
  streak: number;
  badge?: string;
};
const users: User[] = [
  {
    id: 4,
    name: "Phạm Thanh Dung",
    avatar: "https://i.pravatar.cc/150?img=9",
    score: 8932,
    rank: 4,
    solved: 417,
    streak: 56,
  },
  {
    id: 5,
    name: "Hoàng Văn Em",
    avatar: "https://i.pravatar.cc/150?img=4",
    score: 8754,
    rank: 5,
    solved: 398,
    streak: 92,
  },
  {
    id: 6,
    name: "Đỗ Thị Phương",
    avatar: "https://i.pravatar.cc/150?img=8",
    score: 8621,
    rank: 6,
    solved: 376,
    streak: 45,
  },
  {
    id: 7,
    name: "Vũ Quang Huy",
    avatar: "https://i.pravatar.cc/150?img=2",
    score: 8435,
    rank: 7,
    solved: 362,
    streak: 72,
  },
];
export default function Leaderboard() {
  return (
    <div className="contest-section mt-10 shadow-lg rounded-xl relative w-full">
      <div className="absolute top-0 right-0 w-[20%] h-[20%] filter bg-primary blur-xl opacity-30"></div>
      <p className="text-4xl text-center font-bold">Bảng xếp hạng</p>
      <p className="text-center text-gray-500 font-medium mt-2">
        Vinh danh những lập trình viên xuất sắc nhất trên CodeForge với thành
        tích đáng nể.
      </p>
      <div className="contests grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <RankingCard user="" color="yellow" ranking={1} icon={<Trophy />} />
        <RankingCard user="" color="green" ranking={2} icon={<Trophy />} />
        <RankingCard user="" color="primary" ranking={3} icon={<Trophy />} />
      </div>
      <div className="overflow-x-auto mt-10 border border-gray-500 rounded-lg">
        <table className="w-full divide-gray-200 divide-y">
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thứ hạng
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Người dùng
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số điểm
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Đã giải
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Chuỗi ngày
            </th>
          </tr>
          {users.map((user, index) => (
            <tr key={user.id} className="table-row hover:bg-gray-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium">#{user.rank}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium">{user.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-bold">
                  {user.score.toLocaleString()}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">{user.solved} bài</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm ">{user.streak} ngày</div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
