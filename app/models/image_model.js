const connection = "../../config/connection";

module.exports = {
  getImages: (connection, callback) => {
    const sql = "SELECT * FROM images;";
    connection.query(sql, callback);
  },
  addImage: (image, connection, callback) => {
    const sql = `INSERT INTO images (image_url) VALUES ("${image.image_url}")`;
    connection.query(sql, callback);
  },
  deleteImage: (image, connection, callback) => {
    const sql = `DELETE FROM images WHERE id = "${image.id}"`;
    connection.query(sql, callback);
  },
};
