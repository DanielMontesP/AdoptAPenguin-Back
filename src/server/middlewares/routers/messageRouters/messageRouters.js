require("dotenv").config();
const express = require("express");
const { validate } = require("express-validation");
const {
  createMessage,
  getMessages,
  getMessage,
  editMessage,
  deleteMessage,
} = require("../../../controllers/messageControllers/messageControllers");

const { messageSchema } = require("../../../schemas/messageSchema");

const messagesRouters = express.Router();

messagesRouters.post("/create", createMessage);

messagesRouters.delete("/:idMessage", deleteMessage);
messagesRouters.get("/message/:idMessage", validate(messageSchema), getMessage);
messagesRouters.get("/:idPenguin", getMessages);
messagesRouters.put("/:idMessage", editMessage);

module.exports = messagesRouters;
