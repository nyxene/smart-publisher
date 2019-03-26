const TextToPng = require('../controllers/textToPng');

const POST_MAX_LENGTH = 2200;
const COLOR_PATTERN = '^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$';

class Converter {
    constructor({
        postMaxLength: postMaxLength = POST_MAX_LENGTH,
        textColor = '',
        bgColor = ''
    } = {}) {
        this.postMaxLength = postMaxLength;
        this.textColor = textColor;
        this.bgColor = bgColor;
    }

    run(originalPost) {
        const { post, otherText } = this.preparePost(originalPost);
        const options = {
            textColor: this.textColor,
            bgColor: this.bgColor
        };

        let covers = [];

        if (!!otherText) {
            const t2p = new TextToPng(options);
            covers = t2p.render(otherText);
        }

        return { post, covers };
    }

    preparePost(originalPost) {
        if (!originalPost || typeof originalPost !== 'string') {
            throw new Error('Error when prepare post. Post is empty or not string');
        }

        const post = originalPost.trim();

        return {
            post: post.substring(0, this.postMaxLength),
            otherText: post.substring(this.postMaxLength)
        };
    }
}

function validateOptions(options) {
    return Object.keys(options).reduce((result, key) => {
        if (key === 'textColor' || key === 'bgColor') {
            const isValid = _validateColor(options[key]);

            if (!isValid) {
                result.hasError = true;
                result.errorsField.push(key);
            }
        }

        return result;
    }, { hasError: false, errorsField: [] });
}

function _validateColor(color) {
    return new RegExp(COLOR_PATTERN).test(color);
}

module.exports = {
    Converter,
    validateOptions
};
