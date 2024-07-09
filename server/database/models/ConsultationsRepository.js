const database = require("../client");

class ConsultationsRpository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  async readAll() {
    const [rows] = await this.database.query(
      `select id, startingTime, endingTime from ${this.table}`
    );

    return rows;
  }
}

module.exports = ConsultationsRpository;
