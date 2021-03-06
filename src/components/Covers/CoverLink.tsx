import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

export const CoverLink = styled.a<{ theme: Theme }>`
    ${({ theme }) => css`
        position: relative;
        width: ${theme.sizes.xxxl};
        height: ${theme.sizes.xxxl};
        flex-grow: 0;
        display: block;
        border-width: ${theme.borders.widths.thin};
        border-color: ${theme.colors.white};
        border-style: solid;

        transition: opacity 0.2s 0.1s;

        &:after {
            content: '🔗';
            position: absolute;
            top: 0;
            left: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            font-size: ${theme.font.sizes.s};
            width: ${theme.sizes.l};
            height: ${theme.sizes.l};

            background-color: ${theme.colors.backgroundNeutral};
        }

        &:hover:after {
            opacity: 0.9;
        }
    `}
`;

CoverLink.displayName = 'CoverLink';
