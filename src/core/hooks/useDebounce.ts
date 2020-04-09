import React from 'react';

export const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
        const handle = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handle);
    }, [value, delay]);

    return debouncedValue;
};
