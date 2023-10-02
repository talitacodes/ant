const conn = require("../../config/connection");
const { getSequences, addSeq } = require("../models/sequences_model");

module.exports.sequences = (app, req, res) => {
  //Chamada para o model do banco de dados.
  console.log("getSequences");
  dbConn = conn();
  getSequences(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    if (error) {
      res.send("Problema ao conectar ao banco");
    } else {
      console.log(result);
      res.send(result);
    }
  });
};

module.exports.addSeq = (app, req, res) => {
  // Chamada para o model do banco de dados.
  console.log("[Controller add seq]");
  const dbConn = conn();
  const seq = req.body;
  console.log(seq);
  addSeq(seq, dbConn, (error, result) => {
    console.log(error);
    res.send("Sequência criada com sucesso!");
  });
};
