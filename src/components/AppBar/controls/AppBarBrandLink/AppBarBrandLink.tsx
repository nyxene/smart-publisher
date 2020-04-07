import React from 'react';
import styled, { css } from 'styled-components';

import { clearProps } from '~core/helpers';
import { Theme } from '~/theme';

import { AppBarBrandLinkProps } from './types';

export const AppBarBrandLink = styled(
    ({ text, onClick = () => location.reload(), ref, ...restProps }: AppBarBrandLinkProps) => {
        return (
            <button ref={ref} onClick={onClick} {...clearProps(restProps)}>
                {text}
            </button>
        );
    }
)`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 0;
    outline: 0;
    cursor: pointer;

    ${({ theme }: { theme: Theme }) => css`
        width: ${theme.baseSize.xxl};
        height: ${theme.baseSize.xxl};
        color: ${theme.colors.accent};
        font-weight: ${theme.font.weights.bold};
    `};
`;

AppBarBrandLink.displayName = 'AppBarBrandLink';
