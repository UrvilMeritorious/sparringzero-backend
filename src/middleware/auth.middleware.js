const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    const token = req.heders.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ error: "Unauthorized user" });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(403).json({ error: "Forbbiden" });
  }
};

module.exports = authenticateUser;
