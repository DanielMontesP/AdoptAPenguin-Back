const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  id: {
    type: String,
  },
  idUser: {
    type: String,
    required: true,
  },
  idPenguin: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    required: true,
  },
});

const Message = model("Message", MessageSchema, "messages");

module.exports = Message;
