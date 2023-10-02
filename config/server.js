let express = require("express");

let app = express();
module.exports = app;
let port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log("Servidor rodando com express na porta", port);
});
