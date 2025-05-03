import { useEffect, useState } from "react";
import { useAppStore } from "../../store/index";
type User = {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export default function Profile() {
  const user = useAppStore((state) => state.user);
  console.log("user", user);
  return (
    <div className="mt-[62px] flex flex-col items-center justify-center h-screen">
      {user && (
        <div>
          {" "}
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
