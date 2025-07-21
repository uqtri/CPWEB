import { Problem } from "./problem";

export type Submission = {
  id: number;
  code: string;
  language: string;
  status: string;
  problem: Problem;
  user: any;
  executionTime: number;
  contestId?: number;
  memoryUser: number;
  points: number;
  createdAt: Date;
};

export type CreateSubmissionData = {
  code: string;
  language: string;
  userId: number;
  problemId: number;
  contestId?: number;
};

export type UpdateSubmissionData = {
  code: string;
  languague: string;
  userId: number;
  contestId?: number;
};
