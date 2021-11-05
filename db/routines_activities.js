const client = require("./client");
const { dbFields } = require("./util");

async function getRoutineActivityById() {}
async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [routine_activity],
    } = await client.query(
      `
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;

    `,
      [routineId, activityId, count, duration]
    );
    return routine_activity;
  } catch (error) {
    throw error;
  }
}
async function updateRoutineActivity() {}
async function destroyRoutineActivity() {}
async function getRoutineActivitiesByRoutine() {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineActivitiesByRoutine,
};
