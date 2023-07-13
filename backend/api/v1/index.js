const router = require("express").Router();
const authorize = require("./../../middlewires/authorization.js");

// This middleware validates the request body.
const chatRequestValidator = require("./../../middlewires/chatRequestValidator.js");

// All routes in this file are protected by the authorize middleware.
// This means that the request must have a valid access token in the authorization header.
router.use(authorize);

router.use("/chat", chatRequestValidator, require("./chat.js"));

module.exports = router;
