export type Submission = {
  id: number;
  code: string;
  languague: string;
  status: string;
  problemId: number;
  executionTime: number;
  memoryUser: number;
  Score: number;
  createdAt: Date;
};

export type CreateSubmissionData = {
  code: string;
  languague: string;
  userId: number;
  problemId: number;
};

export type UpdateSubmissionData = {
  code: string;
  languague: string;
  userId: number;
};
