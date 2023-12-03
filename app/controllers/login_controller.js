const conn = require("../../config/connection");
const { addUser, authenticateUser } = require("../models/login_model");

module.exports.authenticateUser = (app, req, res) => {
  console.log("[Controller User Auth User]");

  let user = req.body;
  console.log(user);

  if (!user.username || !user.password) {
    return res.status(400).send("Nome de usuário e senha são obrigatórios");
  }

  const dbConn = conn();

  authenticateUser(user, dbConn, (error, result) => {
    console.log("[User AUTH controller error]", error);
    console.log("[User Controller]", result);

    if (result.length > 0) {
      console.log("Usuario autenticado");
      console.log(result);
      user = result[0];
      console.log("User controller req.session", req.session);
      req.session.user = {
        id: user.userid,
        email: user.email,
      };

      res.send("Login realizado com sucesso!");

      console.log("User controller req.session", req.session);
    } else {
      console.log("Falha na autenticação");

      req.session.destroy((err) => {
        if (err) {
          console.error("Erro ao destruir sessão:", err);
          return res.status(500).send("Erro ao destruir sessão");
        }
        res.status(401).send("Falha na autenticação");
      });
    }
  });
};

module.exports.addUser = (app, req, res) => {
  const dbConn = conn();
  let user = req.body;
  console.log(user);
  addUser(user, dbConn, (error, result) => {
    console.log("[User AUTH controller error]", error);
    console.log("[User ADD Controller]", result);

    if (!error) {
      console.log(result);
      user = result[0];
      res.send("Usuário criado com sucesso!");
    } else {
      console.log("Falha ao criar usuário!");
      res.send("Falha ao criar usuário!");
    }
  });
};
