const express = require("express");
const {
  sports,
  belts,
} = require("../controllers/sportsAndBeltLevel.controller");
const authenticateUser = require("../middleware/auth.middleware");

const routes = express.Router();

routes.post("/createSport", authenticateUser, sports);
routes.post("/createBelt", authenticateUser, belts);

module.exports = routes;
