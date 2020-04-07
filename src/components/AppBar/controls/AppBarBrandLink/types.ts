import React from 'react';

export interface AppBarBrandLinkProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    ref?: React.RefObject<HTMLButtonElement>;
}
