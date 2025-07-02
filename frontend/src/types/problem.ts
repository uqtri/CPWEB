import type { Submission } from "./submission";
import type { Category } from "./category";
export type Problem = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  user: any;
  submissions: Submission[];
  categories: Category[];
  testCases: any[];
  executionTime: number;
  memory: number;
};
export type CreateProblemData = {
  title: string;
  content: string;
  categories: number[];
  executionTime: number;
  memory: number;
};

export type UpdateProblemData = {
  title: string;
  content: string;
  categories: number[];
  executionTime: number;
  memory: number;
};
