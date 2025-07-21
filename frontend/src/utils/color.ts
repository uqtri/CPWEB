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

const bgSubmissionStatusColors: Record<string, string> = {
  Accepted: "bg-green-600",
  "Wrong Answer": "bg-red-600",
  "Compilation Error": "bg-yellow-600",
  Pending: "bg-gray-600",
};
const textSubmissionStatusColors: Record<string, string> = {
  Accepted: "text-white",
  "Wrong Answer": "text-white",
  "Compilation Error": "text-white",
  Pending: "text-white",
};
export function getBackgroundColorBySubmissionStatus(status: string): string {
  return bgSubmissionStatusColors[status] || "bg-gray-600";
}
export function getTextColorBySubmissionStatus(status: string): string {
  return textSubmissionStatusColors[status] || "text-white";
}
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
