const axios = require('axios');

module.exports = async function verifyApiKeyProxy(req, res, next) {
    const apiKey   = req.get('x-api-key');
    const signature= req.get('x-signature');
    const raw      = req.rawBody;

    if (!apiKey || !signature || !raw) {
        return res.status(401).json({ error: 'Missing API key or signature' });
    }

    try {
        await axios({
            method:  'POST',
            url:     `${process.env.AUTH_SERVICE_URL}/auth/merchants/validate`,
            data:    raw,
            headers: {
                'Content-Type': 'application/json',
                'x-api-key':    apiKey,
                'x-signature':  signature,
            }
        });
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid API key or signature' });
    }
};
