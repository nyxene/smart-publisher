import { TEXT_SEPARATOR } from '~core/constants';
import { SeparateConditionResult } from '~core/TextConverter';

export const separateCondition = (textSeparator: string = TEXT_SEPARATOR) => (
    mainText: string
): SeparateConditionResult => {
    const [newMainText, otherText] = mainText.split(textSeparator);

    return {
        mainText: newMainText,
        otherText
    };
};
