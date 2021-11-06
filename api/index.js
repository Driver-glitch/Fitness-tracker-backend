// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router
const express = require("express");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const apiRouter = express.Router();

const healthRouter = require("./health");
apiRouter.use("/health", healthRouter);

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUsersById(id);
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

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activityRouter = require("./activities");
apiRouter.use("/activities", activityRouter);

module.exports = apiRouter;
