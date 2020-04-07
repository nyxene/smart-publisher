import styled, { css } from 'styled-components';

export const TextareaInput = styled.textarea`
    display: block;
    width: 100%;
    resize: vertical;

    ${({ theme }) => css`
        padding: ${theme.spacing.xs};
        min-height: ${theme.baseSize.xl};
        font-family: ${theme.font.family};
        font-weight: ${theme.font.weights.normal};
        color: ${theme.colors.black};
        background-color: ${theme.colors.white};
        border: 2px solid ${theme.colors.backgroundLight};
    `}

    border-radius: 0;
    outline: none;
    -webkit-appearance: none;

    transition: border-color 0.2s 0.1s;

    &:focus,
    &:active {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

TextareaInput.displayName = 'TextareaInput';
