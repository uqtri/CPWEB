import { useEffect, useState } from "react";

import { useAppStore } from "../../store/index";
import { useParams, useSearchParams } from "react-router-dom";
import TestCaseCard from "./components/TestCaseCard/TestCaseCard";
import { getSubmissionById } from "@/api/submissions.api";
import { getSubmissionResultBySubmissionId } from "@/api/submissionResult.api";
import { Submission } from "@/types/submission";
export default function SubmissionDetail() {
  const socket = useAppStore((state) => state.socket);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("pending");

  let { submissionId } = useParams();
  submissionId = parseInt(submissionId as string) as any;
  useEffect(() => {
    if (socket) {
      socket.on("getSubmissionResult", (data: any) => {
        console.log("getSubmissionResult", data.result);
        console.log("submissionResult", [...submissionResult, data.result]);
        setSubmissionResult((prev) => [...prev, data.result]);
        console.log("submissionResult", submissionResult);
      });
      return () => {
        socket.off("getSubmissionResult");
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchSubmissionResultAndSubmission = async () => {
      try {
        console.log("submissionId", submissionId);
        const submissionResult = await getSubmissionResultBySubmissionId(
          parseInt(submissionId!)
        );
        const submission = await getSubmissionById(parseInt(submissionId!));
        console.log("submissionId vv", submission);
        console.log("submissionResult vv", submissionResult);

        setSubmission(submission);
        setSubmissionResult(submissionResult);
      } catch (error) {
        console.error("Error fetching submission:", error);
      }
    };
    fetchSubmissionResultAndSubmission();
  }, [submissionId]);
  console.log();
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Submission #{submission?.id}</h1>

      {/* Submission Info */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Submission Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">User:</span>{" "}
            {submission?.user?.username}
          </div>
          <div>
            <span className="font-medium">Problem:</span>{" "}
            {submission?.problem?.title}
          </div>
          <div>
            <span className="font-medium">Language:</span>{" "}
            {submission?.language}
          </div>
          <div>
            <span className="font-medium">Kết quả:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                status === "Accepted" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {status}
            </span>
          </div>
          <div>
            <span className="font-medium">Thời gian:</span>{" "}
            {submission?.problem?.executionTime} giây
          </div>
          <div>
            <span className="font-medium">Memory:</span>{" "}
            {submission?.problem?.memoryLimit} MB
          </div>
          {/* <div>
            <span className="font-medium">Submitted at:</span>{" "}
            {submission.submittedAt}
          </div> */}
        </div>
      </div>

      {/* Testcase Results */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Kết quả chấm bài</h2>
        <div className="divide-y">
          {submissionResult.map((test) => (
            <div key={test.id} className="py-2 flex justify-between text-sm">
              <TestCaseCard
                id={test.index}
                result={test.result}
                input={`5\n1 2 3 4 5`}
                output="15"
                time={0.25}
                space={123.52}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Source Code */}
      <div className="bg-white rounded-xl shadow p-4 border">
        <h2 className="text-lg font-semibold mb-4">Source Code</h2>
        <div className="bg-gray-100 p-3 rounded overflow-auto max-h-96">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {submission?.code}
          </pre>
        </div>
      </div>
    </div>
  );
}
