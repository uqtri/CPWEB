import { useAppStore } from "../../store/index";
import ProfileHeader from "./Partials/ProfileHeader/ProfileHeader";
import Bio from "./Partials/Bio/Bio";
import Activity from "./Partials/Activity/Activity";
import useUser from "@/hooks/useUser";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "@/Layout/404NotFound/404NotFound";

import { toast } from "react-toastify";

export default function Profile() {
  const params = useParams();

  const currentUser = useAppStore((state) => state.user);
  const isUserLoading = useAppStore((state) => state.isUserLoading);
  const navigate = useNavigate();
  const { getUserByIdQuery } = useUser({ userId: parseInt(params?.userId!) });

  const fetchingUser = getUserByIdQuery;
  if (
    params?.userId &&
    !fetchingUser.isLoading &&
    fetchingUser?.data === null
  ) {
    return <NotFound />;
  }
  console.log(isUserLoading, currentUser);
  if (!isUserLoading && !params?.userId && currentUser === null) {
    toast.error("Bạn cần đăng nhập để xem trang cá nhân.");
    navigate("/login");
  }
  return (
    <div className="items-center justify-center min-h-screen max-w-screen-xl mx-auto">
      <ProfileHeader
        user={params?.userId ? fetchingUser.data : currentUser}
        canEdit={params?.userId ? false : true}
      />
      <Bio user={params?.userId ? fetchingUser.data : currentUser} />
      <Activity user={params?.userId ? fetchingUser.data : currentUser} />
    </div>
  );
}
