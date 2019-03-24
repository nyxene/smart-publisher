import { Canvas, createCanvas } from 'canvas';

interface TextToPngProps {
    textColor?: string;
    bgColor?: string;
}

const SIZE: number = 2048;
const FONT_SIZE: number = SIZE / 25;
const LINE_HEIGHT: number = FONT_SIZE * 1.4;
const FONT_FAMILY: string = 'Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif';
const FONT_DEFAULT: string = `normal ${FONT_SIZE}px ${FONT_FAMILY}`;

const MAX_LINE: number = 16;

export default class TextToPng implements TextToPngProps {
    readonly font: string;
    readonly textColor: string;
    readonly bgColor: string;

    constructor({
        textColor = 'black',
        bgColor = 'white'
    } = {}) {
        this.font = FONT_DEFAULT;
        this.textColor = textColor;
        this.bgColor = bgColor;
    }

    public render(text: string): string[] {
        if (!text || typeof text !== 'string') {
            throw new Error('Error when render text. Text is empty or not string');
        }

        const textBlocks: Array<string[]> = this.getTextBlocks(text);

        // TODO Think of a more effective solution
        return textBlocks.map((textBlock: string[]): string => {
            const canvas: Canvas = createCanvas(SIZE, SIZE);
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
            let textY: number = 0;

            ctx.globalAlpha = 1;
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = this.textColor;
            ctx.font = FONT_DEFAULT;
            ctx.textBaseline = 'top';

            textBlock.forEach((textLine: string) => {
                ctx.fillText(textLine, 20, textY);
                textY += LINE_HEIGHT;
            });

            return canvas.toDataURL('image/png');
        });
    }

    private getTextBlocks(text: string): Array<string[]> {
        const canvas: Canvas = createCanvas(SIZE, SIZE);
        const ctx = canvas.getContext('2d');

        const textX: number = 0;
        let textY: number = 0;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FONT_DEFAULT;
        ctx.textBaseline = 'top';

        let words: string[] = text.split(' ');
        let wordCount: number = words.length;

        let line: string = '';
        const addNewLines: number[] = [];

        let count: number = 0;
        const textBlocks: Array<string[]> = [];

        for (let n: number = 0; n < wordCount; n++) {
            let word: string | undefined = words[n];

            if (/\n/.test(words[n])) {
                const parts: string[] = words[n].split('\n');
                word = parts.shift();
                addNewLines.push(n + 1);
                words.splice(n + 1, 0, parts.join('\n'));
                wordCount += 1;
            }

            const testLine: string = line + word + ' ';
            const testLineWidth: number = ctx.measureText(testLine).width;

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
