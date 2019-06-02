enum TEXT_COLOR {
    BLACK = 'black',
    WHITE = 'white'
}

enum TEXT_ALIGN {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export interface TextToPngConfig {
    font?: string;
    textColor?: string;
    textAlign?: string;
    bgColor?: string;
    padding?: number;
    borderWidth?: number;
    borderColor?: string;
}

const SIZE = 2048;
const FONT_SIZE = SIZE / 25;
const LINE_HEIGHT = FONT_SIZE * 1.4;
const FONT_FAMILY =
    'Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif';
const FONT_DEFAULT = `normal ${FONT_SIZE}px ${FONT_FAMILY}`;

const MAX_LINE = 17;

const createCanvas = (width: number, height: number) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return canvas;
};

export class TextToPng {
    private readonly font: string;
    private readonly textColor: string;
    private readonly textAlign: string;
    private readonly bgColor: string;
    private readonly padding: number;
    private readonly borderWidth: number;
    private readonly borderColor: string;

    public constructor({
        font = FONT_DEFAULT,
        textColor = TEXT_COLOR.BLACK,
        textAlign = TEXT_ALIGN.LEFT,
        bgColor = 'white',
        padding = 0,
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
        const textBlocks = TextToPng.getTextBlocks(text);

        // TODO Think of a more effective solution
        return textBlocks.map(
            (textBlock: string[]): string => {
                const canvas = createCanvas(SIZE, SIZE);
                const ctx: CanvasRenderingContext2D | null = canvas.getContext(
                    '2d'
                );

                if (!ctx) {
                    return '';
                }

                let textY = 0;

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
            }
        );
    }

    private static getTextBlocks(text: string): (string[])[] {
        const canvas = createCanvas(SIZE, SIZE);
        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

        if (!ctx) {
            return [];
        }

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
        const textBlocks: (string[])[] = [];

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

            if (
                addNewLines.indexOf(n) > -1 ||
                (testLineWidth > SIZE - 20 && n > 0)
            ) {
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
