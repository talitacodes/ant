const { sequences, addSeq } = require("../controllers/sequences_controller");
const {
  images,
  addImage,
  deleteImage,
} = require("../controllers/image_controller");
const { check, validationResult } = require("express-validator");

module.exports = {
  sequences: function (app) {
    app.get("/seq", function (req, res) {
      sequences(app, req, res);
    });
  },
  images: function (app) {
    app.get("/images", function (req, res) {
      images(app, req, res);
    });
  },
  saveImage: (app) => {
    app.post(
      "/newImage",
      [check("image_url").isURL().withMessage("image_url deve ser link!")],
      function (req, res) {
        const validation = validationResult(req);
        console.log(JSON.stringify(validation.errors, null, 2));
        if (validation.errors.length > 0) {
          res.send({ errors: validation.errors });
        } else {
          addImage(app, req, res);
        }
      }
    );
  },
  saveSeq: (app) => {
    app.post(
      "/newSeq",
      check("name")
        .isLength({ min: 5, max: 100 })
        .withMessage("Nome entre 5 e 100 caract"),
      [check("sign_language").isEmpty().withMessage("true ou false")],
      [check("sign_language").isBoolean().withMessage("true ou false")],
      function (req, res) {
        const validation = validationResult(req);
        console.log(JSON.stringify(validation.errors, null, 2));
        if (validation.errors.length > 0) {
          res.send({ errors: validation.errors });
        } else {
          addSeq(app, req, res);
        }
      }
    );
  },
  deleteImage: (app) => {
    app.delete(
      "/deleteImage",
      [
        check("id")
          .isLength({ min: 1, max: 250 })
          .withMessage("Necessário entrar com o id da imagem"),
        check("id")
          .isNumeric()
          .withMessage("Necessário entrar com o id numérico da imagem"),
      ],
      function (req, res) {
        const validation = validationResult(req);
        console.log(JSON.stringify(validation.errors, null, 2));
        if (validation.errors.length > 0) {
          res.send({ errors: validation.errors });
        } else {
          deleteImage(app, req, res);
        }
      }
    );
  },
};
