const { sequences } = require("../controllers/sequences_controller");

module.exports = {
  sequences: function (app) {
    app.get("/", function (req, res) {
      sequences(app, req, res);
    });
  },
};
