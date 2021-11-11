const express = require("express");
const { notice } = require("npmlog");
const routineRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
  getRoutineActivitiesByRoutine,
  addActivityToRoutine,
} = require("../db");
const { getUserById } = require("../db/users");
const { requireUser } = require("./utils");

routineRouter.get("/", async (req, res, next) => {
  try {
    const routines = await getAllPublicRoutines();
    if (routines) {
      res.send(routines);
    } else {
      res.send({ message: "No activities found" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.post("/", requireUser, async (req, res, next) => {
  const { name, goal, isPublic } = req.body;

  const id = req.user.id;

  try {
    if ((name, goal, isPublic)) {
      const createdRoutine = await createRoutine({
        creatorId: id,
        isPublic,
        name,
        goal,
      });
      res.send(createdRoutine);
    } else {
      res.send({ message: "Missing fields" });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.patch("/:routineId", async (req, res, next) => {
  const { routineId } = req.params;
  const { name, goal, isPublic } = req.body;

  try {
    const updatedRoutine = await updateRoutine({
      id: routineId,
      name,
      goal,
      isPublic,
    });
    res.send(updatedRoutine);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

routineRouter.delete("/:routineId", requireUser, async (req, res, next) => {
  const id = req.params.routineId;
  console.log(req.params);
  try {
    const deleteRoutine = await destroyRoutine(id);

    res.send(deleteRoutine);
  } catch (error) {
    next(err);
  }
});

routineRouter.post("/:routineId/activities", async (req, res, next) => {
  try {
    const { activityId, count, duration } = req.body;
    const { routineId } = req.params;
    const result = await getRoutineActivitiesByRoutine({ id: routineId });

    const filteredResults =
      result &&
      result.filter((el) => {
        if (el.activityId === activityId) {
          return true;
        } else {
          return false;
        }
      });

    if (filteredResults && filteredResults.length) {
      next({
        name: "Routine activity Exist!",
        message: "This routine activity exists.",
      });
    } else {
      const newPost = await addActivityToRoutine({
        routineId,
        activityId,
        count,
        duration,
      });

      if (newPost) {
        res.send(newPost);
      } else {
        next({
          name: "Failed to add activity to Routine!!",
          message: `New post does not exist`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = routineRouter;
