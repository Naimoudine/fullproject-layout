const tables = require("../../database/tables");

const read = (req, res, next) => {};

const browse = async (req, res, next) => {
  try {
    const consultations = await tables.consultations.readAll();

    res.json(consultations);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
};
