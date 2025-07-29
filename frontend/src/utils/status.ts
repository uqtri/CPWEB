export const getStatusSubmission = (status: string): string => {
  switch (status) {
    case "Accepted":
      return "Đã chấp nhận";
    case "Wrong Answer":
      return "Kết quả sai";
    case "Compilation Error":
      return "Lỗi biên dịch";
    case "Pending":
      return "Đang chờ xử lý";
    default:
      return "Không xác định";
  }
};

export function getStatusText(status: string) {
  switch (status) {
    case "upcoming":
      return "Sắp diễn ra";
    case "ongoing":
      return "Đang diễn ra";

    case "ended":
      return "Đã kết thúc";
    default:
      return "Chưa bắt đầu";
  }
}
export const getStatusContestFromDate = (
  startTime: string,
  endTime: string
): string => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (start > now) {
    return "upcoming"; // Sắp diễn ra
  } else if (end < now) {
    return "ended"; // Đã kết thúc
  }
  return "ongoing"; // Đang diễn ra
};
