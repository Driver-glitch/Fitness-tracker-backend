const express = require("express");
const healthRouter = express.Router();

healthRouter.get("/", async (req, res) => {
  try {
    const allClear = "Server is healthy";
    res.send({ message: allClear });
  } catch (error) {
    throw error;
  }
});

module.exports = {
  healthRouter,
};
