const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const usersRouters = require("./middlewares/routers/userRouters/userRouters");
const penguinRouters = require("./middlewares/routers/penguinRouters/penguinRouters");
const messageRouters = require("./middlewares/routers/messageRouters/messageRouters");
const { notFoundError, generalError } = require("./middlewares/errors/errors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://192.168.1.15:3000", // frontend
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:4000",
    "http://localhost:4001",
    "http://localhost:4002",
    "http://localhost:5000",
    "http://localhost:5001",
    "http://localhost:5002",
    "http://127.0.0.1:3000",
    "https://adoptapenguin.netlify.app/",
    "https://adoptapenguin.netlify.app",
    "https://adoptapenguin2.onrender.com/",
    "https://adoptapenguin2.onrender.com",
  ],
};

const app = express();

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(helmet());

app.use(express.static("uploads"));

app.use("/users", usersRouters);
app.use("/penguins", penguinRouters);
app.use("/messages", messageRouters);

app.use(notFoundError);
app.use(generalError);

module.exports = app;
