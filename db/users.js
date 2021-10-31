const client = require("./client");

async function createUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password)
        VALUES($1, $2)
        ON CONFLICT (username) DO NOTHING
        RETURNING id, username
      `,
      [username, password]
    );

    return user;
  } catch (error) {
    throw error;
  }
}

// async function getUser({ username, password }) {
//   try {
//     const {
//       rows: [username, password],
//     } = await client.query(
//       `
//       SELECT * FROM users
//       WHERE username=$1, password=$2;
//       `,
//       [username, password]
//     );
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = { createUser };
