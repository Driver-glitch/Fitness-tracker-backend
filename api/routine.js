const express = require("express");
const routineRouter = express.Router();
const {
  getAllPublicRoutines,
  createRoutine,
  updateRoutine,
  destroyRoutine,
} = require("../db/routines");
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
  console.log(req.user, "user!!!!!!!!!!!!!!!!!!!!!");
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

routineRouter.post("/:routineId/activities", async (req, res, next) => {});

module.exports = routineRouter;
