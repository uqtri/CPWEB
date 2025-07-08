import { Problem } from "./problem";

export type Submission = {
  id: number;
  code: string;
  language: string;
  status: string;
  problem: Problem;
  user: any;
  executionTime: number;
  memoryUser: number;
  Score: number;
  createdAt: Date;
};

export type CreateSubmissionData = {
  code: string;
  language: string;
  userId: number;
  problemId: number;
};

export type UpdateSubmissionData = {
  code: string;
  languague: string;
  userId: number;
};
