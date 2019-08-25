import { useCallback, useState } from 'react';

interface InputProps {
    value?: string | number;
    valueKey?: string;
    disabled?: boolean;
    readonly?: boolean;
}

export const useInput = ({
    value: initialValue = '',
    disabled: initialDisabled = false,
    readonly: initialReadonly = false,
    valueKey = 'value'
}: InputProps = {}) => {
    const [value, setValue] = useState<string>(String(initialValue));
    const [disabled, setDisabled] = useState<boolean>(initialDisabled);
    const [readonly, setReadonly] = useState<boolean>(initialReadonly);
    const onChange = useCallback(e => setValue(e.target[valueKey]), [valueKey]);

    return {
        value,
        setValue,
        disabled,
        setDisabled,
        readonly,
        setReadonly,
        onChange,
        clear: useCallback(() => setValue(''), []),
        bindToInput: {
            value,
            disabled,
            readonly,
            onChange
        },
        bind: {
            value,
            disabled,
            readonly,
            onChange: setValue
        }
    };
};
