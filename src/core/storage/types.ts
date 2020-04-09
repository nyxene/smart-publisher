export type WindowStorage = Storage;

export interface AppStorage {
    setItem(name: string, value: unknown): void;
    getItem<TOutput = string>(name: string): TOutput | string | null;
    clear(): void;
}
