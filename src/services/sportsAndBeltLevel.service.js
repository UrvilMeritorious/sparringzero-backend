const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const sportsService = {
  createSports: async (sportsRequest) => {
    try {
      const sportNames = sportsRequest
        .map((sport) => sport.sportName)
        .filter((sport) => typeof sport === "string" && sport.trim());

      const icons = sportsRequest
        .map((sport) => sport.icon)
        .filter((icon) => typeof icon === "string" && icon.trim());

      if (sportNames.length === 0 || icons.length === 0) {
        throw new Error(`sportNames or icons contains empty record`);
      }

      const namesAndIcons = await prisma.sport.findMany({
        where: {
          AND: [{ sportName: { in: sportNames } }, { icon: { in: icons } }],
        },
      });

      // If any exists throw error
      if (namesAndIcons.length > 0) {
        const existingNames = namesAndIcons
          .map((sport) => sport.sportName)
          .join(", ");
        throw new Error(
          `The following sports with icon already exist: ${existingNames}`
        );
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

  getSports: async () => {
    try {
      const getSportsDetails = await prisma.sport.findMany({
        where: { isDeleted: false },
        select: { sportName: true, icon: true, isDeleted: true },
      });

      return getSportsDetails;
    } catch (error) {
      console.error("Error while fetching sports details:", error.message);
      throw error;
    }
  },

  updateOrDeleteSports: async (sportName, requestForUpdate) => {
    try {
      const isSportsRecordAvailable = await prisma.sport.findFirst({
        where: { sportName: sportName, isDeleted: false },
      });

      if (!isSportsRecordAvailable)
        throw new Error(`Sports with the name ${sportName} not found`);

      return await prisma.sport.update({
        where: { sportName: sportName },
        data: requestForUpdate,
      });
    } catch (error) {
      console.error("Error while updating sports details:", error.message);
      throw error;
    }
  },
};

const beltLevelService = {
  createBelts: async (beltsRequest) => {
    try {
      const levelNames = beltsRequest
        .map((beltName) => beltName.levelName)
        .filter((name) => typeof name === "string" && name.trim());

      const colorCode = beltsRequest
        .map((code) => code.colorCode)
        .filter((color) => typeof color === "string" && color.trim());

      if (levelNames.length === 0 || colorCode.length === 0) {
        throw new Error(`levelNames or colorCode contains empty record`);
      }

      const beltsAndCods = await prisma.BeltLevel.findMany({
        where: {
          AND: [
            { levelName: { in: levelNames } },
            { colorCode: { in: colorCode } },
          ],
        },
      });

      // If any exists throw error
      if (beltsAndCods.length > 0) {
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

  getBeltLevels: async () => {
    try {
      const getBeltLevels = await prisma.beltLevel.findMany({
        where: { isDeleted: false },
        select: { levelName: true, colorCode: true, isDeleted: true },
      });

      return getBeltLevels;
    } catch (error) {
      console.error("Error while fetching belts level details:", error.message);
      throw error;
    }
  },

  updateOrDeleteBeltLevel: async (beltLevel, requestForUpdate) => {
    try {
      const isSBeltLevelRecordAvailable = await prisma.beltLevel.findFirst({
        where: { levelName: beltLevel, isDeleted: false },
      });

      if (!isSBeltLevelRecordAvailable)
        throw new Error(`Belt level with the levelName ${beltLevel} not found`);

      return await prisma.beltLevel.update({
        where: { levelName: beltLevel },
        data: requestForUpdate,
      });
    } catch (error) {
      console.error("Error while updating belt level details:", error.message);
      throw error;
    }
  },
};

module.exports = { sportsService, beltLevelService };
