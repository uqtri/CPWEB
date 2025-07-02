import type { Submission } from "./submission";
import type { category } from "./category";
export type Problem = {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  user: any;
  submissions: Submission[];
  categories: category[];
  testCases: any[];
  executionTime: number;
  memory: number;
};
export type createProblemData = {
  title: string;
  content: string;
  categories: number[];
  executionTime: number;
  memory: number;
};

export type updateProblemData = {
  title: string;
  content: string;
  categories: number[];
  executionTime: number;
  memory: number;
};
