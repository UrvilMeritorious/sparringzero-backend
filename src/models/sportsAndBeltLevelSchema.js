const { z } = require("zod");

const SportSchema = z.object({
  sportName: z.string().min(1, "Sport name is required"),
  icon: z.string(),
});
const BeltLevelSchema = z.object({
  levelName: z.string().min(1, "Belt level is required"),
  colorCode: z.string(),
});

module.exports = { SportSchema, BeltLevelSchema };
