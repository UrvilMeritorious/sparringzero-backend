const {
  sportsService,
  beltLevelService,
} = require("../services/sportsAndBeltLevel.service");

const sportsController = {
  createSports: async (req, res) => {
    try {
      const sport = await sportsService.createSports(req.body);
      res.status(201).json({ message: "Sports created", data: sport });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

const beltLevelController = {
  createBeltLevels: async (req, res) => {
    try {
      const belt = await beltLevelService.createBelts(req.body);
      res.status(201).json({ message: "Belts created", data: belt });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = { sportsController, beltLevelController };
