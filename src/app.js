require('dotenv').config();
const express = require('express');
const applySecurity = require('./config/security');
const logger = require('./middleware/logger');
const rateLimiter = require('./middleware/rateLimiter');
const proxyRoutes = require('./routes/proxy.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security headers, etc.
applySecurity(app);

app.use(logger);
app.use(rateLimiter);

// No `express.json()` here - let the downstream services handle it

app.use('/', proxyRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Gateway listening on port ${PORT}`));
