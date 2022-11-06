const chalk = require("chalk");
const debug = require("debug")(chalk.blue("AAP:MControllers"));
const jwt = require("jsonwebtoken");
const Message = require("../../../db/models/Message/Message");
const { customError } = require("../../utils/customError");

const logPrefix = chalk.white("User Request--> ");
const logPrefixCreate = chalk.blue(`${logPrefix}CREATE MESSAGE: `);
const logPrefixGet = chalk.blue(`${logPrefix}GET MESSAGES: `);

let prompt = "";

const createMessage = async (req, res, next) => {
  const { idUser, idPenguin, subject, content, data, read } = req.body;

  prompt = `${logPrefixCreate}Subject: ${subject}`;

  debug(chalk.green(prompt));

  try {
    const newMessage = await Message.create({
      idUser,
      idPenguin,
      subject,
      content,
      data,
      read,
    });

    debug(
      chalk.green(
        `${logPrefixCreate}${newMessage.subject} message successfully created.`
      )
    );

    res.status(201).json({ newMessage });
  } catch (error) {
    prompt = `${logPrefixCreate}ERROR ${error.message}`;

    debug(chalk.red(prompt));
    const createdError = customError(400, prompt, error.message);

    next(createdError);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { idPenguin } = req.params;
    const { authorization } = req.headers;
    const token = authorization.replace("Bearer ", "");
    const { username, id } = jwt.verify(token, process.env.JWT_SECRET);

    prompt = chalk.green(`${logPrefixGet}Searching messages for: ${username}.`);
    debug(prompt);

    const messages = await Message.find({
      idUser: id,
      idPenguin,
    });

    prompt = chalk.green(`${logPrefixGet}Total found: ${messages.length}.`);
    debug(prompt);

    prompt = chalk.green(`${logPrefixGet}Finished successfully.`);
    debug(prompt);

    res.status(200).json({ messages });
  } catch (err) {
    err.message = `${logPrefixGet}getMessages() getting messages`;
    err.code = 404;

    next(err);
  }
};
const getMessage = async (req, res, next) => {
  try {
    const { idMessage } = req.params;

    prompt = chalk.green(`${logPrefixGet}Searching message id: ${idMessage}.`);
    debug(prompt);

    const message = await Message.find({
      idMessage,
    });

    prompt = chalk.green(`${logPrefixGet}Found: ${message.subject}.`);
    debug(prompt);

    prompt = chalk.green(`${logPrefixGet}Finished successfully.`);
    debug(prompt);

    res.status(200).json({ message });
  } catch (err) {
    err.message = `${logPrefixGet}getMessage() getting message`;
    err.code = 404;

    next(err);
  }
};
module.exports = { createMessage, getMessages, getMessage };
