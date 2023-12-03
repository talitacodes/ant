const connection = "../../config/connection";

module.exports = {
  addUser: (user, connection, callback) => {
    console.log("[User Model]", user);
    const sql = `INSERT INTO users (username, password) VALUES ("${user.username}", "${user.password}")`;
    console.log("[User model]", sql);
    connection.query(sql, callback);
  },

  authenticateUser: (user, connection, callback) => {
    console.log("[User Model]", user);
    const sql = `SELECT * FROM users WHERE username = "${user.username}" AND password = "${user.password}"`;
    console.log("[User model]", sql);
    connection.query(sql, callback);
  },
};
