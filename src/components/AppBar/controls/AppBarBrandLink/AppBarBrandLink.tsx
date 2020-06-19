import styled from 'styled-components';

import { APP_BAR_BUTTON_UI, AppBarButton } from '../AppBarButton';

export const AppBarBrandLink = styled(AppBarButton).attrs({
    ui: APP_BAR_BUTTON_UI.neutral
})`
    min-width: ${({ theme }) => theme.sizes.xxl};
`;

AppBarBrandLink.displayName = 'AppBarBrandLink';
