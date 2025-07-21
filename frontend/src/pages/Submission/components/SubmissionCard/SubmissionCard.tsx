import { Submission } from "@/types/submission";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Code,
  Eye,
  Trophy,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getStatusSubmission } from "@/utils/status";
import { getBackgroundColorBySubmissionStatus } from "@/utils/color";
import { useNavigate } from "react-router-dom";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Accepted":
      return <CheckCircle className="h-4 w-4" />;
    case "Wrong Answer":
      return <XCircle className="h-4 w-4" />;
    case "Time Limit":
      return <Clock className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

export default function SubmissionCard({
  submission,
}: {
  submission: Submission;
}) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between border-gray-200 border p-5">
      <div className="flex gap-4 items-center">
        {/*problem icon*/}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-violet-400 bg-opacity-20 rounded-md flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
        </div>
        {/*submission details*/}
        <div>
          <div className="flex items-center justify-between mb-2 gap-4">
            <h3 className="text-lg font-semibold">
              {submission?.user?.username} — {submission?.problem?.title}
            </h3>
            <p
              className={cn(
                "flex gap-2 px-5 py-1 rounded-full items-center text-white",
                getBackgroundColorBySubmissionStatus(submission?.status)
              )}
            >
              {getStatusIcon(submission?.status)}
              {getStatusSubmission(submission?.status)}
            </p>
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <p className="flex items-center gap-2 text-gray-500">
              <Trophy className="w-5 h-5" />
              {submission?.points} / {submission?.problem?.points}
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <Code className="w-5 h-5" />
              {submission?.language}
            </p>
            <p className="flex items-center gap-2 text-gray-500">
              <Calendar className="w-5 h-5" />
              {new Date(submission?.createdAt).toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-gray-500" />
          <span className="text-gray-500">
            {716} giây - {2359.8} MB
          </span>
        </div>
        <div
          className="flex items-center gap-2 mt-2 cursor-pointer text-primary"
          onClick={() => {
            navigate("/submission/" + submission.id);
          }}
        >
          <Eye className="w-5 h-5" />
          <span className="">Xem chi tiết</span>
        </div>
      </div>
    </div>
  );
}
