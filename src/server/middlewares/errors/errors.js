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
  const errorCode = err.code ?? 500;
  const errorMessage = err.code ? err.message : "Internal server error";

  if (err.statusCode === 404) {
    res
      .status(404)
      .json("Please visit site: https://adoptapenguin.netlify.app/");
    debug(chalk.red(`User Request--> ERROR: ${err.customMessage}`));
  } else {
    if (err.details) {
      debug(
        `User Request--> ${chalk.red(
          `ERROR: (${err.statusCode}) ${err.message}`
        )}`
      );
    }
    res
      .status(err.status)
      .json(
        `message: ${errorMessage}, code: ${errorCode} },status: ${err.status}`
      );
  }
};

module.exports = {
  notFoundError,
  generalError,
};
