import React from 'react';

export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    inline?: boolean;
    ref?: React.RefObject<HTMLDivElement>;
}
