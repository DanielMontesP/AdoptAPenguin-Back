const { Joi } = require("express-validation");

const messageSchema = {
  body: Joi.object({
    idPenguin: Joi.string().max(20),
    idUser: Joi.string().max(20),
    content: Joi.string().max(20),
    data: Joi.string().max(20),
    read: Joi.string().max(20),
  }),
};

module.exports = { messageSchema };
