/**
 *
 * @param {*} req
 * @param {*} res
 *
 * Checks if the request body has the required fields.
 * The body must have These schema:
 * {
 *  timestamp: number,
 *  text: string,
 *  //text or these two fields
 *  file: URL,
 *  fileType: string
 * }
 */

const reqObjectValidator = (req, res) => {
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

  if (!req.body.text || !(req.body.file && req.body.fileType)) {
    res.status(400).json({
      message: "Missing text or file information",
    });

    return;
  }

  next();
};
