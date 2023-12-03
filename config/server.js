let express = require("express");
let expressSession = require("express-session");
let dotenv = require("dotenv");
let crypto = require("crypto");

dotenv.config();
let app = express();
let port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  expressSession({
    secret: process.env.SECRET,
    name: "uniqueSessionID",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
