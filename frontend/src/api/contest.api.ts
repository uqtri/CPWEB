import { axiosInstance } from "@/lib/axios";

export const getContests = async (params?: string) => {
  const response = await axiosInstance.get(`/contests?${params || ""}`);
  return response.data.data;
};
export const getContestBySlug = async (slug: string) => {
  const response = await axiosInstance.get(`/contests/${slug}`);
  return response.data.data;
};
export const updateContest = async (contestId: number, data: any) => {
  const response = await axiosInstance.put(`/contests/${contestId}`, data);
  return response.data.data;
};

export const createContest = async (data: any) => {
  const response = await axiosInstance.post("/contests", data);
  return response.data.data;
};

export const getLeaderboard = async (slug: string) => {
  const response = await axiosInstance.get(`/contests/${slug}/leaderboard`);
  return response.data.data;
};
export const deleteContest = async (contestId: number) => {
  const response = await axiosInstance.delete(`/contests/${contestId}`);
  return response.data.data;
};
