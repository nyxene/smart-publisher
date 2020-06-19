import { RATIO } from '~/core/TextToPng';

export interface ConfigStorage {
    textColor: string;
    bgColor: string;
    textSeparator: string;
    ratio?: RATIO;
}

export interface ConfigProps {
    textColor?: string;
    bgColor?: string;
    textSeparator?: string;
    ratio?: RATIO;
    onDone?(config: ConfigStorage): void;
}
