import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

export const TextareaInput = styled.textarea<{ theme: Theme }>`
    ${({ theme }) => css`
        display: block;
        margin: 0;
        padding: ${theme.sizes.xs} ${theme.sizes.s};
        width: 100%;
        min-height: ${theme.sizes.xl};

        font-size: ${theme.font.sizes.l};
        font-family: ${theme.font.family};
        font-weight: ${theme.font.weights.normal};

        color: ${theme.colors.black};
        background-color: ${theme.colors.white};

        border-width: ${theme.borders.widths.base};
        border-color: ${theme.colors.backgroundNeutral};
        border-style: solid;
        border-radius: 0;

        outline: none;
        resize: vertical;
        -webkit-appearance: none;

        transition: border-color 0.2s 0.1s;

        &:focus:not([readOnly]),
        &:active:not([readOnly]) {
            border-color: ${theme.colors.backgroundLight};
        }
    `}
`;

TextareaInput.displayName = 'TextareaInput';
