import React from "react";
import { Calendar, Code, Edit3, Mail, MapPin, Medal } from "lucide-react";

export default function ProfileHeader({ user }: { user: any }) {
  return (
    <div className="rounded-xl relative max-w-screen-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={user?.avatar}
                alt={user?.fullName}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <Edit3 className="w-4 h-4 text-gray-600" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left text-white">
              <h1 className="text-3xl font-bold mb-2">
                {user?.fullName || "Chưa có tên"}
              </h1>
              <p className="text-xl text-blue-100 mb-4">@{user?.username}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-blue-100">{user?.location}</span>
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

            <div className="text-center">
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
    </div>
  );
}
