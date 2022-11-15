require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  createMessage,
  getMessages,
  getMessage,
  editMessage,
} = require("../../../controllers/messageControllers/messageControllers");

const { messageSchema } = require("../../../schemas/messageSchema");

const messagesRouters = express.Router();

messagesRouters.post("/create", createMessage);

messagesRouters.get("/message/:idMessage", validate(messageSchema), getMessage);
messagesRouters.get("/:idPenguin", getMessages);
messagesRouters.put("/message/edit/:idMessage", editMessage);

module.exports = messagesRouters;
