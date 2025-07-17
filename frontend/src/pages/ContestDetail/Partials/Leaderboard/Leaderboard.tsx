import { useContest } from "@/hooks/useContest";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/Table";

export default function Leaderboard({
  problems,
  contestSlug,
}: {
  problems?: any[];
  contestSlug?: string;
}) {
  problems = problems?.map((problem) => problem?.problem) || [];

  const { getLeaderboardQuery } = useContest({ slug: contestSlug });
  // console.log("getLeaderboardQuery@", getLeaderboardQuery?.data);
  const leaderboard = getLeaderboardQuery?.data || [];
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Xếp hạng</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Penalty</TableHead>
            {problems.map((problem, index) => (
              <TableHead key={problem?.id}>
                {String.fromCharCode(65 + index)}
              </TableHead>
            ))}
            <TableHead>Tổng điểm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard?.map((value: any, index: number) => {
            return (
              <TableRow key={value?.user?.id}>
                <TableCell className="">{index + 1}</TableCell>
                <TableCell className="">{value?.user?.username}</TableCell>
                <TableCell className="">{value?.penalty || 0}</TableCell>
                {problems.map((problem, problemIndex) => {
                  const submission = value?.pointsPerProblem?.find(
                    (sub: any) => sub.problemId === problem.id
                  );
                  if (!submission) {
                    return (
                      <TableCell key={problem.id} className="">
                        -
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      key={problemIndex}
                      className={cn(
                        submission?.points === submission?.maxPoints
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      {submission?.points || "-"}
                    </TableCell>
                  );
                })}
                <TableCell className="">{value?.totalPoints || "-"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
