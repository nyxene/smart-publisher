module.exports = server => {
    server.on('restifyError', (req, res, err) => {
        res.status(err.status || 500);
        res.json(err.errors);
    });
};
