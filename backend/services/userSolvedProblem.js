import { prisma } from "../prisma/prisma-client.js";

const getUserSolvedProblemsByUserId = async (userId) => {
  try {
    const solvedProblems = await prisma.userSolvedProblem.findMany({
      where: { userId: parseInt(userId), isDeleted: false },
      include: {
        problem: true,
      },
    });
    return solvedProblems;
  } catch (error) {
    throw new Error(
      "Error fetching solved problems by user ID: " + error.message
    );
  }
};
const createUserSolvedProblem = async ({ userId, problemId }) => {
  try {
    const existingRecord = await prisma.userSolvedProblem.findFirst({
      where: {
        userId: parseInt(userId),
        problemId: parseInt(problemId),
        isDeleted: false,
      },
    });

    if (existingRecord) {
      return existingRecord;
    }

    const newRecord = await prisma.userSolvedProblem.create({
      data: {
        userId: parseInt(userId),
        problemId: parseInt(problemId),
      },
    });

    return newRecord;
  } catch (error) {
    throw new Error(
      "Error creating user solved problem record: " + error.message
    );
  }
};
export default {
  getUserSolvedProblemsByUserId,
  createUserSolvedProblem,
};
