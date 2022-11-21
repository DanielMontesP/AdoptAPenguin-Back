require("dotenv").config();
const chalk = require("chalk");
const debug = require("debug")(chalk.blue("AAP:Server: "));
const app = require("./index");

const debugPrefix = "SRV  Request--> ";

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(debugPrefix + chalk.green(`Server listening on port ${port}`));
      resolve();
    });

    server.on("error", (error) => {
      debug(chalk.red("Error on server"));
      if (error.code === "EADDRINUSE") {
        debug(chalk.red(`Port ${port} in use`));
        reject();
      }
    });
  });

module.exports = initializeServer;
