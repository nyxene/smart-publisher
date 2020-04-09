import React from 'react';
import styled, { css } from 'styled-components';

import { getKey } from '~core/helpers';
import { Theme } from '~/theme';

import { getAppBarControl } from './controls';
import { AppBarProps } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        width: 100%;
        height: ${theme.sizes.xxl};
        background-color: ${theme.colors.backgroundNeutral};

        > *:not(:first-child) {
            border-left-width: ${theme.borders.widths.base};
            border-left-color: ${theme.colors.white};
            border-style: solid;
        }
    `};
`;

Root.displayName = 'AppBarRoot';

export const AppBar = ({ items }: AppBarProps) => (
    <Root data-test-id="appBar">
        {items
            .filter(({ hidden }) => !hidden)
            .map(({ type, render, ...restProps }) => (
                <React.Fragment key={restProps.id || getKey()}>
                    {typeof render === 'function'
                        ? render()
                        : type && React.createElement(getAppBarControl(type), restProps)}
                </React.Fragment>
            ))}
    </Root>
);

AppBar.displayName = 'AppBar';
