import useUser from "@/hooks/useUser";
import { ChangeEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import UserAvatar from "@/assets/user.png";
import { Pagination } from "antd";
import { getUsersByUsername } from "@/api/user.api";
import { u } from "framer-motion/client";
const size = 10;
export default function Leaderboard() {
  const [searchUsername, setSearchUsername] = useState("");
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [page, setPage] = useState(parseInt(query.get("page") || "1") || 1);
  const [usersFound, setUsersFound] = useState<any[]>([]);
  const { getAllUsersQuery } = useUser({
    params: `limit=${size}&page=${page}`,
  });
  const users = getAllUsersQuery.data?.users || [];
  const handleChangeSearchUsername = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const username = e.target.value;
    if (username === "") {
      setUsersFound([]);
      return;
    }
    try {
      const data = await getUsersByUsername(username);
      setUsersFound(data);
    } catch (error) {
      // console.log(error);
    }
  };
  console.log(usersFound, "usersFound");
  return (
    <div className="rounded-xl relative max-w-screen-xl mx-auto">
      <div>
        <p className="text-4xl text-center font-bold">Bảng xếp hạng</p>
        <p className="text-center text-gray-500 font-medium mt-2">
          Vinh danh những lập trình viên xuất sắc nhất trên CodeForge với thành
          tích đáng nể.
        </p>
        <div className="flex justify-end flex-col">
          <div className="relative">
            <label className="block w-fit mb-2 text-lg font-medium text-gray-700">
              Tìm kiếm theo username
            </label>
            <input
              className="px-2 py-1 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={handleChangeSearchUsername}
            />
          </div>
          <div className="users-found relative">
            {usersFound.length > 0 && (
              <div className="absolute top-0 right-0 bg-white shadow-lg rounded-lg mt-2 w-full z-10">
                <ul className="">
                  {usersFound.map((user: any) => (
                    <li
                      key={user.id}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/profile/${user.id}`);
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatarUrl || UserAvatar}
                          alt={user.username}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="ml-3">{user.username}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto mt-10 border border-gray-500 rounded-lg mb-4">
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
            {users.map((user: any, index: number) => (
              <tr
                key={user.id}
                className="table-row hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">
                    #{(page - 1) * size + index + 1}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="flex items-center cursor-pointer"
                    onClick={() => {
                      navigate(`/profile/${user?.id}`);
                    }}
                  >
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={user?.avatarUrl || UserAvatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{user.username}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold">
                    {user?.points?.toLocaleString()}
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

        <Pagination
          className="flex items-center justify-center"
          pageSize={size}
          onChange={(page) => {
            setPage(page);
          }}
          total={getAllUsersQuery?.data?.totalUsers}
        />
      </div>
    </div>
  );
}
