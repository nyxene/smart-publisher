import React from 'react';

import { APP_BAR_BUTTON_UI, APP_BAR_CONTROL_TYPE } from './controls';

export interface AppBarItemsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'type'> {
    id?: string;
    text?: string;
    icon?: React.ReactElement | string;
    ui?: APP_BAR_BUTTON_UI;
    render?: () => React.ReactElement | null;
    type?: APP_BAR_CONTROL_TYPE;
    hidden?: boolean;
    disabled?: boolean;
}

export interface AppBarProps {
    items: AppBarItemsProps[];
}
