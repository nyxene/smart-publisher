import styled, { css } from 'styled-components';

import { Theme } from '~theme';

export const CoverImage = styled.div<{ theme: Theme; dataImage: string }>`
    ${({ theme, dataImage }) => css`
        min-width: ${theme.sizes.xl};
        width: auto;
        height: ${theme.sizes.xxxl};

        background-color: transparent;
        background-image: ${typeof dataImage === 'string' ? `url(${dataImage})` : ''};
        background-repeat: no-repeat;
        background-position: 100% 0;
        background-size: cover;

        overflow: hidden;
    `};
`;

CoverImage.displayName = 'CoverImage';
