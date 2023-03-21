import { Configuration, OpenAIApi } from "openai";

const fs = require("fs");

const configuration = new Configuration({
  organization: "org-iYqhA2GWPlUV904PAIUmjvv9",
  apiKey: process.env.OPENAI_API_KEY,
});

const openaiEdit = async (req, res, next) => {
  const openai = new OpenAIApi(configuration);
  const responseEdit = await openai.createImageEdit(
    fs.createReadStream("otter.png"),
    fs.createReadStream("mask.png"),
    "A cute baby sea otter wearing a beret",
    2,
    "1024x1024"
  );
};

module.exports = openaiEdit;
