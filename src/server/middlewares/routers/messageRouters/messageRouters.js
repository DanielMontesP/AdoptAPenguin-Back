require("dotenv").config();
const express = require("express");

const {
  createMessage,
  getMessages,
} = require("../../../controllers/messageControllers/messageControllers");

const penguinRouters = express.Router();

penguinRouters.post("/create", createMessage);

penguinRouters.get("/:idPenguin", getMessages);

module.exports = penguinRouters;
