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

const getUserByEmail = async (email) => {
  if (!email || email.trim() === "") {
    throw new Error("Email is required");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by email: " + error.message);
  }
};
const createUser = async (data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  } else data.password = "";
  try {
    const user = await prisma.user.create({
      data: {
        ...data,
        role: {
          connect: {
            name: data.role || "user",
          },
        },
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
};
const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  try {
    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
    return user;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
};
export default {
  getUserById,
  getUsersByUsername,
  getUserByEmail,
  createUser,
  updateUser,
};
