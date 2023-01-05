const express = require("express");
const { validate } = require("express-validation");

const {
  userRegister,
  userLogin,
  userGet,
  userEdit,
  userGetMessages,
} = require("../../../controllers/userControllers/userControllers");

const {
  userLoginSchema,
  userRegisterSchema,
} = require("../../../schemas/userSchema");

const usersRouters = express.Router();

usersRouters.post("/register", validate(userRegisterSchema), userRegister);
usersRouters.post("/login", validate(userLoginSchema), userLogin);

usersRouters.get("/:UserId", userGet);
usersRouters.get("/messages/:UserId", userGetMessages);
usersRouters.put("/edit/:UserId", userEdit);

module.exports = usersRouters;
