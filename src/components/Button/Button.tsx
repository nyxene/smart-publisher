import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

import { BUTTON_UI, ButtonProps } from './types';

const BORDER_RADIUS = '2px';

export const Button = styled.button<ButtonProps & { theme: Theme }>`
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${({ theme }) => css`
        padding: 0 ${theme.baseSize.s};
        min-width: ${theme.baseSize.xxxl};
        height: ${theme.baseSize.xl};
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.s};
        font-weight: ${theme.font.weights.bold};
        color: ${theme.colors.black};
        background-color: ${theme.colors.white};
    `}

    text-transform: uppercase;
    letter-spacing: 0.1em;
    border: 0;
    outline: 0;
    cursor: pointer;

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

    ${({
        borderRadiusTopLeft = BORDER_RADIUS,
        borderRadiusTopRight = BORDER_RADIUS,
        borderRadiusBottomRight = BORDER_RADIUS,
        borderRadiusBottomLeft = BORDER_RADIUS
    }) => css`
        border-radius: ${borderRadiusTopLeft} ${borderRadiusTopRight} ${borderRadiusBottomRight}
            ${borderRadiusBottomLeft};
    `}

    transition: background-color 0.2s 0.1s;

    &:hover:not([disabled]) {
        opacity: 0.9;
        cursor: pointer;
    }

    &[disabled] {
        cursor: default;
        opacity: 0.5;
    }
`;

Button.displayName = 'Button';
Button.defaultProps = {
    ui: BUTTON_UI.primary
};
