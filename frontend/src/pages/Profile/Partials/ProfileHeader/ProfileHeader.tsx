import { useState } from "react";
import { Calendar, Edit3, Mail, MapPin, Medal } from "lucide-react";
import { Button } from "@/ui/Button";
import UserAvatar from "@/assets/user.png";
import { useAppStore } from "@/store";
import { toast } from "react-toastify";
export default function ProfileHeader({
  user,
  canEdit,
}: {
  user: any;
  canEdit?: boolean;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const updateUser = useAppStore((state) => state.updateUser);

  return (
    <div className="rounded-xl relative max-w-screen-xl mx-auto w-full">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 w-full">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 w-full">
          <div className="flex flex-wrap md:flex-row items-center justify-between md:items-start space-y-6 md:space-y-0 md:space-x-8 w-full">
            <div className="relative">
              <img
                src={user?.avatarUrl || UserAvatar}
                alt={user?.fullName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {canEdit && (
                <div
                  className="absolute -bottom-1 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer"
                  onClick={() => setIsOpenModal(true)}
                >
                  <Edit3 className="w-4 h-4 text-gray-600" />
                </div>
              )}
            </div>
            <div className="flex-1 order-3 basis-[100%] lg:order-none lg:basis-auto text-white">
              <h1 className="text-3xl font-bold mb-2">
                {user?.fullName || "Chưa có tên"}
              </h1>
              <p className="text-xl text-blue-100 mb-4">@{user?.username}</p>

              <div className="flex flex-wrap justify-start gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-blue-100">
                    {user?.location || "Chưa có địa chỉ"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-blue-100">
                    Tham gia vào{" "}
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a
                  href={`mailto:${user?.email}`}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </a>
              </div>
            </div>

            <div className="text-center order-2 lg:order-none">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold`}
              >
                <Medal className="w-10 h-10 mr-2" />
                {user?.rank}
              </div>
              <div className="mt-4 text-white ">
                <div className="text-3xl font-bold">{user?.currentRating}</div>
                <div className="text-blue-200 text-2xl">Điểm số</div>
                <div className="text-blue-200 mt-1 text-2xl">
                  {user?.points}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 pt-2 pb-4 text-xl">
          <div className="text-center">
            <h1 className="">Số bài đã giải</h1>
            <p>123</p>
          </div>

          <div className="text-center">
            <h1>Số kì thi đã tham gia</h1>
            <p>123</p>
          </div>

          <div className="text-center">
            <h1>Xếp hạng</h1>
            <p>123</p>
          </div>
        </div>
      </div>

      {isOpenModal && (
        <div
          className="modal-overlay bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setIsOpenModal(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h2>
            <form id="edit-profile-form">
              <div className="mb-4">
                <input
                  type="file"
                  className="hidden"
                  id="avatar-upload"
                  accept=".png ,.jpg,.jpeg"
                />
                <label htmlFor="avatar-upload">
                  <img
                    id="avatar-preview"
                    src={user?.avatarUrl || UserAvatar}
                    alt={user?.fullName}
                    className="mx-auto w-[100px] h-[100px] rounded-full cursor-pointer"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đầy đủ
                </label>
                <input
                  type="text"
                  name="fullName"
                  defaultValue={user?.fullName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={user?.location}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Giới thiệu bản thân
                </label>
                <textarea
                  name="aboutMe"
                  defaultValue={user?.aboutMe}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  rows={4}
                ></textarea>
              </div>
            </form>
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => setIsOpenModal(false)}
                content="Đóng"
              ></Button>
              <Button
                className=""
                content="Lưu thay đổi"
                onClick={async () => {
                  setIsOpenModal(false);
                  const formElement = document.querySelector(
                    "#edit-profile-form"
                  ) as HTMLFormElement;
                  const formData = new FormData(formElement);
                  await updateUser(formData);
                  toast.success("Cập nhật thông tin thành công!");
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
