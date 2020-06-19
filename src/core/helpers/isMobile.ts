const MOBILE_REGEX = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;

export const isMobile = () => {
    let ua;

    if (typeof navigator !== 'undefined') {
        ua = navigator.userAgent;
    }

    if (typeof ua !== 'string') {
        return false;
    }

    let result = MOBILE_REGEX.test(ua);

    if (
        !result &&
        navigator &&
        navigator.maxTouchPoints > 1 &&
        ua.indexOf('Macintosh') !== -1 &&
        ua.indexOf('Safari') !== -1
    ) {
        result = true;
    }

    return result;
};
