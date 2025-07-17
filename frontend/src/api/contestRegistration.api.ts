import { axiosInstance } from "@/lib/axios";

export const registerContest = async (contestId: number) => {
  const response = await axiosInstance.post(
    `/contest-registrations/contest/${contestId}`
  );
  return response.data.data;
};
export const getRegisteredContestsByUserId = async (userId: number) => {
  const response = await axiosInstance.get(
    `/contest-registrations/user/${userId}`
  );
  return response.data.data;
};
export const getRegisteredContestByContestId = async (contestId: number) => {
  const response = await axiosInstance.get(
    `/contest-registrations/contest/${contestId}`
  );
  return response.data.data;
};
