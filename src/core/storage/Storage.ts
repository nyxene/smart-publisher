import { AppStorage, WindowStorage } from './types';

const singleton = Symbol('storage');

export class Storage implements AppStorage {
    private storage: WindowStorage;

    public constructor() {
        this.storage = window.localStorage;
    }

    public setItem(name: string, value: unknown): void {
        const stringValue = Storage.toStringValue(value);

        this.storage.setItem(name, stringValue);
    }

    public getItem<TOutput = string>(name: string): TOutput | string | null {
        const item = this.storage.getItem(name);

        if (!item) {
            return null;
        }

        try {
            return JSON.parse(item);
        } catch (e) {
            return item;
        }
    }

    public removeItem(name: string): void {
        this.storage.removeItem(name);
    }

    public clear(): void {
        this.storage.clear();
    }

    public static get instance(): Storage {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (!this[singleton]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this[singleton] = new Storage();
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return this[singleton];
    }

    private static toStringValue(value: unknown): string {
        return typeof value !== 'string' ? JSON.stringify(value) : value;
    }
}

export default Storage.instance;
