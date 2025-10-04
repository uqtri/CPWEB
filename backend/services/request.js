const createRequest = async (data) => {
  const request = prisma.request.create({
    data,
  });
  return request;
};
const getRequestByToken = async ({ token, type }) => {
  const request = await prisma.request.findUnique({
    where: { token, type },
  });
  return request;
};

const deleteRequest = async (token) => {
  return await prisma.request.delete({
    where: { token },
  });
};

export default { createRequest, getRequestByToken, deleteRequest };
