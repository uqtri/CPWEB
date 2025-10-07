import type { Submission } from "./submission";
import type { Category, CreateCategoryData } from "./category";
export type Problem = {
  id: number;
  title: string;
  content: string;
  user: any;
  submissions: Submission[];
  categories: Category[];
  companies: any[];
  testCases: any[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  slug: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
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
  slug: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
};
export type CreateProblemData = {
  title: string;
  content: string;
  categories: CreateCategoryData[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  slug?: string;
  companies: any[];
  difficulty: "Dễ" | "Trung bình" | "Khó";
};

export type UpdateProblemData = {
  title: string;
  content: string;
  categories: Category[];
  executionTime: number;
  memoryLimit: number;
  points: number;
  slug?: string;
  difficulty: "Dễ" | "Trung bình" | "Khó";
  companies: any[];
};
