const express = require("express");
const { requireUser } = require("../api/utils");
const {
  createActivity,
  getAllActivities,
  updateActivity,
} = require("../db/activities");
const activityRouter = express.Router();

activityRouter.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    if (activities) {
      res.send(activities);
    } else {
      res.send({ message: "No activities found" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

activityRouter.post("/", async (req, res, next) => {
  console.log(req, "<<<<<<<<<request<<<");
  try {
    const newActivity = await createActivity(name, description);

    res.send(newActivity);
  } catch (error) {
    next(error);
  }
});

activityRouter.patch("/:activityId", updateActivity, async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;
  console.log(name);
  try {
    const updatedActivity = await updateActivity(na);
  } catch (error) {
    next(error);
  }
});

module.exports = activityRouter;
