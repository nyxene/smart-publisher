import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

import { resetStyle } from '~/core/resetStyle';
import { isMobile } from '~/core/helpers';
import { AppRoot } from '~/main/AppRoot';
import { createTheme } from '~/theme';

const { font } = createTheme();

const GlobalStyle = createGlobalStyle`
    ${resetStyle};

    * {
        box-sizing: border-box;
    }

    html,
    body,
    #root {
        width: 100%;
        height: 100%;
    }

    body {
        font-size: ${isMobile() ? '16px' : '18px'};
        font-family: ${font.family};
    }
`;

render(
    React.createElement(React.Fragment, null, [
        React.createElement(GlobalStyle, { key: 1 }),
        React.createElement(AppRoot, { key: 2 })
    ]),
    document.getElementById('root')
);
