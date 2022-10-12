require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  createMessage,
  getMessages,
} = require("../../../controllers/messageControllers/messageControllers");
const { messageSchema } = require("../../../schemas/messageSchema");

const penguinRouters = express.Router();

penguinRouters.post("/create", validate(messageSchema), createMessage);

penguinRouters.get("/:idPenguin", getMessages);

module.exports = penguinRouters;
