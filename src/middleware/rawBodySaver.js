module.exports = (req, _res, next) => {
    let buf = '';
    req.on('data', chunk => buf += chunk);
    req.on('end', () => {
        req.rawBody = buf;
        next();
    });
};
