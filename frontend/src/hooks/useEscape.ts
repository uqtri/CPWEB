import { useEffect } from "react";
import { pushEscapeHandler, popEscapeHandler } from "../lib/escapeStackManager";
export function useEscape(callback: () => void) {
  console.log("useEscape hook initialized with callback:", callback);
  useEffect(() => {
    pushEscapeHandler(callback);
    return () => {
      popEscapeHandler();
    };
  }, [callback]);
}
