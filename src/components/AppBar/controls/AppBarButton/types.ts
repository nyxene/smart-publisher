import React from 'react';

export enum APP_BAR_BUTTON_UI {
    primary = 'primary',
    secondary = 'secondary'
}

export interface AppBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    ui: APP_BAR_BUTTON_UI;
    ref?: React.RefObject<HTMLButtonElement>;
}
