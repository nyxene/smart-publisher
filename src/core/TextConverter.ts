import Typograf from 'typograf';

import { MAIN_TEXT_MAX_LENGTH } from './constants';
import { TextToPng, TextToPngConfig } from './TextToPng';

export class TextConverter {
    private readonly mainTextMaxLength: number;
    private readonly textColor: string;
    private readonly bgColor: string;
    private readonly typograf: any; // eslint-disable-line

    public constructor({ mainTextMaxLength = MAIN_TEXT_MAX_LENGTH, textColor = '', bgColor = '' } = {}) {
        this.mainTextMaxLength = mainTextMaxLength;
        this.textColor = textColor;
        this.bgColor = bgColor;

        this.typograf = new Typograf({ locale: ['ru', 'en-US'] });
        this.typograf.enableRule('common/nbsp/replaceNbsp');
    }

    public run(originalText: string): { mainText: string; covers: string[] } {
        const { mainText, otherText } = this.prepare(originalText);
        const options: TextToPngConfig = {
            textColor: this.textColor,
            bgColor: this.bgColor
        };

        let covers: string[] = [];

        if (!!otherText) {
            const t2p = new TextToPng(options);
            covers = t2p.render(otherText);
        }

        return { mainText, covers };
    }

    public prepare(originalText: string): { mainText: string; otherText?: string } {
        const text: string = this.typograf.execute(originalText);

        if (text.length <= this.mainTextMaxLength) {
            return {
                mainText: text,
                otherText: ''
            };
        }

        const mainTextArray = text.slice(0, this.mainTextMaxLength).split(' ');
        mainTextArray.splice(mainTextArray.length - 1, 1);

        const mainText = mainTextArray.join(' ');

        return {
            mainText,
            otherText: text.substring(mainText.length).trim()
        };
    }
}
