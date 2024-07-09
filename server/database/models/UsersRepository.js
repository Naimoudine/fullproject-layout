const database = require("../client");

class UsersRpository {
  constructor({ table }) {
    this.table = table;
    this.database = database;
  }

  //CRUD
  async readAll() {
    const [rows] = await this.database.query(
      `select id, email, hashed_password from ${this.table}`
    );
    return rows;
  }

  async readByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email= ?`,
      [email]
    );
    return rows[0];
  }

  async create(user) {
    const [rows] = await this.database.query(
      `insert into ${this.table} (email, hashed_password) values (?, ?)`,
      [user.email, user.hashedPassword]
    );

    return [rows].insertId;
  }
}

module.exports = UsersRpository;
