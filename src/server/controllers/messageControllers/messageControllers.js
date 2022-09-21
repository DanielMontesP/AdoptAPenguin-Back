const chalk = require("chalk");
const debug = require("debug")(chalk.blue("AAP:MControllers"));
const Message = require("../../../db/models/Message/Message");
const { customError } = require("../../utils/customError");

const logPrefix = chalk.white("User Request--> ");
const logPrefixCreate = chalk.blue(`${logPrefix}CREATE MESSAGE: `);
const logPrefixGet = chalk.blue(`${logPrefix}GET MESSAGES: `);

let message = "";

const createMessage = async (req, res, next) => {
  const { idUser, idPenguin, content } = req.body;

  message = `${logPrefixCreate}${idUser}`;

  debug(chalk.green(message));

  try {
    const newMessage = {
      idUser,
      idPenguin,
      content,
    };

    await Message.create(newMessage);

    debug(
      chalk.green(`${logPrefixCreate}${idUser} message successfully created.`)
    );

    res.status(201).json({ message });
  } catch (error) {
    message = `${logPrefixCreate}ERROR ${error.message}`;

    debug(chalk.red(message));
    const createdError = customError(400, message, error.message);

    next(createdError);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const user = req.body.idUser;

    message = chalk.green(`${logPrefixGet}Searching messages for: ${user}.`);
    debug(message);

    const messages = await Message.find({
      idUser: user,
      idPenguin: req.body.idPenguin,
    });

    message = chalk.green(`${logPrefixGet}Total found: ${messages.length}.`);
    debug(message);

    message = chalk.green(`${logPrefixGet}Finished successfully.`);
    debug(message);

    res.status(200).json({ messages });
  } catch (err) {
    err.message = `${logPrefixGet}getMessages() getting messages`;
    err.code = 404;

    next(err);
  }
};

module.exports = { createMessage, getMessages };
