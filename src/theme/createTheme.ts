import { GENERAL, GRAY, GREEN, ORANGE, RED, YELLOW } from '~theme/colors';

import { Theme } from './types';

export const createTheme = (isMobile = false): Theme => ({
    sizes: {
        none: '0',
        thin: '1px',
        xxs: '0.125rem', // 2px
        xs: '0.25rem', // 4px
        s: '0.5rem', // 8px
        m: '1rem', // 16px
        l: '1.5rem', // 24px
        xl: '2rem', // 32px
        xxl: '3rem', // 48px
        xxxl: '4rem' // 64px
    },
    borders: {
        widths: {
            base: '2px',
            thin: '1px'
        },
        radius: {
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
        secondary: YELLOW.N600,
        secondaryText: GENERAL.BLACK,
        secondaryLight: YELLOW.L600,
        secondaryLightText: GENERAL.BLACK,
        secondaryDark: YELLOW.D600,
        secondaryDarkText: GENERAL.BLACK,
        success: GREEN.N500,
        successLight: GREEN.L500,
        warn: ORANGE.N900,
        warnLight: ORANGE.L900,
        accent: RED.N700,
        accentLight: RED.L700,
        inactive: GRAY.N600,
        link: GREEN.N800,
        linkLight: GREEN.L800,
        backgroundGhost: GRAY.N50,
        backgroundNeutral: GRAY.N100,
        backgroundLight: GRAY.N400,
        initial: 'initial',
        inherit: 'inherit',
        unset: 'unset'
    },
    font: {
        family:
            '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;',
        sizes: {
            xxxs: '0.5rem', // 8px
            xxs: '0.625rem', // 10px
            xs: '0.75rem', // 12px
            s: '0.785rem', // 14px
            m: '1rem', // 16px
            l: '1.125rem', // 18px
            xl: '1.25rem', // 20px
            xxl: '1.375rem', // 22px
            xxxl: '1.5rem', // 24px
            initial: 'initial',
            inherit: 'inherit',
            unset: 'unset'
        },
        weights: {
            lighter: 200,
            normal: 400,
            semiBold: 600,
            bold: 700,
            initial: 'initial',
            inherit: 'inherit',
            unset: 'unset'
        }
    }
});
