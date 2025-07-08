import React, { useEffect, useRef } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import Button from "../../components/Button/Button";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../store";
import { createSubmissions } from "@/api/submissions.api";
import { useProblem } from "@/hooks/useProblem";
import { toast } from "react-toastify";
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

  const { problemSlug } = useParams();
  const { getProblemBySlugQuery } = useProblem({ slug: problemSlug || "" });
  const problem = getProblemBySlugQuery?.data;
  const user = useAppStore((state) => state.user);
  const socket = useAppStore((state) => state.socket);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const language = "cpp";

    try {
      const submission = await createSubmissions({
        code: code.current,
        language: language,
        problemId: problem!.id,
        userId: user.id,
      });
      if (socket) {
        socket.emit("submission:join", {
          submissionId: submission.id,
        });
      }
      navigate(`/submission/${submission.id}?problemId=${problem!.id}`);
    } catch (error) {
      console.log(error);
      toast.error("Nộp bài không thành công. Vui lòng thử lại sau.");
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      code.current = value.replace("Editor content: ", "");
    }
  };

  return (
    <div className="mt-[62px] p-4">
      <p className="text-3xl font-semibold border-b pb-1">{problem?.title}</p>
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
