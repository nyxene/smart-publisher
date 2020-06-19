import React from 'react';

export const useDebounce = <TValue>(value: TValue, delay: number): TValue => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handle = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handle);
    }, [value, delay]);

    return debouncedValue;
};
