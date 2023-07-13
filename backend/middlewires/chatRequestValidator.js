/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Checks if the request body has the required fields.
 * The body must have These schema:
 * {
 *  timestamp: number,
 *  chatID: string,
 *  prevMessage: array of objects,
 *  text: string,
 *  //text or these two fields
 *  file: URL,
 *  fileType: string
 * }
 */

const reqObjectValidator = (req, res, next) => {
  if (!req.body) {
    res.status(400).json({
      message: "No request body",
    });

    return;
  }

  if (!req.body.timestamp) {
    res.status(400).json({
      message: "Missing timestamp",
    });

    return;
  }

  if (!req.body.chatID) {
    res.status(400).json({
      message: "Missing chatID",
    });

    return;
  }

  if (!req.body.prevMessage || typeof req.body.prevMessage !== "object") {
    res.status(400).json({
      message: "Missing previos messages",
    });
    return;
  }

  if (!req.body.text && !(req.body.file && req.body.fileType)) {
    res.status(400).json({
      message: "Missing text or file information",
    });

    return;
  }

  console.log(req.body);
  //build the path where we need to put update
  req.updatePath =
    req.user.uid + "/" + req.body.chatID + "/" + req.body.timestamp;

  console.log(req.updatePath);
  next();
};

module.exports = reqObjectValidator;
