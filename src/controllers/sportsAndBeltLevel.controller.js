const {
  createSports,
  createBelts,
} = require("../services/sportsAndBeltLevel.service");

const sports = async (req, res) => {
  try {
    const sport = await createSports(req.body);
    res.status(201).json({ message: "Sports created", data: sport });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const belts = async (req, res) => {
  try {
    const belt = await createBelts(req.body);
    res.status(201).json({ message: "Belts created", data: belt });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { sports, belts };
