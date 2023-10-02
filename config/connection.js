const mysql = require("mysql");

const host = "localhost";
const database = "ant";
const user = "root";
const password = "123456";

module.exports = () => {
  return (dbConn = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
  }));
};
