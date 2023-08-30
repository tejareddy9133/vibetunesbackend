const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = async (req, res, next) => {
  // console.log("auth")
  try {
    let token = req?.headers?.authorization?.split(" ")[1];
    //check if token is present in headers
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    token = req.headers.authorization.split(" ")[1];
    //verify token
    const isTokenValid = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!isTokenValid) {
      return res.status(401).json({ message: "not authorized" });
    }
    req.body.userId = isTokenValid.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Something went wrong please try again",
      error: error.message,
    });
  }
};

module.exports = { authenticator };



