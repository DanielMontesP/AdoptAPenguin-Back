const { Joi } = require("express-validation");

const messageSchema = {
  body: Joi.object({
    id: Joi.string().max(20),
    idPenguin: Joi.string().max(20),
    idUser: Joi.string().max(20),
    subject: Joi.string().max(20),
    content: Joi.string().max(20),
    data: Joi.string().max(20),
    read: Joi.boolean(),
  }),
};

module.exports = { messageSchema };
