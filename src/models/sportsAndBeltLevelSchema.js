const { z } = require("zod");

const SportSchema = z.object({
  name: z.string().min(1, "Sport name is required"),
});
const BeltLevelSchema = z.object({
  level: z.string().min(1, "Belt level is required"),
});

module.exports = { SportSchema, BeltLevelSchema };
