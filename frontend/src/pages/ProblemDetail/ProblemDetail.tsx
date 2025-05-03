import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Check, Clock, FileArchive, MenuIcon } from "lucide-react";
import Button from "../../components/Button/Button";
import { Link, useLocation, useParams } from "react-router-dom";

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

const markdown = `
Cho một chuỗi gồm $N, W_1, W_2,..., W_N$ được viết bằng tiếng latin in thường. Bạn hãy viết chương trình dự đoán xem chuỗi từ này có phải là ngôn ngữ Anh hay không bằng dấu hiệu nhận biết sau:

- Nếu một trong các từ là $and, not , that, the, hoặc$  $you$, nó là tiếng Anh.
- Ngược lại, nó không phải là tiếng Anh.

### Input
- Dòng đầu chứa số nguyên dương $N (1\\le N\\le 100)$.
- Dòng tiếp theo chứa ~N~ từ ~W_1~, ~W_2~,..., ~W_N~ được viết bằng tiếng latin in thường. Mỗi từ có độ dài không vượt quá ~50~.

### Output
- In ra \`Yes\` nếu một trong các từ là \`and\`, \`not\`, \`that\`, \`the\`, hoặc \`you\`, ngược lại in ra \`No\`.

### Ví dụ

#### Sample input 01
\`\`\`
10
in that case you should print yes and not no
\`\`\`

#### Sample output 01
\`\`\`
Yes
\`\`\`

#### Sample input 02
\`\`\`
3
le quynh anh
\`\`\`

#### Sample output 02
\`\`\`
No
\`\`\`

#### Sample input 03
\`\`\`
3
i love you
\`\`\`

#### Sample output 03
\`\`\`
Yes
\`\`\`
`;

export default function ProblemDetail() {
  const location = useLocation();
  const { problemId } = useParams();
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

  return (
    <div className="problem-detail mt-20 p-4">
      <p className="text-3xl font-semibold border-b pb-1">{problem.name}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 p-4 bg-yellow/20 rounded-md gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Check />
          <p>
            <span className="font-bold">Points:</span> {problem.points}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Clock />
          <p>
            <span className="font-bold">Time limit:</span> {problem.timeLimit}{" "}
            giây
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MenuIcon />
          <p>
            <span className="font-bold">Memory limit:</span>{" "}
            {problem.memoryLimit} MB
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileArchive />
          <p>
            <span className="font-bold">Input:</span> {problem.input}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <FileArchive />
          <p>
            <span className="font-bold">Output:</span> {problem.output}
          </p>
        </div>
        <div>
          <Button
            link={`${location.pathname}/submit`}
            color="white"
            label="Nộp bài"
            background="primary"
          />
        </div>
      </div>

      <div className="prose max-w-none mt-6">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
