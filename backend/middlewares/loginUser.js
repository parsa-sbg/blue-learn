const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    req.user = null;
    return next();
  }

  try {
    const token = authorizationHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id).lean();

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    Reflect.deleteProperty(user, "password");

    req.user = user;

    next();
  } catch (error) {
    req.user = null;
    if (error instanceof jwt.TokenExpiredError) {
      error.message = "token expired";
    } else if (error instanceof jwt.JsonWebTokenError) {
      error.message = "token is not valid";
    } else {
      error.message = "Unexpected error";
    }
    console.log(error.message);
    next();
  }
};
