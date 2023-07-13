const { getAuth } = require("firebase-admin/auth");

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 *
 * This middleware checks if the request has a valid token in the authorization header.
 * if the token is valid, it will add the firebase user object to the request object.
 */
const authorize = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(req.headers);
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    try {
      const auth = getAuth();
      const user = await auth.verifyIdToken(token);
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({
        message: "Invalid access token",
      });
    }
  } else {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = authorize;
