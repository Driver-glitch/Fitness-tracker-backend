async function createUser({
    id,
    username,
    password,
  }) {
    try {
      const { rows: [ user ] } = await client.query(`
        INSERT INTO users(id, username, password,)
        VALUES($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `, [id, username, password,]);
    delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }