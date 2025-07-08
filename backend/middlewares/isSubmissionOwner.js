import { parseJwt } from "../utils/parseJwt.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { prisma } from "../prisma/prisma-client.js";
const isSubmissionOwner = async (req, res, next) => {
  let { submissionId } = req.params;

  if (!submissionId) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Submission ID is required",
    });
  }
  submissionId = parseInt(submissionId, 10);
  if (isNaN(submissionId)) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "Submission ID must be a number",
    });
  }
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
  if (!payload || payload.username !== user.user.username) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: "You are not the owner of this submission",
    });
  }
  next();
};

export { isSubmissionOwner };
