const path = require('path');
const { createCanvas, registerFont } = require('canvas');

registerFont(path.join(__dirname, '/PT_Serif-Web-Regular.ttf'), { family: 'PT Serif Regular' });

const COLOR_BASE = Object.freeze({
    BLACK: 'black',
    WHITE: 'white'
});

const TEXT_ALIGN = Object.freeze({
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right'
});

const SIZE = 2048;
const FONT_SIZE = SIZE / 25;
const LINE_HEIGHT = FONT_SIZE * 1.4;
const FONT_FAMILY = 'PT Serif Regular, serif';
const FONT_DEFAULT = `normal ${FONT_SIZE}px ${FONT_FAMILY}`;

const MAX_LINE = 17;

class TextToPng {
    constructor({
        font = FONT_DEFAULT,
        textColor = COLOR_BASE.BLACK,
        textAlign = TEXT_ALIGN.LEFT,
        bgColor = COLOR_BASE.WHITE,
        padding = 0,
        borderWidth = 0,
        borderColor = COLOR_BASE.BLACK
    } = {}) {
        this.font = font;
        this.textColor = textColor;
        this.textAlign = textAlign;
        this.bgColor = bgColor;
        this.padding = Number(padding);
        this.borderWidth = Number(borderWidth);
        this.borderColor = borderColor;
    }

    render(text) {
        if (!text || typeof text !== 'string') {
            throw new Error('Error when render text. Text is empty or not string');
        }

        const textBlocks = TextToPng.getTextBlocks(text);

        // TODO Think of a more effective solution
        return textBlocks.map(textBlock => {
            const canvas = createCanvas(SIZE, SIZE);
            const ctx = canvas.getContext('2d');
            let textY = 0;

            ctx.globalAlpha = 1;
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = this.textColor;
            ctx.font = FONT_DEFAULT;
            ctx.textBaseline = 'top';

            textBlock.forEach(textLine => {
                ctx.fillText(textLine, 20, textY);
                textY += LINE_HEIGHT;
            });

            return canvas.toDataURL('image/png');
        });
    }

    static getTextBlocks(text) {
        const canvas = createCanvas(SIZE, SIZE);
        const ctx = canvas.getContext('2d');

        const textX = 0;
        let textY = 0;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FONT_DEFAULT;
        ctx.textBaseline = 'top';

        let words = text.split(' ');
        let wordCount = words.length;

        let line = '';
        const addNewLines = [];

        let count = 0;
        const textBlocks = [];

        for (let n = 0; n < wordCount; n++) {
            let word = words[n];

            if (/\n/.test(words[n])) {
                const parts = words[n].split('\n');
                word = parts.shift();
                addNewLines.push(n + 1);
                words.splice(n + 1, 0, parts.join('\n'));
                wordCount += 1;
            }

            const testLine = line + word + ' ';
            const testLineWidth = ctx.measureText(testLine).width;

            if (addNewLines.indexOf(n) > -1 || testLineWidth > SIZE - 20 && n > 0) { // TODO Improve
                ctx.fillText(line, textX, textY);

                if (!textBlocks[count]) {
                    textBlocks.push([]);
                }
                textBlocks[count].push(line);
                if (textBlocks[count].length > MAX_LINE) {
                    count++;
                }

                line = word + ' ';
                textY += LINE_HEIGHT;
            } else {
                line = testLine;
            }
        }

        textBlocks[count].push(line);

        return textBlocks;
    }
}

module.exports = TextToPng;
