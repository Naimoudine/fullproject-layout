const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
};

const verifyToken = (req, res, next) => {
  try {
    //recupréré le token dans le header authorization
    const autorizationHeaders = req.get("Authorization");

    if (!autorizationHeaders) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = autorizationHeaders.split(" ");

    //verifie que le header contient un bearer
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (error) {
    next(error);

    res.sendStatus(401);
  }
};

module.exports = { hashPassword, verifyToken };
