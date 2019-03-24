const { basePath } = require('../helpers');

const Converter = require('../controllers/converter');

const converterHandler = (req, res, next) => {
    const post = req.body.post;

    const c = new Converter();
    const result = c.run(post);

    res.send(200, result);
    return next();
};

module.exports = server => {
    server.post(basePath('/converter'), converterHandler);
};
