import { Theme } from './types';

export const createTheme = (isMobile = false): Theme => ({
    baseSize: {
        xxxs: '1px',
        xxs: '2px',
        xs: '4px',
        s: '8px',
        m: '16px',
        l: '24px',
        xl: '32px',
        xxl: '48px',
        xxxl: '64px'
    },
    colors: {
        main: '#000',
        light: '#a0a0a0',
        error: '#e8595a',
        warning: '#d6691f',
        accent: '#27982b',
        link: '#27982b',
        backgroundNeutralLight: '#f5f5f5',
        highlightLight: '#8ec790',
        highlightDark: '#64c75a',
        inherit: 'inherit'
    },
    font: {
        family:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;',
        sizes: {
            xxs: '0.25em',
            xs: '0.5em',
            s: '0.75em',
            m: '1em',
            l: '1.25em',
            xl: '1.5em',
            xxl: '1.75em'
        },
        weights: {
            lighter: 200,
            normal: 400,
            semiBold: 600,
            bold: 700
        }
    },
    spacing: {
        none: '0',
        xxs: '0.125em',
        xs: '0.25em',
        s: '0.5em',
        m: '1em',
        l: '1.5em',
        xl: '2em',
        xxl: '3em'
    }
});
