const express = require("express");
const { usersController } = require("../controllers/auth.controller");
const authenticateUser = require("../middleware/auth.middleware");

const routes = express.Router();

routes.post("/register", usersController.register);
routes.post("/login", usersController.login);
routes.get("/fetchAllUsers", usersController.fetchAllUsers);
routes.get(
  "/fetchUsersByEmail",
  authenticateUser,
  usersController.fetchUsersByEmail
);

// Used below routes for updating and deleting users details.
// For deleting set payload isDeleted: true
routes.patch("/updateUser", authenticateUser, usersController.updateUsers);

module.exports = routes;
