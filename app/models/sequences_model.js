const connection = "../../config/connection";

module.exports = {
  getSequences: (connection, callback) => {
    const sql =
      "SELECT seq.seq_id, seq.name, GROUP_CONCAT(images.image_url) AS images_list FROM seq LEFT JOIN images ON seq.seq_id = images.seq_id GROUP BY seq.seq_id, seq.name;";
    connection.query(sql, callback);
  },
  addSeq: (seq, connection, callback) => {
    const sql = `INSERT INTO seq (name, sign_language) VALUES ("${seq.name}",${seq.sign_language})`;
    connection.query(sql, callback);
  },
};
