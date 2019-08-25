const { Converter, validateConfig } = require('../controllers/converter');
const { basePath } = require('../helpers');

const converterHandler = (req, res, next) => {
    const post = req.body.post;
    const config = req.body.config;

    const { hasError, errorsField } = validateConfig(config);

    if (hasError) {
        res.send(400, {
            errors: `This config no valid: ${errorsField.join(', ')}`
        });
        return next();
    }

    const c = new Converter(config);
    const result = c.run(post);

    res.send(200, result);
    return next();
};

module.exports = server => {
    server.post(basePath('/converter'), converterHandler);
};
