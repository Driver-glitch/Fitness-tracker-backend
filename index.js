// create the express server here
require("dotenv").config();

const { PORT = 3000 } = process.env;

const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

const morgan = require("morgan");
server.use(morgan("dev"));

server.use(express.json());

server.use("/api", require("./api"));


server.use("*", (req, res, next) => {
  res.status(404).send({ error: "route not found" });
});

server.use((error, req, res, next) => {
  res.status(500).send({ error: error.message });
});

const client = require("./db/client");

client.connect();

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});
