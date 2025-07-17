import { prisma } from "../prisma/prisma-client.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { parseJwt } from "../utils/parseJwt.js";
export const registerContest = async (req, res) => {
  const { contestId } = req.params;
  const user = parseJwt(req.cookies.jwt);

  if (!user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED.code).json({
      success: false,
      message: "Unauthorized. Please log in.",
    });
  }
  const userId = user.id;
  try {
    const registration = await prisma.contestRegistration.create({
      data: {
        contestId: parseInt(contestId),
        userId,
      },
    });

    return res.status(HTTP_STATUS.CREATED.code).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export const getContestRegistrationsByUserId = async (req, res) => {
  const { userId } = req.params;
  console.log("Fetching registrations for userId:", userId);

  try {
    const registrations = await prisma.contestRegistration.findMany({
      where: { userId: parseInt(userId) },
    });
    console.log("Registrations:", registrations);
    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    console.log(error);
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export const getRegistrationsByContestId = async (req, res) => {
  const { contestId } = req.params;
  try {
    const registrations = await prisma.contestRegistration.findMany({
      where: { contestId: parseInt(contestId) },
    });

    return res.status(HTTP_STATUS.OK.code).json({
      success: true,
      data: registrations,
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST.code).json({
      success: false,
      message: error.toString(),
    });
  }
};
export default {
  registerContest,
  getContestRegistrationsByUserId,
  getRegistrationsByContestId,
};
