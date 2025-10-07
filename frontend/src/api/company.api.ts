import { axiosInstance } from "@/lib/axios";

const getCompanies = async () => {
  const response = await axiosInstance.get("/companies");
  return response.data.data;
};
export { getCompanies };
