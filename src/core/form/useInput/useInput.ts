import React from 'react';

import { UseInputOutput, UseInputProps } from './types';

export const useInput = <TValue = string>({
    value: initialValue,
    disabled: initialDisabled = false,
    readonly: initialReadonly = false,
    valueKey = 'value'
}: UseInputProps<TValue>): UseInputOutput<TValue> => {
    const [value, setValue] = React.useState<TValue | undefined>(initialValue);
    const [disabled, setDisabled] = React.useState<boolean>(initialDisabled);
    const [readonly, setReadonly] = React.useState<boolean>(initialReadonly);
    const onChange = React.useCallback((e) => setValue(e.target[valueKey]), [valueKey]);

    return {
        value,
        setValue,
        disabled,
        setDisabled,
        readonly,
        setReadonly,
        onChange,
        clear: React.useCallback(() => setValue(undefined), []),
        input: {
            value,
            disabled,
            readOnly: readonly,
            onChange
        }
    };
};
