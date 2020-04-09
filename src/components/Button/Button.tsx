import React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from '~components';
import { clearProps } from '~core/helpers';
import { Theme } from '~/theme';

import { BUTTON_UI, ButtonProps } from './types';

export const Button = styled(({ children, icon, ref, ...restProps }: ButtonProps & { theme: Theme }) => (
    <button ref={ref} {...clearProps(restProps)}>
        {icon && <Icon src={icon} />}
        {children}
    </button>
))`
    ${({ theme, borderRadiusTopLeft, borderRadiusTopRight, borderRadiusBottomRight, borderRadiusBottomLeft }) => css`
        position: relative;

        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 ${theme.sizes.m};
        min-width: ${theme.sizes.xl};
        height: ${theme.sizes.xl};
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.s};
        font-weight: ${theme.font.weights.bold};

        text-transform: uppercase;
        letter-spacing: 0.1rem;
        border: 0;
        outline: 0;
        cursor: pointer;

        border-radius: ${borderRadiusTopLeft || theme.borders.radius.base}
            ${borderRadiusTopRight || theme.borders.radius.base} ${borderRadiusBottomRight || theme.borders.radius.base}
            ${borderRadiusBottomLeft || theme.borders.radius.base};

        transition: background-color 0.2s 0.1s;

        &:hover:not([disabled]) {
            opacity: 0.9;
            cursor: pointer;
        }

        &[disabled] {
            cursor: default;
            opacity: 0.5;
        }
    `}

    ${({ theme, ui }) =>
        ui === BUTTON_UI.primary &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.primary};
        `}

    ${({ theme, ui }) =>
        ui === BUTTON_UI.secondary &&
        css`
            color: ${theme.colors.black};
            background-color: ${theme.colors.secondary};
        `}

    ${({ theme, ui }) =>
        ui === BUTTON_UI.warn &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.warn};
        `}

    ${({ theme, ui }) =>
        ui === BUTTON_UI.accent &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.accent};
        `}

    ${({ theme, ui }) =>
        ui === BUTTON_UI.neutral &&
        css`
            color: ${theme.colors.primary};
            background-color: ${theme.colors.backgroundNeutral};
        `}
`;

Button.displayName = 'Button';
Button.defaultProps = {
    ui: BUTTON_UI.primary
};
