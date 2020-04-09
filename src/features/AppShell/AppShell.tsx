import React from 'react';
import styled, { css } from 'styled-components';

import { Theme } from '~theme';

import { LoggedIn } from './LoggedIn';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        justify-content: center;
        min-width: 320px;
        width: 100%;
        height: 100%;
        background-color: ${theme.colors.backgroundGhost}};
    `}
`;

Root.displayName = 'AppShellRoot';

const Content = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        width: 100%;
        max-width: 1024px;
        height: 100%;
        overflow-x: auto;
        border-width: ${theme.borders.widths.base};
        border-color: ${theme.colors.white};
        border-style: solid;
    `}
`;

Content.displayName = 'AppShellContent';

export const AppShell = () => (
    <Root data-test-id="appShell">
        <Content>
            <LoggedIn />
        </Content>
    </Root>
);

AppShell.displayName = 'AppShell';
