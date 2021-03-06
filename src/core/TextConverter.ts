import Typograf from 'typograf';

import { RATIO, TextToPng, TextToPngConfig } from './TextToPng';

export interface SeparateConditionResult {
    mainText: string;
    otherText?: string;
}
export type SeparateCondition = (mainText: string) => SeparateConditionResult;

interface RunResult {
    mainText: string;
    covers: string[];
}

interface TextConverterManager {
    run(originalText: string): RunResult;
    format(originalText: string): string;
    prepare(originalText: string): SeparateConditionResult;
}

export class TextConverter implements TextConverterManager {
    private readonly typograf: any; // eslint-disable-line

    public constructor(
        private readonly textColor: string,
        private readonly bgColor: string,
        private readonly ratio?: RATIO,
        private readonly separateCondition?: SeparateCondition
    ) {
        this.textColor = textColor;
        this.bgColor = bgColor;
        this.ratio = ratio;
        this.separateCondition = separateCondition;

        this.typograf = new Typograf({ locale: ['ru', 'en-US'] });
        this.typograf.enableRule('common/nbsp/replaceNbsp');
    }

    public run(originalText: string): RunResult {
        const { mainText, otherText } = this.prepare(originalText);
        const options: TextToPngConfig = {
            textColor: this.textColor,
            bgColor: this.bgColor,
            ratio: this.ratio
        };

        let covers: string[] = [];

        if (otherText?.length) {
            const t2p = new TextToPng(options);
            covers = t2p.render(otherText);
        }

        return { mainText, covers };
    }

    public format(originalText: string): string {
        const formattedText = this.typograf.execute(originalText);
        return formattedText.trim();
    }

    public prepare(originalText: string): SeparateConditionResult {
        const mainText = this.typograf.execute(originalText);

        const { mainText: newMainText, otherText } = this.separateCondition?.(mainText.trim()) ?? { mainText };

        return {
            mainText: newMainText.trim(),
            otherText: otherText?.trim()
        };
    }
}
