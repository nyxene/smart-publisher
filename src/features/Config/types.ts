export interface ConfigStorage {
    textColor: string;
    bgColor: string;
    textSeparator: string;
    mainTextMaxLength: number;
}

export interface ConfigProps {
    textColor?: string;
    bgColor?: string;
    textSeparator?: string;
    mainTextMaxLength?: number;
    onDone?: (config: ConfigStorage) => void;
}
