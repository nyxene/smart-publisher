export interface Theme {
    baseSizes: {
        none: '0'; // 0
        xxs: '0.125rem'; // 2px
        xs: '0.25rem'; // 4px
        s: '0.5rem'; // 8px
        m: '1rem'; // 16px
        l: '1.5rem'; // 24px
        xl: '2rem'; // 32px
        xxl: '3rem'; // 48px
        xxxl: '4rem'; // 64px
    };
    borders: {
        widths: {
            base: '2px';
            thin: '1px';
        };
        radius: {
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
        successLight: string;
        warn: string;
        warnLight: string;
        accent: string;
        accentLight: string;
        inactive: string;
        link: string;
        linkLight: string;
        backgroundGhost: string;
        backgroundNeutral: string;
        backgroundLight: string;
        initial: 'initial';
        inherit: 'inherit';
        unset: 'unset';
    };
    font: {
        family: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;';
        sizes: {
            xxxs: '0.5rem'; // 8px
            xxs: '0.625rem'; // 10px
            xs: '0.75rem'; // 12px
            s: '0.785rem'; // 14px
            m: '1rem'; // 16px
            l: '1.125rem'; // 18px
            xl: '1.25rem'; // 20px
            xxl: '1.375rem'; // 22px
            xxxl: '1.5rem'; // 24px
            initial: 'initial';
            inherit: 'inherit';
            unset: 'unset';
        };
        weights: {
            lighter: 200;
            normal: 400;
            semiBold: 600;
            bold: 700;
            initial: 'initial';
            inherit: 'inherit';
            unset: 'unset';
        };
    };
}
