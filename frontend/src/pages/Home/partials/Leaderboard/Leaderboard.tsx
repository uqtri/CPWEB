import useUser from "@/hooks/useUser";
import RankingCard from "../../components/RankingCard/RankingCard";
import { Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/assets/user.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";
export default function Leaderboard() {
  const { getAllUsersQuery } = useUser({
    params: "limit=10",
  });
  const users = getAllUsersQuery?.data?.users || [];
  const navigate = useNavigate();
  return (
    <div className="contest-section p-5 lg:p-10 mt-10 shadow-lg rounded-xl relative w-full">
      <div className="absolute top-0 right-0 w-[20%] h-[20%] filter bg-primary blur-xl opacity-30"></div>
      <p className="text-4xl text-center font-bold">Bảng xếp hạng</p>
      <p className="text-center text-gray-500 font-medium mt-2">
        Vinh danh những lập trình viên xuất sắc nhất trên CodeForge với thành
        tích đáng nể.
      </p>
      <div className="contests grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <RankingCard
          user={users?.[0]}
          color="yellow"
          ranking={1}
          icon={<Trophy />}
        />
        <RankingCard
          user={users?.[1]}
          color="green"
          ranking={2}
          icon={<Trophy />}
        />
        <RankingCard
          user={users?.[2]}
          color="primary"
          ranking={3}
          icon={<Trophy />}
        />
      </div>
      <div className="overflow-x-auto mt-10 border border-gray-500 rounded-lg">
        <Table className="w-full divide-gray-200 divide-y">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thứ hạng
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Người dùng
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số điểm
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Đã giải
              </TableHead>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Chuỗi ngày
              </th> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(3).map((user: any, index: number) => (
              <TableRow
                key={user.id}
                className="table-row hover:bg-gray-50 transition"
              >
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">#{index + 4}</div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user?.id}`);
                    }}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={user?.avatarUrl || UserAvatar}
                        alt={user?.fullName}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">
                        {user?.username}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold">
                    {user?.points?.toLocaleString()}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">
                    {user?.solvedProblems?.length} bài
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  {/* <div className="text-sm ">{user.streak} ngày</div> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
