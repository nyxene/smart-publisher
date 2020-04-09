import { MAIN_TEXT_MAX_LENGTH, TEXT_SEPARATOR } from '~core/constants';
import { SeparateConditionResult } from '~core/TextConverter';

export const separateCondition = (
    mainTextMaxLength: number = MAIN_TEXT_MAX_LENGTH,
    textSeparator: string = TEXT_SEPARATOR
) => (mainText: string): SeparateConditionResult => {
    if (mainText.length <= mainTextMaxLength) {
        return { mainText };
    }

    const [newMainText, otherText] = mainText.split(textSeparator);

    return {
        mainText: newMainText,
        otherText
    };
};
