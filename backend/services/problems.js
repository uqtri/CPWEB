import { prisma } from "../prisma/prisma-client.js";
export const getProblemBySlug = async (slug) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: { slug },
    });
    return problem;
  } catch (error) {
    throw new Error("Error fetching problem by slug: " + error.message);
  }
};
const getProblemById = async (id) => {
  try {
    const problem = await prisma.problem.findUnique({
      where: { id: parseInt(id) },
    });
    return problem;
  } catch (error) {
    throw new Error("Error fetching problem by ID: " + error.message);
  }
};
const deleteProblemByProblemId = async (problemId) => {
  try {
    const problem = await prisma.problem.delete({
      where: { id: parseInt(problemId) },
    });
    return problem;
  } catch (error) {
    throw new Error("Error deleting problem by ID: " + error.message);
  }
};
export default {
  getProblemBySlug,
  getProblemById,
  deleteProblemByProblemId,
};
