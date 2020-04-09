import React from 'react';
import styled, { css } from 'styled-components';

import { Theme } from '~theme';

import { CoverItem } from './CoverItem';
import { CoversProps } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        min-height: ${theme.sizes.xxxl};
    `}
`;

Root.displayName = 'CoversRoot';

export const Covers = ({ items }: CoversProps) => (
    <Root>
        {items.map((cover) => (
            <CoverItem key={cover.name} {...cover} />
        ))}
    </Root>
);

Covers.displayName = 'Covers';
