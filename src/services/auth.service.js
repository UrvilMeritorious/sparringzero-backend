const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../utils/helper");

const prisma = new PrismaClient();

const registerUser = async (userRequest) => {
  try {
    const user = await prisma.user.create({
      userData: {
        ...userRequest,
        password: await hashPassword(userRequest.password),
      },
    });

    if (!user)
      throw new Error(
        `Error while creating new user with email ${userRequest.email}`
      );

    return user;
  } catch (error) {
    console.error("Error while registering user:", error.message);
    throw error;
  }
};

const loginUser = async (userRequest) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: userRequest.email },
    });

    if (!user)
      throw new Error(`User not found with email ${userRequest.email}`);

    const veryfyPassword = await verifyPassword(
      userRequest.password,
      user.password
    );

    if (!veryfyPassword) throw new Error("Invalid credentials");

    return await generateToken(user.id);
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
};

module.exports = { registerUser, loginUser };
