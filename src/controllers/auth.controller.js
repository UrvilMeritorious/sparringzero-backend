const { usersServices } = require("../services/auth.service");

const usersController = {
  register: async (req, res) => {
    try {
      const user = await usersServices.registerUser(req.body);
      res.status(201).json({ message: "User registered", data: user });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const token = await usersServices.loginUser(req.body);
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: error.message });
    }
  },
  fetchAllUsers: async (_req, res) => {
    try {
      const listOfUsers = await usersServices.fetchUserDetails();
      res
        .status(200)
        .json({ message: "List of all active users", data: listOfUsers });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },
  fetchUsersByEmail: async (req, res) => {
    const { email } = req.query;
    try {
      const listOfUsersByEmail = await usersServices.fetchUserDetailByEmail(
        email
      );
      res.status(200).json({
        message: `List of active users by email ${email}`,
        data: listOfUsersByEmail,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },
  updateUsers: async (req, res) => {
    const { email } = req.query;
    const userDetailsForUpdate = req.body;

    try {
      const updatedUserDetails = await usersServices.updateUserDetail(
        email,
        userDetailsForUpdate
      );
      res.status(200).json({
        message: `List of updated users by email ${email}`,
        data: updatedUserDetails,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = { usersController };
