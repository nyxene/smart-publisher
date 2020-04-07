import React from 'react';
import styled, { css } from 'styled-components';

import { clearProps } from '~core/helpers';
import { Theme } from '~/theme';

import { APP_BAR_BUTTON_UI, AppBarButtonProps } from './types';

export const AppBarButton = styled(({ text, ref, ...restProps }: AppBarButtonProps & { theme: Theme }) => {
    return (
        <button ref={ref} {...clearProps(restProps)}>
            {text}
        </button>
    );
})`
    position: relative;
    margin: 0;
    height: 100%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${({ theme }) => css`
        padding: 0 ${theme.baseSize.s};
        min-width: ${theme.baseSize.xl};
        font-family: ${theme.font.family};
        font-size: ${theme.font.sizes.s};
        font-weight: ${theme.font.weights.bold};
        color: ${theme.colors.black};
        background-color: ${theme.colors.backgroundNeutral};
    `}

    text-transform: uppercase;
    letter-spacing: 0.05em;
    border: 0;
    border-radius: 0;
    outline: 0;
    cursor: pointer;

    transition: background-color 0.2s 0.1s;

    &:hover:not([disabled]) {
        opacity: 0.9;
        cursor: pointer;
    }

    &[disabled] {
        cursor: default;
        opacity: 0.5;
    }

    ${({ theme, ui }) =>
        ui === APP_BAR_BUTTON_UI.primary &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.primary};
        `}

    ${({ theme, ui }) =>
        ui === APP_BAR_BUTTON_UI.secondary &&
        css`
            color: ${theme.colors.black};
            background-color: ${theme.colors.secondary};
        `}

    ${({ theme, ui }) =>
        ui === APP_BAR_BUTTON_UI.warn &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.warn};
        `}

    ${({ theme, ui }) =>
        ui === APP_BAR_BUTTON_UI.accent &&
        css`
            color: ${theme.colors.white};
            background-color: ${theme.colors.accent};
        `}

    ${({ theme, ui }) =>
        ui === APP_BAR_BUTTON_UI.brand &&
        css`
            color: ${theme.colors.primary};
            background-color: ${theme.colors.backgroundNeutral};
        `}
`;

AppBarButton.displayName = 'AppBarButton';
AppBarButton.defaultProps = {
    ui: APP_BAR_BUTTON_UI.primary
};
