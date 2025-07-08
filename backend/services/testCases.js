import { prisma } from "../prisma/prisma-client.js";
const getTestCaseByProblemSlug = async (problemSlug) => {
  try {
    const testCases = await prisma.testCase.findFirst({
      where: {
        problem: {
          slug: problemSlug,
        },
      },
      include: {
        problem: true,
      },
    });
    return testCases;
  } catch (err) {
    throw err;
  }
};

export default {
  getTestCaseByProblemSlug,
};
