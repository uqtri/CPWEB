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
const deleteUserSolvedProblemByProblemId = async (problemId) => {
  try {
    await prisma.userSolvedProblem.updateMany({
      where: { problemId: parseInt(problemId) },
      data: { isDeleted: true },
    });
  } catch (error) {
    throw error;
  }
};
const createUserSolvedProblem = async ({ userId, problemId }) => {
  console.log(userId, problemId);

  try {
    const existingRecord = await prisma.userSolvedProblem.findFirst({
      where: {
        userId: parseInt(userId),
        problemId: parseInt(problemId),
        isDeleted: false,
      },
    });
    console.log(userId, problemId);

    if (existingRecord) {
      return existingRecord;
    }
    console.log(existingRecord);
    console.log(parseInt(userId), parseInt(problemId));
    const newRecord = await prisma.userSolvedProblem.create({
      data: {
        userId: parseInt(userId),
        problemId: parseInt(problemId),
      },
    });

    console.log(newRecord);
    return newRecord;
  } catch (error) {
    throw error;
  }
};
export default {
  getUserSolvedProblemsByUserId,
  createUserSolvedProblem,
  deleteUserSolvedProblemByProblemId,
};
