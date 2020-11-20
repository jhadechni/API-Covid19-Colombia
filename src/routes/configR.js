const routers = require('./routes')

const routes = (app) => {
    app.use("/api", routers);
};

module.exports = routes;