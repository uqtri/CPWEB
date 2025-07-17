import { useContestRegistration } from "@/hooks/useContestRegistration";
import ContestCard from "../../Components/ContestCard/ContestCard";
import { useAppStore } from "@/store";

export default function ContestList({ contests }: { contests: any[] }) {
  const user = useAppStore((state) => state.user);

  const { getRegisteredContestsByUserIdQuery } = useContestRegistration({
    userId: user?.id,
  });
  console.log("FETCH REGISTER CONTESTS");
  // console.log(getRegisteredContestsByUserIdQuery?.data, user?.id, "!@");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {contests?.map((contest: any) => {
        const isRegistered = getRegisteredContestsByUserIdQuery?.data?.some(
          (registeredContest: any) => registeredContest.contestId === contest.id
        );

        return <ContestCard contest={contest} isRegistered={isRegistered} />;
      })}
    </div>
  );
}
