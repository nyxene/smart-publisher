module.exports = server => {
    server.pre((req, res, next) => {
        req.log.debug('🔎 [%s] [%s]', req.method, req.url);
        next();
    });
};
