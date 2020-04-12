export interface ConfigStorage {
    textColor: string;
    bgColor: string;
    textSeparator: string;
}

export interface ConfigProps {
    textColor?: string;
    bgColor?: string;
    textSeparator?: string;
    onDone?: (config: ConfigStorage) => void;
}
