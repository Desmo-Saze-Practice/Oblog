module.exports = (req, res, next) => {
    req.on('end', () => {
        let logStr = `[${new Date().toISOString()} ${req.ip} ${req.originalUrl} status:${res.statusCode}]`;

        console.log(logStr);
    });

    next();
}