import styled from 'styled-components';

import { APP_BAR_BUTTON_UI, AppBarButton } from '../AppBarButton';

export const AppBarBrandLink = styled(AppBarButton).attrs({
    ui: APP_BAR_BUTTON_UI.brand
})`
    width: ${({ theme }) => theme.baseSize.xxl};
`;

AppBarBrandLink.displayName = 'AppBarBrandLink';
