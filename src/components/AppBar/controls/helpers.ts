import { AppBarBrandLink } from './AppBarBrandLink';
import { AppBarButton } from './AppBarButton';
import { AppBarFill } from './AppBarFill';
import { APP_BAR_CONTROL_TYPE } from './types';

const controlsMap = {
    [APP_BAR_CONTROL_TYPE.brandLink]: AppBarBrandLink,
    [APP_BAR_CONTROL_TYPE.button]: AppBarButton,
    [APP_BAR_CONTROL_TYPE.fill]: AppBarFill
};

export const getAppBarControl = (type: APP_BAR_CONTROL_TYPE) => {
    return controlsMap[type];
};
