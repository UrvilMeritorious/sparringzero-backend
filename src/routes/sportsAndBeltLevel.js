const express = require("express");
const {
  sportsController,
  beltLevelController,
} = require("../controllers/sportsAndBeltLevel.controller");

const routes = express.Router();

// Routes for sports
routes.post("/createSport", sportsController.createSports);

// Routes for belts
routes.post("/createBelt", beltLevelController.createBeltLevels);

module.exports = routes;
