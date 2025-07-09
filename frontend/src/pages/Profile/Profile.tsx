import { useAppStore } from "../../store/index";
import { Calendar, Edit3, Mail, MapPin, Medal } from "lucide-react";
import ProfileHeader from "./Partials/ProfileHeader/ProfileHeader";
import Bio from "./Partials/Bio/Bio";
import Activity from "./Partials/Activity/Activity";

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

  return (
    <div className="items-center justify-center h-screen max-w-screen-xl mx-auto">
      <ProfileHeader user={user} />
      <Bio user={user} />
      <Activity user={user} />
    </div>
  );
}
