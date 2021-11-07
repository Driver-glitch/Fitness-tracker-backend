const express = require("express");
const apiRouter = express.Router();
const client = require("../db/client");
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;
// apiRouter.use((req, res, next) => {
//     if (req.user) {
//       console.log("User is set:", req.user);
//     }
//     next();
//   });

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

apiRouter.get("/health", async (req, res, next) => {
  try {
    res.send({
      message: "Healthy",
    });
  } catch (error) {
    next(error);
  }
});
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
apiRouter.use((error, req, res, next) => {
  res.send(error);
});
module.exports = apiRouter;
