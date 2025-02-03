const express = require("express");
const {
  sportsController,
  beltLevelController,
} = require("../controllers/sportsAndBeltLevel.controller");
const authenticateUser = require("../middleware/auth.middleware");

const routes = express.Router();

// Routes for sports
routes.get("/fetchSportsDetails", sportsController.fetchSportsDetails);
routes.post("/createSport", sportsController.createSports);

// Used below routes for updating and deleting sports details.
// For deleting set payload isDeleted: true
routes.patch(
  "/updateSportsDetails",
  authenticateUser,
  sportsController.updateSportsDetails
);

// Routes for belts
routes.get("/fetchBeltLevels", beltLevelController.fetchBeltLevels);
routes.post("/createBelt", beltLevelController.createBeltLevels);

// Used below routes for updating and deleting beltLevel details.
// For deleting set payload isDeleted: true
routes.patch(
  "/updateBeltLevelDetails",
  authenticateUser,
  beltLevelController.updateBeltLevelDetails
);

module.exports = routes;
