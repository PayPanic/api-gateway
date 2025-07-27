const helmet = require('helmet');
const cors = require('cors');

module.exports = (app) => {
    // add security headers
    app.use(helmet());
    // allow cookies if ever needed later
    app.use(cors({ origin: true, credentials: true }));
};