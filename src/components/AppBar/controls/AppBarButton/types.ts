import React from 'react';

export enum APP_BAR_BUTTON_UI {
    primary = 'primary',
    secondary = 'secondary',
    warn = 'warn',
    accent = 'accent',
    neutral = 'neutral'
}

export interface AppBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    ui: APP_BAR_BUTTON_UI;
    icon?: string;
    ref?: React.RefObject<HTMLButtonElement>;
}
