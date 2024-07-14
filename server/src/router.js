const authRouter = require('./api/auth/index');

function routes(app) {
    app.use('/auth', authRouter);
}

module.exports = routes;