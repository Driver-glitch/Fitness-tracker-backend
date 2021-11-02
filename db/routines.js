
// Do we need a require? 
//const client = require("./client");



async function getRoutineById(id) {
    try {
        const { rows: [user]} = await client.query(`
        SELECT id FROM routines
        WHERE id=${ id };
        `);
    
        return user;
      } catch (error) {
        throw error;
      }
}
async function getRoutinesWithoutActivities() {
    try {
        const { rows } = await client.query(`
        SELECT * FROM routines;
        `);
   // I think we need a delete activities
        return rows;
      } catch (error) {
        throw error;
      }

}
async function getAllRoutines() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM routines;
    `);

    return rows;
  } catch (error) {
    throw error;
  }

}

async function getAllPublicRoutines() {

}
async function getAllRoutinesByUser() {

}
async function getPublicRoutinesByUser() {

}
async function getPublicRoutinesByActivity() {

}
async function createRoutine() {

}
async function updateRoutine() {

}
async function destroyRoutine() {

}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,

};
