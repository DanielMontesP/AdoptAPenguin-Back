require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")("AAP:Errors");

const { customError } = require("../../utils/customError");

const notFoundError = (req, res, next) => {
  const error = customError(404, `Page not found:  ${req.originalUrl}`);

  next(error);
};

// eslint-disable-next-line no-unused-vars
const generalError = (err, req, res, next) => {
  if (err.statusCode === 404 || err.statusCode === 400) {
    res
      .status(404)
      .json(
        "Sorry page not fount. Please visit site: https://adoptapenguin.netlify.app/"
      );
    debug(chalk.red(`User Request--> ERROR: ${err} `));
  } else {
    const errorMessage =
      err.message && err.statusCode
        ? `${err.message}. StatusCode: ${err.statusCode}`
        : err;

    debug(chalk.red(`User Request--> ERROR: ${errorMessage} `));
    res.status(err.status).json(`message: ${err}`);
  }
};

module.exports = {
  notFoundError,
  generalError,
};
