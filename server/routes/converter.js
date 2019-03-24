const { basePath } = require('../helpers');

const { Converter, validateOptions } = require('../controllers/converter');

const converterHandler = (req, res, next) => {
    const post = req.body.post;
    const options = req.body.options;

    const { hasError, errorsField } = validateOptions(options);

    console.log('hasError', hasError);
    console.log('errorsField', errorsField);

    if (hasError) {
        res.send(400, { errors: `This options no valid: ${errorsField.join(', ')}` });
        return next();
    }

    const c = new Converter(options);
    const result = c.run(post);

    res.send(200, result);
    return next();
};

module.exports = server => {
    server.post(basePath('/converter'), converterHandler);
};
