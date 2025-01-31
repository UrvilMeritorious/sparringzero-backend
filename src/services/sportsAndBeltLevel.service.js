const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sportsService = {
  createSports: async (sportsRequest) => {
    try {
      const names = sportsRequest.map((sport) => sport.sportName);

      // Check any sports already exists
      const sports =
        names.length > 0 &&
        (await prisma.sport.findMany({
          where: {
            sportName: {
              in: names.sportName,
            },
            icon: {
              in: names.icon,
            },
          },
        }));

      // If any exists throw error
      if (sports.length > 0) {
        const existingNames = sports.map((sport) => sport.sportName).join(", ");
        throw new Error(`The following sports already exist: ${existingNames}`);
      }

      // If not exists create multiple new sports
      const newSports = await prisma.sport.createMany({
        data: sportsRequest, // Pass the entire array of sports
      });

      return newSports;
    } catch (error) {
      console.error("Error in creating sports:", error.message);
      throw error;
    }
  },
};

const beltLevelService = {
  createBelts: async (beltsRequest) => {
    try {
      const levels = beltsRequest.map((belt) => belt.levelName);

      // Check any belts already exists
      const belts =
        levels.length > 0 &&
        (await prisma.BeltLevel.findMany({
          where: {
            levelName: {
              in: levels.levelName,
            },
            colorCode: {
              in: levels.colorCode,
            },
          },
        }));

      // If any exists throw error
      if (belts.length > 0) {
        const existingLevels = belts
          .map((belt) => belt.levelName + belt.colorCode)
          .join(", ");
        throw new Error(
          `The following belts with color code already exist: ${existingLevels}`
        );
      }

      // If not exists create multiple new belts
      const newBelts = await prisma.BeltLevel.createMany({
        data: beltsRequest,
      });

      return newBelts;
    } catch (error) {
      console.error("Error in creating belts:", error.message);
      throw error;
    }
  },
};

module.exports = { sportsService, beltLevelService };
