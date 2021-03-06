const config = require("config");
const { authPublicKey } = require("../startup/keysConfig");

const { decodeToken } = require("../helpers/generateToken");

module.exports = async (req, res, next) => {
  // 401 Unauthorized
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // config.get('jwtPrivateKey')
    const decoded = await decodeToken(token, authPublicKey);
    req.info = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
