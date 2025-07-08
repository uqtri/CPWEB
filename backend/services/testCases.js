const getTestCaseByProblemId = async (problemId) => {
  try {
    const testCases = await prisma.testCase.findUnique({
      where: { problemId: parseInt(problemId) },
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
  getTestCaseByProblemId,
};
