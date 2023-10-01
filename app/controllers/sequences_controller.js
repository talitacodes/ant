const dbConnection = "";
const { getSequences } = require("../models/sequences_model");

module.exports.sequences = (app, req, res) => {
  //Chamada para o model do banco de dados.
  getSequences(dbConnection, (error, result) => {});
};
