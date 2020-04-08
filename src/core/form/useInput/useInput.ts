import { useCallback, useState } from 'react';

import { UseInputOutput, UseInputProps } from './types';

export const useInput = <TValue>({
    value: initialValue,
    disabled: initialDisabled = false,
    readonly: initialReadonly = false,
    valueKey = 'value'
}: UseInputProps<TValue>): UseInputOutput<TValue> => {
    const [value, setValue] = useState<TValue | undefined>(initialValue);
    const [disabled, setDisabled] = useState<boolean>(initialDisabled);
    const [readonly, setReadonly] = useState<boolean>(initialReadonly);
    const onChange = useCallback((e) => setValue(e.target[valueKey]), [valueKey]);

    return {
        value,
        setValue,
        disabled,
        setDisabled,
        readonly,
        setReadonly,
        onChange,
        clear: useCallback(() => setValue(undefined), [])
    };
};
