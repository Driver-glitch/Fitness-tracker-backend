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

async function getUser({ username, password }) {
  if (!username || !password) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE username=$1 
    ;
      `,

      [username]
    );
    if (!user) {
      return;
    }
    if (user.password !== password) {
      return;
    }
    console.log(user);
    // Needs to delete password but also do the other thing...
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
     SELECT * FROM users
     WHERE id=$1;
    `,
      [id]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
     SELECT * FROM users
     WHERE username=$1;
    `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

// // inside of createUser({ username, password})
// const SALT_COUNT = 10;
// const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

// // inside of getUser({username, password})
// const user = await getUserByUsername(username);
// const hashedPassword = user.password;
// const passwordsMatch = await bcrypt.compare(password, hashedPassword);
// if (passwordsMatch) {
//   // return the user object (without the password)
// } else {
//   throw SomeError;
// }


module.exports = {
  createUser,
  getUserById,
  getUser,
  getUserByUsername,

};
