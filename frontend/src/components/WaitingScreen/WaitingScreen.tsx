import { Dot } from "lucide-react";

export default function WaitingScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-200 z-50 bg-opacity-50">
      <div className="loader flex">
        <Dot
          size={50}
          className="animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <Dot
          size={50}
          className="animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <Dot
          size={50}
          className="animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
