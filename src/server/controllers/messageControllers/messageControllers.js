const chalk = require("chalk");
const debug = require("debug")(chalk.blue("AAP:MControllers"));
const jwt = require("jsonwebtoken");
const Message = require("../../../db/models/Message/Message");
const { customError } = require("../../utils/customError");

const logPrefix = chalk.white("User Request--> ");
const logPrefixCreate = chalk.blue(`${logPrefix}CREATE Message: `);
const logPrefixGet = chalk.blue(`${logPrefix}GET Messages: `);
const logPrefixGetOne = chalk.blue(`${logPrefix}GET Message: `);
const logPrefixEdit = chalk.blue(`${logPrefix}EDIT Message: `);
const logPrefixDelete = chalk.blue(`${logPrefix}DELETE Message: `);

let prompt = "";

const createMessage = async (req, res, next) => {
  const { idUser, idPenguin, subject, content, data } = req.body;

  prompt = `${logPrefixCreate}Subject: ${subject}`;

  debug(chalk.green(prompt));

  try {
    const newMessage = await Message.create({
      idUser,
      idPenguin,
      subject,
      content,
      data,
      read: false,
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

    if (idMessage !== "undefined") {
      prompt = chalk.green(
        `${logPrefixGetOne}Searching message id: ${idMessage}.`
      );
      debug(prompt);

      const message = await Message.find({
        _id: idMessage,
      });

      prompt = chalk.green(`${logPrefixGetOne}Found: ${message[0].subject}.`);
      debug(prompt);

      prompt = chalk.green(`${logPrefixGetOne}Finished successfully.`);
      debug(prompt);

      res.status(200).json(message[0]);
    } else {
      prompt = chalk.red(
        `${logPrefixGetOne}Message id: ${idMessage}, search canceled.`
      );
      debug(prompt);
    }
  } catch (err) {
    err.message = `${logPrefixGetOne}getMessage() getting message`;
    err.code = 404;

    next(err);
  }
};

const editMessage = async (req, res) => {
  const type = req.query.task;
  let message = "";
  try {
    const { idMessage } = req.params;
    const messageEdited = {
      subject: req.body.subject,
      content: req.body.content,
      data: req.body.data,
      read: req.body.read,
      idUser: req.body.idUser,
      idPenguin: req.body.idPenguin,
    };
    message = chalk.green(`${logPrefixEdit}${messageEdited.subject}->${type}`);
    debug(message);

    await Message.findByIdAndUpdate(idMessage, messageEdited, {
      new: true,
    });

    message = chalk.green(`${logPrefixEdit}Finished successfully.`);
    debug(message);

    res.status(200).json(messageEdited);
  } catch (error) {
    message = chalk.red(
      `${logPrefixEdit}ERROR-> ${error} (err.code: ${error.code})`
    );

    debug(message);

    error.customMessage = `${logPrefixEdit}${type}. ERROR Message not found.`;
    error.code = 400;
  }
};

const deleteMessage = async (req, res, next) => {
  const { idMessage } = req.params;
  let message = "";

  message = chalk.green(`${logPrefixDelete}id: ${idMessage}`);
  debug(message);

  try {
    await Message.findByIdAndDelete(idMessage);

    message = chalk.green(`${logPrefixDelete}id: ${idMessage} successfully.`);
    debug(message);

    res.status(200).json({ msg: "Message deleted" });
  } catch (err) {
    message = chalk.red(`${logPrefixDelete}ERROR: Message id not found`);
    debug(message);

    err.message = `${logPrefixDelete}Message id not found`;
    err.code = 404;

    next(err);
  }
};

module.exports = {
  editMessage,
  deleteMessage,
  createMessage,
  getMessages,
  getMessage,
};
