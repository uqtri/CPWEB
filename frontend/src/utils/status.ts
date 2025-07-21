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
