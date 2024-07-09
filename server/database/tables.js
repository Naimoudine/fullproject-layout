//permet de créer des instances de nos class modèle avec les différentes méthods afin d'intéragir avec la base de donnée

const ConsultationsRepository = require("./models/ConsultationsRepository");
const UsersRpository = require("../database/models/UsersRepository");

const tables = {};

tables.consultations = new ConsultationsRepository({ table: "Consultations" });
tables.users = new UsersRpository({ table: "Users" });

module.exports = tables;
