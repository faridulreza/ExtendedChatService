const router = require("express").Router();

// System role for gpt3.5 turbo
// detail: https://platform.openai.com/docs/api-reference/chat
let systemRole = "You will act as a normal Assistant. But";

// instruct the system to reply with a specific keyword
// to brunch to a specific pipeline
const systemBrunches = ["book", "kid's book", "blog"];

//build the complete system role
systemBrunches.forEach((brunch) => {
  systemRole +=
    `\nif user wants to make/generate a ${brunch} ` +
    `about any topic you must reply with '$GENERATE$ #${brunch.toUpperCase()}'.`;
});

async (req, res) => {};
