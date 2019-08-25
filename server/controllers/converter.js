const Typograf = require('typograf');

const TextToPng = require('../controllers/textToPng');

const MAIN_TEXT_MAX_LENGTH = 2200;

class Converter {
    constructor({
        mainTextMaxLength = MAIN_TEXT_MAX_LENGTH,
        textColor = '',
        bgColor = ''
    } = {}) {
        this.mainTextMaxLength = mainTextMaxLength;
        this.textColor = textColor;
        this.bgColor = bgColor;

        this.typograf = new Typograf({ locale: ['ru', 'en-US'] });
        this.typograf.enableRule('common/nbsp/replaceNbsp');
    }

    run(originalText) {
        const { mainText, otherText } = this.prepare(originalText);
        const options = {
            textColor: this.textColor,
            bgColor: this.bgColor
        };

        let covers = [];

        if (!!otherText) {
            const t2p = new TextToPng(options);
            covers = t2p.render(otherText);
        }

        return { mainText, covers };
    }

    prepare(originalText) {
        const text = this.typograf.execute(originalText);

        return {
            // TODO: Add smart substring
            mainText: text.substring(0, this.mainTextMaxLength),
            otherText: text.substring(this.mainTextMaxLength)
        };
    }
}

function validateConfig(config) {
    return Object.keys(config).reduce(
        (result, key) => {
            if (key === 'textColor' || key === 'bgColor') {
                const isValid = _validateColor(config[key]);

                if (!isValid) {
                    result.hasError = true;
                    result.errorsField.push(key);
                }
            }

            return result;
        },
        { hasError: false, errorsField: [] }
    );
}

function _validateColor(color) {
    return new RegExp('^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$').test(color);
}

module.exports = {
    Converter,
    validateConfig
};
