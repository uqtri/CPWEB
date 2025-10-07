import { Dot } from "lucide-react";

export default function WaitingScreen() {
  return (
    <div className="modal-overlay flex items-center justify-center">
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
