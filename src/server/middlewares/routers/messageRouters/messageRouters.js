require("dotenv").config();
const express = require("express");
const {
  createMessage,
  getMessages,
} = require("../../../controllers/messageControllers/messageControllers");

const messagesRouters = express.Router();

messagesRouters.post("/create", createMessage);

messagesRouters.get("/:idPenguin", getMessages);

module.exports = messagesRouters;
