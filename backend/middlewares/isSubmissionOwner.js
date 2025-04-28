import { parseJwt } from "../utils/parseJwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
const isSubmissionOwner = async (req, res, next) => {
  const { submissionId } = req.params;

  const payload = parseJwt(req.cookies.jwt);

  const user = await prisma.submission.findUnique({
    where: {
      id: submissionId,
    },
    select: {
      user: {
        select: {
          id: true,
          username: true,
          role: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  console.log(user);
  if (!payload || payload.username !== user.username) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "You are not the owner of this submission",
    });
  }
  next();
};

export { isSubmissionOwner };
