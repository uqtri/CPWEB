import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "../../store/index";
import { useParams } from "react-router-dom";
import TestCaseCard from "./components/TestCaseCard/TestCaseCard";
import { getSubmissionById } from "@/api/submissions.api";
import { getSubmissionResultBySubmissionId } from "@/api/submissionResult.api";
import { Submission } from "@/types/submission";

// import { getTestCaseByProblemSlug } from "@/api/testCase.api";

export default function SubmissionDetail() {
  const socket = useAppStore((state) => state.socket);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissionResult, setSubmissionResult] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("Pending");
  // const [testCases, setTestCases] = useState<any>(null);
  let { submissionId } = useParams();
  submissionId = parseInt(submissionId as string) as any;

  console.log(submissionResult, "@!#@#!@");
  useEffect(() => {
    const fetchTestCase = async () => {
      try {
        if (submission) {
          const submissionResult = await getSubmissionResultBySubmissionId(
            parseInt(submissionId!)
          );

          // const data = await getTestCaseByProblemSlug(
          //   submission?.problem?.slug!
          // );
          if (submission.status !== "Pending") {
            setSubmissionResult(submissionResult);
            setStatus(submission.status);
          }
          // setTestCases(data);
        }
      } catch (error) {
        console.log(error, "@@@");
      }
    };
    fetchTestCase();
  }, [submission]);
  useEffect(() => {
    if (socket) {
      socket.on("getSubmissionResult", (data: any) => {
        setSubmissionResult((prev) => {
          console.log(prev.length);
          if (data.result.result !== "Accepted") {
            if (data.result.result === "Compilation Error") {
              setStatus(data.result.result);
              return prev;
            } else if (data.result.result === "Time Limit Exceeded") {
              setStatus(data.result.result);
            } else {
              setStatus("Wrong Answer");
            }
          } else if (data.result.done) {
            setStatus("Accepted");
          }
          return [...prev, data.result];
        });
      });
      return () => {
        socket.off("getSubmissionResult");
      };
    }
  }, [socket]);

  useEffect(() => {
    const fetchSubmissionResultAndSubmission = async () => {
      try {
        const submission = await getSubmissionById(parseInt(submissionId!));
        setSubmission(submission);
        setStatus(submission.status);
      } catch (error) {
        console.error("Error fetching submission:", error);
      }
    };
    fetchSubmissionResultAndSubmission();
  }, [submissionId]);

  console.log(submissionResult);
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Bài nộp #{submission?.id}</h1>

      {/* Submission Info */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Thông tin</h2>
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
              className={cn(
                `ml-2 px-2 py-1 rounded text-white text-xs bg-gray-600`,
                status === "Accepted" && "bg-green-600",
                status === "Wrong Answer" && "bg-red-600",
                (status === "Pending" || status === "Compilation Error") &&
                  "bg-yellow-600"
              )}
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
      {/* Source Code */}
      <div className="bg-white rounded-xl shadow p-4 border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold mb-4">Source Code</h2>
          <button
            onClick={() => {
              navigator.clipboard.writeText(submission?.code || "");
            }}
            className="mb-2 bg-gray-200 text-black hover:bg-gray-300 text-sm p-2 rounded focus:outline-none"
          >
            Copy source
          </button>
        </div>
        <div className="bg-gray-100 p-3 rounded overflow-auto max-h-96">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {submission?.code}
          </pre>
        </div>
      </div>

      {/* Testcase Results */}
      <div className="bg-white rounded-xl shadow p-4 mt-6 border">
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
    </div>
  );
}
