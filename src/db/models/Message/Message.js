const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  idUser: {
    type: String,
    required: true,
    unique: true,
  },
  idPenguin: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Message = model("Message", MessageSchema, "messages");

module.exports = Message;