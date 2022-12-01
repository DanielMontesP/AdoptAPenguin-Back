const express = require("express");
const { validate } = require("express-validation");
const chalk = require("chalk");
const debug = require("debug")(chalk.blue("AAP:URouters"));

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

const logPrefix = chalk.white("User Request-->");

const usersRouters = express.Router();

const beforeLogin = () => {
  try {
    debug(chalk.white(`${logPrefix} LOGIN: Validating user schema...`));
    const result = validate(userLoginSchema);

    debug(
      chalk.green(`${logPrefix} LOGIN: User schema validated successfully.`)
    );
    return result;
  } catch (error) {
    debug(chalk.red(`${logPrefix} LOGIN: ERROR Validating user schema.`));

    return error;
  }
};

const beforeRegister = () => {
  try {
    debug(chalk.white(`${logPrefix} REGISTER: Validating user schema...`));
    const result = validate(userRegisterSchema);

    debug(
      chalk.green(`${logPrefix} REGISTER: User schema validated successfully.`)
    );
    return result;
  } catch (error) {
    debug(chalk.red(`${logPrefix} REGISTER: ERROR Validating user schema.`));
    return error;
  }
};

usersRouters.post("/register", beforeRegister(), userRegister);
usersRouters.post("/login", beforeLogin(), userLogin);

usersRouters.get("/:UserId", userGet);
usersRouters.get("/messages/:UserId", userGetMessages);
usersRouters.put("/edit/:UserId", userEdit);

module.exports = usersRouters;
