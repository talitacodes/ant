const {
  sequences,
  getSeq,
  addSeq,
  updateSeq,
  deleteSeq,
} = require("../controllers/sequences_controller");
const {
  images,
  addImage,
  deleteImage,
} = require("../controllers/image_controller");

const {
  authenticateUser,
  addUser,
} = require("../controllers/login_controller");

const { check, validationResult } = require("express-validator");

function authenticate(req, res, next) {
  console.log("Auth");
  if (req.session && req.session.user) {
    console.log(req.session + req.session.user);
    return next();
  } else {
    return res.status(401).send("Acesso não autorizado");
  }
}
module.exports = {
  login: function (app) {
    app.post("/login", (req, res) => {
      authenticateUser(app, req, res);
    });
  },
  signUp: function (app) {
    app.post("/signUp", (req, res) => {
      addUser(app, req, res);
    });
  },
  sequences: function (app) {
    app.get("/seq", function (req, res) {
      sequences(app, req, res);
    });
  },
  getSeq: function (app) {
    app.get("/seq/:id", function (req, res) {
      getSeq(app, req, res);
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
      check("image_url").isURL().withMessage("image_url deve ser link!"),
      authenticate,
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
      authenticate,
      check("name")
        .isLength({ min: 5, max: 100 })
        .withMessage("Nome entre 5 e 100 caract"),
      check("sign_language").isBoolean().withMessage("true ou false"),
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
  updateSeq: (app) => {
    app.put(
      "/updateseq/:id",
      authenticate,
      check("name")
        .isLength({ min: 5, max: 100 })
        .withMessage("Nome entre 5 e 100 caract"),
      check("sign_language").isBoolean().withMessage("true ou false"),
      function (req, res) {
        const validation = validationResult(req);
        console.log(JSON.stringify(validation.errors, null, 2));
        if (validation.errors.length > 0) {
          res.send({ errors: validation.errors });
        } else {
          updateSeq(app, req, res);
        }
      }
    );
  },
  deleteSeq: (app) => {
    app.delete(
      "/deleteSeq/:id",
      authenticate,
      [
        check("id")
          .isLength({ min: 1, max: 250 })
          .withMessage("Necessário entrar com o id da sequência"),
        check("id")
          .isNumeric()
          .withMessage("Necessário entrar com o id numérico da sequência"),
      ],
      function (req, res) {
        const validation = validationResult(req);
        console.log(JSON.stringify(validation.errors, null, 2));
        if (validation.errors.length > 0) {
          res.send({ errors: validation.errors });
        } else {
          deleteSeq(app, req, res);
        }
      }
    );
  },
  deleteImage: (app) => {
    app.delete(
      "/deleteImage",
      authenticate,
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
