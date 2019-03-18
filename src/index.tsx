import React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';

// import * as serviceWorker from './serviceWorker';
import App from './App';
import { resetStyle } from './components/ResetStyle';

const GlobalStyle = createGlobalStyle`
    ${resetStyle};
    
    * {
        box-sizing: border-box;
    }
    
    body {
        width: 100%;
        height: 100%;
        font-size: 16px;
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    }
`;

render(
    <>
        <GlobalStyle />
        <App />
    </>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
