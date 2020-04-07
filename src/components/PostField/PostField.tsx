import React from 'react';
import styled, { css } from 'styled-components';

import { Theme } from '~theme';

import { PostFieldProps } from './types';

const PostFieldStyled = styled.div<{ height?: string } & { theme: Theme }>`
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;

    textarea {
        display: block;
        padding: 0.5em;
        width: 100%;
        height: ${({ height }) => (!!height ? height : '100%')};
        resize: vertical;

        ${({ theme }) => css`
            font-family: ${theme.font.family};
            font-size: ${theme.font.sizes.l};
            font-weight: ${theme.font.weights.normal};
        `}

        font-family: Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif;
        font-size: 1.2em;
        font-weight: 400;
        line-height: 1.4em;
        letter-spacing: -0.005em;

        border: 2px solid #d5d5d5;
        border-radius: 2px;

        transition: border-color 0.2s 0.1s;

        &:focus,
        &:active {
            border-color: #27982b;
            outline: 0;
        }
    }
`;

export const PostField = ({ post = '', postRef, onChange, disabled, readonly, height }: PostFieldProps) => (
    <PostFieldStyled height={height}>
        <textarea ref={postRef} value={post} onChange={onChange} disabled={disabled} readOnly={readonly} />
    </PostFieldStyled>
);
