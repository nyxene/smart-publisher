const { basePath } = require('../helpers');

const Converter = require('../controllers/converter');

const converterHandler = (req, res, next) => {
    const post = req.body.post;

    const c = new Converter({post, mainTextMaxLength: 1704, otherTextMaxLength: 560});
    const result = c.preparePost();

    res.send(200, result);
    return next();
};

module.exports = server => {
    server.post(basePath('/converter'), converterHandler);
};
