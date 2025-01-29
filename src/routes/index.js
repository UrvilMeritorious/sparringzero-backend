const express = require("express");
const userRoutes = require("../routes/user");
const sportsAndBeltsRoutes = require("../routes/sportsAndBeltLevel");

const routes = express.Router();

routes.use("/users", userRoutes);
routes.use("/sports", sportsAndBeltsRoutes);
routes.use("/belts", sportsAndBeltsRoutes);

module.exports = routes;
