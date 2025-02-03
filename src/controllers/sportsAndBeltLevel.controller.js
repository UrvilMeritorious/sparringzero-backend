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

  fetchSportsDetails: async (_req, res) => {
    try {
      const sport = await sportsService.getSports();
      res.status(200).json({ message: "fteched sport details", data: sport });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateSportsDetails: async (req, res) => {
    const { sportName } = req.query;
    const requestForUpdate = req.body;

    try {
      const updateSportsDetails = await sportsService.updateOrDeleteSports(
        sportName,
        requestForUpdate
      );
      res.status(200).json({
        message: `List of updated sports details by sportName ${sportName}`,
        data: updateSportsDetails,
      });
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

  fetchBeltLevels: async (_req, res) => {
    try {
      const beltsLevels = await beltLevelService.getBeltLevels();
      res
        .status(200)
        .json({ message: "Fetched belet level details", data: beltsLevels });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },

  updateBeltLevelDetails: async (req, res) => {
    const { levelName } = req.query;
    const requestForUpdate = req.body;

    try {
      const updateBeltLevelDetails =
        await beltLevelService.updateOrDeleteBeltLevel(
          levelName,
          requestForUpdate
        );
      res.status(200).json({
        message: `List of updated beltlevel details by levelName ${levelName}`,
        data: updateBeltLevelDetails,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  },
};

module.exports = { sportsController, beltLevelController };
