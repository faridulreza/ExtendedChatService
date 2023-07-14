const router = require("express").Router();
const { queues, generationTarget } = require("../../pipelines/queue"); //<-- add more brunches here to make the system be able to generate more things
const { Configuration, OpenAIApi } = require("openai");
const {
  FILE_GENERATING,
  ERROR_GETTING_CHAT_RESPONSE,
  ALL_DONE,
} = require("./../../status_codes");
const { getDatabase } = require("firebase-admin/database");
// System role for gpt3.5 turbo
// detail: https://platform.openai.com/docs/api-reference/chat
let systemRole = "You will act as a normal Assistant. But";

//build the complete system role
generationTarget.forEach((branch) => {
  systemRole +=
    `\nif user wants to make/generate a ${branch} ` +
    `about any topic and topic is given you MUST ONLY reply with 'GENERATING ${branch.toUpperCase()}##'.`;
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  try {
    //build the message array . includes the previous messages
    let prevMessage = req.body.prevMessage;
    //only take last 4 messages
    if (prevMessage.length > 5) {
      prevMessage = prevMessage.slice(prevMessage.length - 5);
    }

    let messages = [
      { role: "system", content: systemRole },
      ...req.body.prevMessage,
      { role: "user", content: req.body.text },
    ];

    //get response from gpt3.5 turbo
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      max_tokens: 512,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    let choice = response.data.choices[0];

    if (choice.finish_reason === "length") {
      choice.message.content = choice.message.content + "...";
    }

    //if the system wants to generate something
    //create a job for the specific task queue
    if (choice.message.content.startsWith("GENERATING ")) {
      let end = choice.message.content.indexOf("##");
      let msg = choice.message.content.substring(11, end).trim();
      msg = msg.toLocaleLowerCase();

      //remove any punctuation
      const target = msg.replace(/[.,\/#!$%\^&\*;:{}=\-`~()]/g, "");
      console.log(choice.message, target);
      queues[target]
        .createJob({
          text: req.body.text,
          updatePath: req.updatePath,
          uid: req.user.uid,
        })
        .save();

      await getDatabase().ref(req.updatePath).set({
        code: FILE_GENERATING,
        message: choice.message.content,
      });
    } else {
      await getDatabase().ref(req.updatePath).set({
        code: ALL_DONE,
        message: choice.message.content,
      });
    }

    //send response
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(405).json({
      message: "Please try again..",
      code: ERROR_GETTING_CHAT_RESPONSE,
    });
  }

  // res.status(200).json({ text: req.body.text });
};
