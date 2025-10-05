import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { useState } from "react";

const CodeBlock = ({ inline, className, children }: any) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");

  if (inline) {
    return <code className={className}>{children}</code>;
  }
  
  return (
    <div className="relative">
      <button
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 1000);
        }}
        className="absolute -top-2 right-0 bg-white text-black hover:bg-gray-300 text-sm p-2 rounded focus:outline-none"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <p className={className}>
        <code>{code}</code>
      </p>
    </div>
  );
};

export default function Markdown({ markdown }: { markdown: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        code: CodeBlock,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
