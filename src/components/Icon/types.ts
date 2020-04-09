import React from 'react';

export enum ICON_SIZE {
    s = 's',
    m = 'm',
    l = 'l',
    xl = 'xl',
    xxl = 'xxl',
    xxxl = 'xxxl'
}

export interface IconRootProps {
    disabled?: boolean;
    size?: ICON_SIZE;
}

export interface IconImageProps {
    src: string;
    size?: ICON_SIZE;
}

export interface IconProps {
    src: React.ReactElement | string;
    size?: ICON_SIZE;
    disabled?: boolean;
}
