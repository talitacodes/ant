const connection = "../../config/connection";

module.exports = {
  getSequences: (connection, callback) => {
    const sql = `SELECT seq.seq_id, seq.name, GROUP_CONCAT(images.image_url) AS images_list FROM seq LEFT JOIN images ON seq.seq_id = images.seq_id GROUP BY seq.seq_id, seq.name;`;
    connection.query(sql, callback);
  },
  getSeq: (seqId, connection, callback) => {
    const sql = `SELECT seq.seq_id, seq.name, GROUP_CONCAT(images.image_url) AS images_list FROM seq LEFT JOIN images ON seq.seq_id = images.seq_id WHERE seq.seq_id = ${seqId} GROUP BY seq.seq_id, seq.name;`;
    connection.query(sql, callback);
  },
  checkIdSeq: (seqId, connection, callback) => {
    const sql = `SELECT COUNT(*) AS count FROM seq WHERE seq_id = "${seqId}"`;
    connection.query(sql, callback);
  },
  addSeq: (seq, connection, callback) => {
    const sql = `INSERT INTO seq (name, sign_language) VALUES ("${seq.name}",${seq.sign_language})`;
    connection.query(sql, callback);
  },
  updateSeq: (seq, seqId, connection, callback) => {
    console.log(seq.body, seqId);
    console.log("Seq Update Model");
    const sql = `UPDATE seq SET name = "${seq.name}", sign_language = ${seq.sign_language} WHERE seq_id = ${seqId}`;
    connection.query(sql, callback);
    console.log(sql);
  },
  deleteSeq: (seqId, connection, callback) => {
    const sql = `DELETE FROM seq WHERE seq_id = "${seqId}"`;
    connection.query(sql, callback);
  },
};
