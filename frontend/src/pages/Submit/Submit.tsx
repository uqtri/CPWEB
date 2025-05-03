import React, { useEffect, useRef } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
type Problem = {
  name: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  input: string;
  output: string;
  points: number;
  difficulty: number;
};
export default function Submit() {
  let code = useRef<string>("");
  const problem: Problem = {
    name: "Bài toán mẫu",
    description: "Đây là một bài toán mẫu để kiểm tra hệ thống.",
    timeLimit: 2,
    memoryLimit: 256,
    input: "stdin",
    output: "stdout",
    points: 100,
    difficulty: 3,
  };
  const { problemId } = useParams();
  const handleSubmit = async () => {
    console.log(code.current);
    const language = "cpp"; // Replace with the selected language
    console.log(problemId);
    const response = await fetch("http://localhost:5000/api/v1/submissions/1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        code: code.current,
        language,
        problemId: parseInt(problemId as string),
      }),
    });
    const data = await response.json();
  };
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      code.current = value.replace("Editor content: ", "");
    }
  };

  return (
    <div className="mt-[62px] px-4">
      <p className="text-3xl font-semibold border-b pb-1">{problem.name}</p>
      <div className="flex justify-center mt-4 gap-3">
        <Editor
          theme="vs-dark"
          height="80vh"
          width={"80%"}
          // line={10}
          onChange={handleEditorChange}
          defaultLanguage="cpp"
        />
        <div className="flex flex-col gap-4">
          <div className="language-select">
            <select className="border p-2 rounded-md bg-white outline-non">
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>
          </div>
          {/* <div onClick={handleSubmit}> */}

          <button
            className="p-3 bg-primary text-white rounded-md cursor-pointer"
            onClick={handleSubmit}
          >
            Nộp bài
          </button>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
