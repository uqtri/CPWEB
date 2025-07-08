import Markdown from "@/components/Markdown/Markdown";
import { useEscape } from "@/hooks/useEscape";
import { CreateProblemData, UpdateProblemData } from "@/types/problem";

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

export default function Preview({
  callback,
  problem,
}: {
  callback: () => void;
  problem: CreateProblemData | UpdateProblemData;
}) {
  useEscape(callback);

  // const title = (problem.get("title") as string) || "";
  // const content = (problem.get("content") as string) || "";
  return (
    <div className="fixed w-[100vw] bg-white overflow-y-auto h-[100vh]">
      <div className="max-w-screen-xl py-3">
        <h1 className="text-2xl font-bold text-white">{problem.title}</h1>
        <div className="w-[100%] h-[2px] bg-gray-100"></div>
        <div className="prose max-w-none mt-6">
          <Markdown markdown={problem.content} />
        </div>
      </div>
    </div>
  );
}
