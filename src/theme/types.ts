export interface Theme {
    baseSize: {
        xxxs: '1px';
        xxs: '2px';
        xs: '4px';
        s: '8px';
        m: '16px';
        l: '24px';
        xl: '32px';
        xxl: '48px';
        xxxl: '64px';
    };
    borders: {
        widths: {
            base: '2px';
            thin: '1px';
        };
    };
    colors: {
        black: string;
        white: string;
        primary: string;
        primaryText: string;
        primaryLight: string;
        primaryLightText: string;
        primaryDark: string;
        primaryDarkText: string;
        secondary: string;
        secondaryText: string;
        secondaryLight: string;
        secondaryLightText: string;
        secondaryDark: string;
        secondaryDarkText: string;
        success: string;
        warn: string;
        accent: string;
        link: string;
        linkHighlight: string;
        backgroundNeutral: string;
        backgroundLight: string;
        inherit: string;
    };
    font: {
        family: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;';
        sizes: {
            xxs: '0.25em';
            xs: '0.5em';
            s: '0.75em';
            m: '1em';
            l: '1.25em';
            xl: '1.5em';
            xxl: '1.75em';
        };
        weights: {
            lighter: 200;
            normal: 400;
            semiBold: 600;
            bold: 700;
        };
    };
    spacing: {
        none: '0';
        xxs: '0.125em';
        xs: '0.25em';
        s: '0.5em';
        m: '1em';
        l: '1.5em';
        xl: '2em';
        xxl: '3em';
    };
}
