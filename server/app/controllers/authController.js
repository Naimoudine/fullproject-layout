const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const tables = require("../../database/tables");

const login = async (req, res, next) => {
  try {
    //récupère l'utilisateur dans la base de donnée à l'aide de l'email
    const user = await tables.users.readByEmail(req.body.email);
    if (!user) {
      res.sendStatus(422);
      return;
    }

    //vérifie que le pwd entrée est le même que celui hash dans la base de données
    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password
    );

    //si mdp bon return user sans mdp et token
    if (verified) {
      delete user.hashed_password;

      const token = await jwt.sign(
        { sub: user.id, isAdmin: user.is_Admin },
        process.env.APP_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({ user, token });
    } else {
      res.sendStatus(422);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
