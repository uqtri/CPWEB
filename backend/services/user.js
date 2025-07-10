import { prisma } from "../prisma/prisma-client.js";

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        role: true,
        solvedProblems: {
          include: {
            problem: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by ID: " + error.message);
  }
};

const getUsersByUsername = async (username) => {
  if (!username || username.trim() === "") {
    throw new Error("Username is required");
  }
  try {
    const user = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
      },
      take: 5,
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by username: " + error.message);
  }
};

export default {
  getUserById,
  getUsersByUsername,
};
