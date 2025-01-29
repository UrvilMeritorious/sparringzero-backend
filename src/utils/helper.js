const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => await bcrypt.hash(password, 10);

const verifyPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

const generateToken = async (userId) =>
  await jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

module.exports = { hashPassword, verifyPassword, generateToken };
