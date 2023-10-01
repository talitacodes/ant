module.exports = {
  getSequences: (connection, callback) => {
    const sql = "select * from sequences;";
    connection.query(sql, callback);
  },
};
