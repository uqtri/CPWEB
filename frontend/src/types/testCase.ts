export type TestCase = {
  id: number;
  input: string;
  output: string;
  // problemId: number;
};

export type CreateTestCaseData = {
  input: string;
  output: string;
  problemId: number;
};
export type UpdateTestCaseData = {
  input: string;
  output: string;
  // problemId: number;
};
