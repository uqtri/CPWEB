import type { Submission } from "./submission";
import type { Category, CreateCategoryData } from "./category";
export type Problem = {
  id: number;
  title: string;
  content: string;
  user: any;
  submissions: Submission[];
  categories: Category[];
  testCases: any[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
};
export type ProblemResponse = {
  id?: number;
  title?: string;
  content?: string;
  createdAt?: Date;
  user?: any;
  submissions: Submission[];
  categories: Category[];
  testCases: any[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
};
export type CreateProblemData = {
  title: string;
  content: string;
  categories: CreateCategoryData[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
};

export type UpdateProblemData = {
  title: string;
  content: string;
  categories: Category[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
};
