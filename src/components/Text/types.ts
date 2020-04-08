import React from 'react';

export enum TEXT_ALIGN {
    left = 'left',
    center = 'center',
    right = 'right',
    initial = 'initial',
    inherit = 'inherit',
    unset = 'unset'
}

export enum TEXT_COLOR {
    black = 'black',
    white = 'white',
    primary = 'primary',
    secondary = 'secondary',
    success = 'success',
    warn = 'warn',
    accent = 'accent',
    inactive = 'inactive'
}

export enum TEXT_SIZE {
    xxxs = 'xxxs',
    xxs = 'xxs',
    xs = 'xs',
    s = 's',
    m = 'm',
    l = 'l',
    xl = 'xl',
    xxl = 'xxl',
    xxxl = 'xxxl',
    initial = 'initial',
    inherit = 'inherit',
    unset = 'unset'
}

export enum TEXT_TRANSFORM {
    capitalize = 'capitalize',
    lowercase = 'lowercase',
    uppercase = 'uppercase',
    none = 'none',
    initial = 'initial',
    inherit = 'inherit',
    unset = 'unset'
}

export enum TEXT_WEIGHT {
    lighter = 'lighter',
    normal = 'normal',
    semiBold = 'semiBold',
    initial = 'initial',
    inherit = 'inherit',
    unset = 'unset'
}

export enum TEXT_WHITE_SPACE {
    normal = 'normal',
    nowrap = 'nowrap',
    pre = 'pre',
    preWrap = 'pre-wrap',
    preLine = 'pre-line',
    inherit = 'inherit',
    initial = 'initial',
    unset = 'unset'
}

export interface TextProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    component?: string;
    align?: TEXT_ALIGN;
    color?: TEXT_COLOR;
    size?: TEXT_SIZE;
    transform?: TEXT_TRANSFORM;
    weight?: TEXT_WEIGHT;
    whiteSpace?: TEXT_WHITE_SPACE;
}
