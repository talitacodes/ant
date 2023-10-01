let express = require("express");
let bodyparser = require("body-parser");

let app = express();
let port = 3001;

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
