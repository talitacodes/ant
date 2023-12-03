const conn = require("../../config/connection");
const { getImages, addImage, deleteImage } = require("../models/image_model");

module.exports.images = (app, req, res) => {
  //Chamada para o model do banco de dados.
  console.log("getImages");
  dbConn = conn();
  getImages(dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    if (error) {
      res.send("Problema ao conectar ao banco");
    } else {
      console.log(result);
      console.log(error);
      res.send(result);
    }
  });
};

module.exports.addImage = (app, req, res) => {
  // aqui vamos fazer a chamada para o model do banco de dados.
  console.log("[Controller add image]");
  const dbConn = conn();
  const image = req.body;
  addImage(image, dbConn, (error, result) => {
    console.log(error);
    console.log(result);
    res.send("Imagem adicionada com sucesso!");
  });
};

module.exports.deleteImage = (app, req, res) => {
  // aqui vamos fazer a chamada para o model do banco de dados.
  console.log("[Controller delete image]");
  const dbConn = conn();
  const image = req.body;
  deleteImage(image, dbConn, (error, result) => {
    res.send("Imagem apagada com sucesso!");
  });
};
