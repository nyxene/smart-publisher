import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

export const Panel = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        padding: ${theme.sizes.xs} ${theme.sizes.s};
        background-color: ${theme.colors.backgroundNeutral};
    `}
`;

Panel.displayName = 'Panel';
