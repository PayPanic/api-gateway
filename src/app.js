// api-gateway/src/app.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/payments', createProxyMiddleware({
    target: process.env.PAYMENT_SERVICE_URL,
    changeOrigin: true
}));

app.use('/transaction', createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true
}));

app.get('/', (req, res) => res.send('API Gateway is up and running'));
app.listen(PORT, () => console.log(`Gateway listening on ${PORT}`));
