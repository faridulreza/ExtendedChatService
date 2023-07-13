const router = require("express").Router();
const authorize = require("./../../middlewires/authorization.js");

// This middleware validates the request body.
const chatRequestValidator = require("./../../middlewires/chatRequestValidator.js");

// This middleware converts the file to text. (the file can be pdf, image or audio)
const fileToText = require("./../../middlewires/fileToText.js");

// All routes in this file are protected by the authorize middleware.
// This means that the request must have a valid access token in the authorization header.
router.use(authorize);

router.post("/chat", chatRequestValidator, fileToText, require("./chat.js"));

module.exports = router;
