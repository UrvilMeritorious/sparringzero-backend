const express = require("express");
const indexRoutes = require("./src/routes/index");
require("dotenv").config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api", indexRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
