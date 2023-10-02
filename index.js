const app = require("./config/server");
const routes = require("./app/routes/routes");

routes.sequences(app);
routes.saveSeq(app);
routes.images(app);
routes.saveImage(app);
routes.deleteImage(app);
