import { GENERAL, GRAY, GREEN, ORANGE, RED, YELLOW } from '~theme/colors';

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
    borders: {
        widths: {
            base: '2px',
            thin: '1px'
        }
    },
    colors: {
        black: GENERAL.BLACK,
        white: GENERAL.WHITE,
        primary: GREEN.N800,
        primaryText: GENERAL.WHITE,
        primaryLight: GREEN.L800,
        primaryLightText: GENERAL.BLACK,
        primaryDark: GREEN.D800,
        primaryDarkText: GENERAL.WHITE,
        secondary: YELLOW.N500,
        secondaryText: GENERAL.BLACK,
        secondaryLight: YELLOW.L500,
        secondaryLightText: GENERAL.BLACK,
        secondaryDark: YELLOW.D500,
        secondaryDarkText: GENERAL.BLACK,
        success: GREEN.N500,
        warn: ORANGE.D700,
        accent: RED.D400,
        link: GREEN.N800,
        linkHighlight: GREEN.L800,
        backgroundNeutral: GRAY.N100,
        backgroundLight: GRAY.N400,
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
