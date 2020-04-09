import React from 'react';

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactElement;
    label?: React.ReactElement | string;
    inline?: boolean;
    error?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}
