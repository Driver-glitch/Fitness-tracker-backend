// Daniel did this ( Needs to be checked )

const express = require("express");

const usersRouter = express.Router();

const jwt = require("jsonwebtoken");

const { getUserByUsername, getAllUser, createUser } = require("../db");

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUser();
    res.send({
      users,
    });
  } catch (error) {}
});

usersRouter.get("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    if (user && user.password == password) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({ message: "you're logged in!", token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const _user = await getUserByUsername(username);

    //This tests for duplicate user

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
// end of duplicate user verification 

    const user = await createUser({
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// Below is code that requires username and password character lengths. 

function username(username) {
  if (username.length < 3) {
    return "Username cannot be less than 3 characters!";
  } else if (username.length > 10) {
    return "Username cannot be longer than 15 characters!";
  }

  // returns empty string
  
  return "";
}

function password(password) {
  if (password && password != undefined && password.length < 8) {
    return "Password cannot be less than 8 characters!";
  } else if (password.length < 3) {
    return "Password is too short!";
  }

// returns empty string

  return "";
}

module.exports = {
  usersRouter,
  username,
  password,
};
