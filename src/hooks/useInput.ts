import { useCallback, useState } from 'react';

interface InputProps {
    value?: string | number;
    valueKey?: string;
    disabled?: boolean;
}

export const useInput = ({
    value: initialValue = '',
    disabled: initialDisabled = false,
    valueKey = 'value'
}: InputProps) => {
    const [value, setValue] = useState<string>(String(initialValue));
    const [disabled, setDisabled] = useState<boolean>(initialDisabled);
    const onChange = useCallback(e => setValue(e.target[valueKey]), []);

    return {
        value,
        setValue,
        disabled,
        setDisabled,
        onChange,
        clear: useCallback(() => setValue(''), []),
        bindToInput: {
            value,
            disabled,
            onChange
        },
        bind: {
            value,
            disabled,
            onChange: setValue
        }
    };
};
