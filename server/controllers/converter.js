const MAIN_TEXT_MAX_LENGTH = 2200;
const OTHER_TEXT_MAX_LENGTH = 560;
const ERROR_MESSAGE = 'Not a string';

class Converter {
    constructor({ post = '', mainTextMaxLength = MAIN_TEXT_MAX_LENGTH, otherTextMaxLength = OTHER_TEXT_MAX_LENGTH }) {
        this.originalPost = post;
        this.mainTextMaxLength = mainTextMaxLength;
        this.otherTextMaxLength = otherTextMaxLength;
    }

    preparePost() {
        if (typeof this.originalPost !== 'string') {
            throw new Error(ERROR_MESSAGE);
        }

        let s = this.originalPost.trim();
        let maxLength = this.mainTextMaxLength;
        let mainText = '';
        const otherText = [];

        while (s.length > maxLength) {
            let pos = s.substring(0, maxLength).lastIndexOf(' ');

            pos = pos <= 0 ? maxLength : pos;

            if (!mainText) {
                mainText = s.substring(0, pos);
                maxLength = this.otherTextMaxLength;
            } else {
                otherText.push(s.substring(0, pos));
            }

            let i = s.indexOf(' ', pos) + 1;
            if (i < pos || i > pos + maxLength) {
                i = pos;
            }

            s = s.substring(i);
        }

        if (!mainText) {
            mainText = s;
        } else {
            otherText.push(s);
        }

        return { mainText, otherText };
    }
}

module.exports = Converter;
