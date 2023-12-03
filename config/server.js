let express = require("express");
let expressSession = require("express-session");
let crypto = require("crypto");

let app = express();
let port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.SECRET);
app.use(
  expressSession({
    secret: "zara",
    name: "uniqueSessionID",
    resave: false,
    saveUninitialized: false,
  })
);

app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});

module.exports = app;
