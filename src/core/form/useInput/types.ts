import React from 'react';

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
    onChange: <TChangeEvent = React.ChangeEvent<HTMLInputElement>>(e: TChangeEvent) => void;
    clear: () => void;
    input: {
        value?: TValue;
        disabled: boolean;
        readOnly: boolean;
        onChange: <TChangeEvent = React.ChangeEvent<HTMLInputElement>>(e: TChangeEvent) => void;
    };
}
