const { Joi } = require("express-validation");

const userLoginSchema = {
  body: Joi.object({
    username: Joi.string()
      .max(20)
      .min(4)
      .messages({ message: "A username is required" })
      .required(),
    password: Joi.string()
      .max(20)
      .min(4)
      .messages({ message: "A password is required" })
      .required(),
  }),
};

const userRegisterSchema = {
  body: Joi.object({
    username: Joi.string()
      .max(20)
      .min(4)
      .messages({ message: "A username is required" })
      .required(),
    password: Joi.string()
      .max(20)
      .min(4)
      .messages({ message: "A password is required" })
      .required(),
    image: Joi.string().allow(null, ""),
  }),
};

module.exports = { userLoginSchema, userRegisterSchema };
