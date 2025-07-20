import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  CircleCheckBig,
  CircleX,
  TriangleAlert,
  Timer,
} from "lucide-react";
import { TEXT_COLORS } from "../../../../constants/color";

type TestCaseCardProps = {
  id: number;
  input: string;
  output: string;
  result: string;
  time: number;
  space: number;
};

export default function TestCaseCard({
  id,
  // input,
  // output,
  result,
}: // time,
// space,
TestCaseCardProps) {
  const [expanded] = useState(false);
  let color: "green" | "red" | "yellow" | "gray" = "green";
  if (result === "Wrong Answer" || result === "WA") {
    color = "red";
  } else if (result === "RE" || result === "Runtime Error") {
    color = "yellow";
  } else if (result === "TLE" || result === "Time Limit Exceeded") {
    color = "gray";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between w-full">
        <div className="flex gap-3">
          {expanded ? (
            <ChevronDown
              onClick={() => {
                // setExpanded(!expanded);
              }}
            />
          ) : (
            <ChevronRight
              onClick={() => {
                // setExpanded(!expanded);
              }}
            />
          )}{" "}
          {result === "Accepted" ? (
            <CircleCheckBig color="green" />
          ) : result === "Wrong Answer" ? (
            <CircleX color="red" />
          ) : result === "Runtime Error" ? (
            <TriangleAlert color="orange" />
          ) : (
            <Timer color="gray" />
          )}
          <span className="text-sm font-semibold text-gray-500">
            Testcase #{id}:{" "}
            <span
              className={`px-2 py-1 ${TEXT_COLORS[color]} rounded-md`}
              // style={}
            >
              {result}
            </span>
          </span>
        </div>
        {/* <div className="flex gap-3">
          <span className="text-sm font-semibold text-gray-500">{time} ms</span>
          <span className="text-sm font-semibold text-gray-500">
            {space} MB
          </span>
        </div> */}
      </div>
      {/* {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-500">Input</p>
            <div className="bg-gray-100 rounded-md p-2 flex-1">
              <pre>{input}</pre>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-500">Output</p>
            <div className="bg-gray-100 rounded-md p-2 flex-1">
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
