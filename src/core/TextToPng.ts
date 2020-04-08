export enum TEXT_ALIGN {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export interface TextToPngConfig {
    font?: string;
    textColor?: string;
    textAlign?: TEXT_ALIGN;
    bgColor?: string;
    padding?: number;
    borderWidth?: number;
    borderColor?: string;
}

const SIZE_WIDTH = 1080;
const SIZE_HEIGHT = SIZE_WIDTH * 1.25;
const FONT_SIZE = 44;
const LINE_HEIGHT = FONT_SIZE * 1.4;
const FONT_FAMILY = 'Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif';
const FONT_DEFAULT = `normal ${FONT_SIZE}px ${FONT_FAMILY}`;

const MAX_LINE = 20;

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};

export class TextToPng {
    private readonly font: string;
    private readonly textColor: string;
    private readonly textAlign: TEXT_ALIGN;
    private readonly bgColor: string;
    private readonly padding: number;
    private readonly borderWidth: number;
    private readonly borderColor: string;

    public constructor({
        font = FONT_DEFAULT,
        textColor = 'black',
        textAlign = TEXT_ALIGN.LEFT,
        bgColor = 'white',
        padding = 40,
        borderWidth = 0,
        borderColor = 'black'
    }: TextToPngConfig = {}) {
        this.font = font;
        this.textColor = textColor;
        this.textAlign = textAlign;
        this.bgColor = bgColor;
        this.padding = Number(padding);
        this.borderWidth = Number(borderWidth);
        this.borderColor = borderColor;
    }

    public render(text: string): string[] {
        const textBlocks = this.getTextBlocks(text);

        // TODO Think of a more effective solution
        return textBlocks.map((textBlock: string[]): string => {
            const canvas = createCanvas(SIZE_WIDTH, SIZE_HEIGHT);
            const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

            if (!ctx) {
                return '';
            }

            let textY = this.padding;

            ctx.globalAlpha = 1;
            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = this.textColor;
            ctx.font = FONT_DEFAULT;
            ctx.textBaseline = 'top';

            textBlock.forEach((textLine: string) => {
                ctx.fillText(textLine, this.padding - 10, textY);
                textY += LINE_HEIGHT;
            });

            return canvas.toDataURL('image/png');
        });
    }

    private getTextBlocks(text: string): string[][] {
        const canvas = createCanvas(SIZE_WIDTH, SIZE_HEIGHT);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (!ctx) {
            return [];
        }

        const textX = 0;
        let textY = 0;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = FONT_DEFAULT;
        ctx.textBaseline = 'top';

        const words = text.split(' ');
        let wordCount = words.length;

        let line = '';
        const addNewLines = [];

        let count = 0;
        const textBlocks: string[][] = [];

        for (let n = 0; n < wordCount; n++) {
            let word = words[n];

            if (/\n/.test(words[n])) {
                const parts = words[n].split('\n');
                word = parts.shift() || '';
                addNewLines.push(n + 1);
                words.splice(n + 1, 0, parts.join('\n'));
                wordCount += 1;
            }

            const testLine = line + word + ' ';
            const testLineWidth = ctx.measureText(testLine).width;

            if (addNewLines.indexOf(n) > -1 || (testLineWidth > SIZE_WIDTH - this.padding * 2 && n > 0)) {
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

        if (!textBlocks[count]) {
            textBlocks.push([line]);
        } else {
            textBlocks[count].push(line);
        }

        return textBlocks;
    }
}