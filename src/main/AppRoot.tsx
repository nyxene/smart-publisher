import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AppContextProvider } from '~/core/contexts';
import { isMobile } from '~/core/helpers';
import { AppShell } from '~/features/AppShell';
import { createTheme } from '~/theme';

export const AppRoot = () => (
    <ThemeProvider theme={createTheme(isMobile())}>
        <AppContextProvider>
            <AppShell />
        </AppContextProvider>
    </ThemeProvider>
);

AppRoot.displayName = 'AppRoot';
