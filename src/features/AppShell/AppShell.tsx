import React from 'react';
import styled from 'styled-components';

import { LoggedIn } from './LoggedIn';

const Root = styled.div`
    height: 100%;
    width: 100%;
    overflow-x: auto;
`;
Root.displayName = 'AppShellRoot';

export const AppShell = () => {
    return (
        <Root id="main-container">
            <LoggedIn />
        </Root>
    );
};

AppShell.displayName = 'AppShell';
