const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const {
  hashPassword,
  verifyPassword,
  generateToken,
} = require("../utils/helper");

const prisma = new PrismaClient();

const usersServices = {
  registerUser: async (userRequest) => {
    try {
      const [day, month, year] = userRequest.dob.split("/").map(Number);
      const formattedDob = new Date(year, month - 1, day);
      if (isNaN(formattedDob.getTime())) {
        throw new Error("Invalid date format");
      }
      const user = await prisma.user.create({
        data: {
          ...userRequest,
          dob: formattedDob,
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
  },
  loginUser: async (userRequest) => {
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
  },
  fetchUserDetails: async () => {
    try {
      const allUsers = await prisma.user.findMany({
        where: { verifyEmail: true, isDeleted: false },
      });
      if (!allUsers.length) throw new Error(`User not found`);
      return allUsers;
    } catch (error) {
      console.error("Error while fetching all users:", error.message);
      throw error;
    }
  },
  fetchUserDetailByEmail: async (email) => {
    try {
      const usersByEmail = await prisma.user.findMany({
        where: { email: email, verifyEmail: true, isDeleted: false },
      });
      if (!usersByEmail.length) throw new Error(`User not found`);
      return usersByEmail;
    } catch (error) {
      console.error(
        `Error while fetching users with email ${email}:`,
        error.message
      );
      throw error;
    }
  },
  updateUserDetail: async (email, userDetailsForUpdate) => {
    try {
      const usersByEmail = await prisma.user.findFirst({
        where: { email: email, verifyEmail: true, isDeleted: false },
      });

      if (!usersByEmail) throw new Error(`User not found`);

      return await prisma.user.update({
        where: { email: email },
        data: userDetailsForUpdate,
      });
    } catch (error) {
      console.error(
        `Error while updating user details with email ${email}:`,
        error.message
      );
      throw error;
    }
  },
};

module.exports = { usersServices };
