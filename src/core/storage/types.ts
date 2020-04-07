export type WindowStorage = Storage;

export interface AppStorage {
    setItem(name: string, value: unknown): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getItem<TOutput = any>(name: string, initialValue?: TOutput): TOutput | string | null;
    clear(): void;
}
