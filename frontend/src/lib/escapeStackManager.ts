const escapeStack: (() => void)[] = [];

export function pushEscapeHandler(handler: () => void) {
  escapeStack.push(handler);
}
export function popEscapeHandler() {
  console.log("Popping escape handler");
  escapeStack.pop();
}

if (typeof window !== "undefined") {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const topHandler = escapeStack[escapeStack.length - 1];
      if (topHandler) topHandler();
    }
  });
}
