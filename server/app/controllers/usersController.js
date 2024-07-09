const database = require("../../database/tables");

//BREAD

const browse = async (req, res, next) => {
  try {
    const users = await database.users.readAll();
    console.log(users);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  const user = req.body;

  try {
    const insertedId = await database.users.create(user);
    return res.status(201).json({ insertedId });
  } catch (error) {
    next(error);
  }
};

module.exports = { browse, add };
