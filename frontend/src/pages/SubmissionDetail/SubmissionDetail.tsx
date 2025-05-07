import { useEffect, useState } from "react";

import { useAppStore } from "../../store/index";
import { useParams, useSearchParams } from "react-router-dom";
import TestCaseCard from "./components/TestCaseCard/TestCaseCard";
export default function SubmissionDetail() {
  const socket = useAppStore((state) => state.socket);

  const [submissionResult, setSubmissionResult] = useState<any[]>([]);
  const [testCases, setTestCases] = useState<[]>([]);
  let { submissionId } = useParams();
  submissionId = parseInt(submissionId as string) as any;
  const [searchParams, setSearchParams] = useSearchParams();
  const problemId = searchParams.get("problemId");

  useEffect(() => {
    console.log("KKKK");
    if (socket) {
      console.log("ZO ROI");
      socket.emit("submission:join", {
        submissionId: submissionId,
      });
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
  // useEffect(() => {
  //   const fetchSubmissionResult = async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/api/v1/submission-results/${submissionId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       }
  //     ).then((res) => res.json());
  //     if (response.success) {
  //       setSubmissionResult(response.data);
  //     }
  //   };
  //   const fetchTestCases = async () => {
  //     const response = await fetch(
  //       `http://localhost:5000/api/v1/test-cases/${problemId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     ).then((res) => res.json());
  //     if (response.success) {
  //       setTestCases(response.data);
  //     }
  //   };
  //   fetchSubmissionResult();
  // }, []);
  useEffect(() => {
    const fetchTestCases = async () => {
      const response = await fetch(
        `http://localhost:5000/api/v1/test-cases/${problemId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      if (response.success) {
        setTestCases(response.data);
      }
    };

    fetchTestCases();
  }, []);
  const submission = {
    id: 12345,
    user: "coder123",
    problem: "A - Sum It Up",
    language: "C++17",
    verdict: "Accepted",
    time: "46 ms",
    memory: "12 MB",
    submittedAt: "2025-05-06 14:32",
    testcaseResults: [
      { id: 1, verdict: "Accepted", time: "10 ms", memory: "3 MB" },
      { id: 2, verdict: "Accepted", time: "12 ms", memory: "4 MB" },
      { id: 3, verdict: "Accepted", time: "24 ms", memory: "5 MB" },
      { id: 4, verdict: "WA", time: "24 ms", memory: "5 MB" },
      { id: 3, verdict: "TLE", time: "24 ms", memory: "5 MB" },
      { id: 3, verdict: "RE", time: "24 ms", memory: "5 MB" },
    ],
    sourceCode: `#include <iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}`,
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Submission #{submission.id}</h1>

      {/* Submission Info */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Submission Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">User:</span> {submission.user}
          </div>
          <div>
            <span className="font-medium">Problem:</span> {submission.problem}
          </div>
          <div>
            <span className="font-medium">Language:</span> {submission.language}
          </div>
          <div>
            <span className="font-medium">Verdict:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-white text-xs ${
                submission.verdict === "Accepted"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {submission.verdict}
            </span>
          </div>
          <div>
            <span className="font-medium">Time:</span> {submission.time}
          </div>
          <div>
            <span className="font-medium">Memory:</span> {submission.memory}
          </div>
          <div>
            <span className="font-medium">Submitted at:</span>{" "}
            {submission.submittedAt}
          </div>
        </div>
      </div>

      {/* Testcase Results */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 border">
        <h2 className="text-lg font-semibold mb-4">Testcase Results</h2>
        <div className="divide-y">
          {submission.testcaseResults.map((test) => (
            <div key={test.id} className="py-2 flex justify-between text-sm">
              <TestCaseCard
                id={test.id}
                result={test.verdict}
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
            {submission.sourceCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
