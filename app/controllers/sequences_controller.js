const conn = require("../../config/connection");
const {
  getSequences,
  getSeq,
  addSeq,
  updateSeq,
  deleteSeq,
  checkIdSeq,
} = require("../models/sequences_model");

module.exports.sequences = (app, req, res) => {
  console.log("getSequences");
  const dbConn = conn();
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

module.exports.getSeq = (app, req, res) => {
  console.log("getSeq");
  const dbConn = conn();
  const { id } = req.params;
  checkIdSeq(id, dbConn, (error, result) => {
    if (error) {
      res.send("Problema ao conectar ao banco");
      console.log(error);
    }
    const count = result[0].count;
    if (count === 0) {
      res.status(404).send("ID não encontrado no banco de dados");
    } else {
      getSeq(id, dbConn, (error, result) => {
        console.log(error);
        console.log(result);
        if (error) {
          res.send("Problema ao conectar ao banco");
        } else {
          console.log(result);
          res.send(result);
        }
      });
    }
  });
};

module.exports.addSeq = (app, req, res) => {
  console.log("[Controller add seq]");
  const dbConn = conn();
  const seq = req.body;
  console.log(seq);
  addSeq(seq, dbConn, (error, result) => {
    if (error) {
      res.send("Problema ao conectar ao banco");
      console.log(error);
    }

    res.send("Sequência criada com sucesso!");
  });
};

module.exports.updateSeq = (app, req, res) => {
  console.log("[Controller update seq]");
  const dbConn = conn();
  const seq = req.body;
  const { id } = req.params;
  console.log(seq, id);
  checkIdSeq(id, dbConn, (error, result) => {
    if (error) {
      res.send("Problema ao conectar ao banco");
      console.log(error);
    }
    const count = result[0].count;
    if (count === 0) {
      res.status(404).send("ID não encontrado no banco de dados");
    } else {
      updateSeq(seq, id, dbConn, (error, result) => {
        console.log("Seq Update Controller");

        if (error) {
          res.send("Problema ao conectar ao banco");
          console.log(error);
        }

        res.send("Sequência alterada com sucesso!");
      });
    }
  });
};

module.exports.deleteSeq = (app, req, res) => {
  console.log("[Controller delete seq]");
  const dbConn = conn();
  const { id } = req.params;

  checkIdSeq(id, dbConn, (error, result) => {
    if (error) {
      res.send("Problema ao conectar ao banco");
      console.log(error);
    }
    const count = result[0].count;
    if (count === 0) {
      res.status(404).send("ID não encontrado no banco de dados");
    } else {
      deleteSeq(id, dbConn, (error, result) => {
        if (error) {
          res.send("Problema ao conectar ao banco");
          console.log(error);
        }
        res.send("Sequência apagada com sucesso!");
      });
    }
  });
};
