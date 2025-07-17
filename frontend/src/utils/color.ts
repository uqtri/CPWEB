// utils/colorUtils.ts

const textColorByDifficulty: Record<string, string> = {
  Dễ: "text-green-700",
  "Trung bình": "text-yellow-700",
  Khó: "text-red-700",
};

const bgColorByDifficulty: Record<string, string> = {
  Dễ: "bg-green-400/20",
  "Trung bình": "bg-yellow-400/20",
  Khó: "bg-red-400/20",
};
const borderColorByDifficulty: Record<string, string> = {
  Dễ: "border-green-300",
  "Trung bình": "border-yellow-300",
  Khó: "border-red-300",
};
export function getTextColorByProblemDifficulty(difficulty: string): string {
  return textColorByDifficulty[difficulty] ?? "text-gray-700";
}

export function getBackgroundColorByProblemDifficulty(
  difficulty: string
): string {
  return bgColorByDifficulty[difficulty] ?? "bg-gray-400/20";
}
export function getBorderColorByProblemDifficulty(difficulty: string): string {
  return borderColorByDifficulty[difficulty] ?? "border-gray-300";
}
