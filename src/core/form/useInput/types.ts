export interface UseInputProps<TValue> {
    value?: TValue;
    valueKey?: string;
    disabled?: boolean;
    readonly?: boolean;
}

export interface UseInputOutput<TValue> {
    value?: TValue;
    setValue: (value?: TValue) => void;
    disabled: boolean;
    setDisabled: (value: boolean) => void;
    readonly: boolean;
    setReadonly: (value: boolean) => void;
    onChange: <TChangeEvent>(e: TChangeEvent) => void;
    clear: () => void;
}
