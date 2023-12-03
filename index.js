const app = require("./config/server");
const routes = require("./app/routes/routes");

routes.sequences(app);
routes.getSeq(app);
routes.saveSeq(app);
routes.updateSeq(app);
routes.deleteSeq(app);
routes.images(app);
routes.saveImage(app);
routes.deleteImage(app);
routes.login(app);
routes.signUp(app);
