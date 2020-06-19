export enum TEXT_ALIGN {
    LEFT = 'left',
    CENTER = 'center',
    RIGHT = 'right'
}

export enum RATIO {
    portrait = 'portrait',
    square = 'square',
    landscape = 'landscape'
}

export interface TextToPngConfig {
    font?: string;
    textColor?: string;
    textAlign?: TEXT_ALIGN;
    bgColor?: string;
    padding?: number;
    borderWidth?: number;
    borderColor?: string;
    ratio?: RATIO;
}

const PORTRAIT_SIZE = [1080, 1350];
const SQUARE_SIZE = [1080, 1080];
const LANDSCAPE_SIZE = [1080, 608];
const FONT_SIZE = 44;
const LINE_HEIGHT = FONT_SIZE * 1.4;
const FONT_FAMILY = 'Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif';
const FONT_DEFAULT = `normal ${FONT_SIZE}px ${FONT_FAMILY}`;

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
    private readonly ratio: RATIO;

    public constructor({
        font = FONT_DEFAULT,
        textColor = 'black',
        textAlign = TEXT_ALIGN.LEFT,
        bgColor = 'white',
        padding = 40,
        borderWidth = 0,
        borderColor = 'black',
        ratio = RATIO.portrait
    }: TextToPngConfig = {}) {
        this.font = font;
        this.textColor = textColor;
        this.textAlign = textAlign;
        this.bgColor = bgColor;
        this.padding = Number(padding);
        this.borderWidth = Number(borderWidth);
        this.borderColor = borderColor;
        this.ratio = ratio;
    }

    public render(text: string): string[] {
        const textBlocks = this.getTextBlocks(text);

        return textBlocks.map((textBlock: string[]): string => {
            const { canvas, ctx } = this.getCanvas();

            if (!ctx) {
                return '';
            }

            let textY = this.ratio !== RATIO.square ? this.padding : this.padding / 2;

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
        const { canvas, ctx } = this.getCanvas();

        if (!ctx) {
            return [];
        }

        const maxLine = this.getMaxLine();
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

            if (addNewLines.indexOf(n) > -1 || (testLineWidth > this.getWidthCover() - this.padding * 2 && n > 0)) {
                ctx.fillText(line, textX, textY);

                if (!textBlocks[count]) {
                    textBlocks.push([]);
                }

                textBlocks[count].push(line);

                if (textBlocks[count].length > maxLine) {
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

    private getCanvas = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D | null } => {
        const canvas = createCanvas(this.getWidthCover(), this.getHeightCover());
        const ctx = canvas.getContext('2d');

        return { canvas, ctx };
    };

    private getWidthCover = (): number => {
        return this.getCoverSize(this.ratio)[0];
    };

    private getHeightCover = (): number => {
        return this.getCoverSize(this.ratio)[1];
    };

    private getCoverSize = (ratio: RATIO): number[] => {
        switch (ratio) {
            case RATIO.landscape:
                return LANDSCAPE_SIZE;
            case RATIO.square:
                return SQUARE_SIZE;
            case RATIO.portrait:
            default:
                return PORTRAIT_SIZE;
        }
    };

    private getMaxLine = (): number => {
        const heightCover = this.getHeightCover();
        const indent = (this.padding + this.borderWidth) * 2;
        const heightTextArea = heightCover - indent;

        return Math.floor(heightTextArea / LINE_HEIGHT);
    };
}
