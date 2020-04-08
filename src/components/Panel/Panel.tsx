import styled, { css } from 'styled-components';

import { Theme } from '~theme';

export const Panel = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        width: 100%;
        padding: ${theme.baseSizes.xs} ${theme.baseSizes.s};
        background-color: ${theme.colors.backgroundNeutral};
    `}
`;

Panel.displayName = 'Panel';
