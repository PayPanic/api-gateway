const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const verifyApiKeyProxy = require('../middleware/verifyApiKey');
const rawBodySaver = require('../middleware/rawBodySaver');

const router = express.Router();

router.post(
    '/payments',
    rawBodySaver,
    verifyApiKeyProxy,
    createProxyMiddleware({
        target: process.env.PAYMENT_SERVICE_URL,
        changeOrigin: true,
        selfHandleResponse: false,
        onProxyReq: (proxyReq, req) => {
            if (req.rawBody) {
                proxyReq.setHeader('Content-Type', 'application/json');
                proxyReq.setHeader('Content-Length', Buffer.byteLength(req.rawBody));
                proxyReq.write(req.rawBody);
            }
        }
    })
);

router.get(
    '/payments/:paymentId',
    createProxyMiddleware({
        target: process.env.PAYMENT_SERVICE_URL,
        changeOrigin: true
    })
);

router.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true
}));

router.use('/transaction', createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true
}));

module.exports = router;
