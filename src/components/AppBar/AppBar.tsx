import React from 'react';
import styled, { css } from 'styled-components';

import { getKey } from '~core/helpers';
import { Theme } from '~/theme';

import { getAppBarControl } from './controls';
import { AppBarProps } from './types';

const Root = styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
    ${({ theme }: { theme: Theme }) => css`
        height: ${theme.baseSize.xxl};
        background-color: ${theme.colors.backgroundNeutral};
    `};

    & > *:not(:first-child) {
        border-left: 2px solid #fff;
    }
`;

Root.displayName = 'AppBarRoot';

export const AppBar = ({ items }: AppBarProps) => {
    return (
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
};

AppBar.displayName = 'AppBar';
