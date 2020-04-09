import React from 'react';

export enum BUTTON_UI {
    primary = 'primary',
    secondary = 'secondary',
    warn = 'warn',
    accent = 'accent',
    neutral = 'neutral'
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ui: BUTTON_UI;
    borderRadiusTopLeft?: string;
    borderRadiusTopRight?: string;
    borderRadiusBottomRight?: string;
    borderRadiusBottomLeft?: string;
    icon?: string;
    ref?: React.RefObject<HTMLButtonElement>;
}
