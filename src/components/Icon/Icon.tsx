import React from 'react';
import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

import { ICON_SIZE, IconImageProps, IconProps, IconRootProps } from './types';

const Root = styled.div<IconRootProps & { theme: Theme }>`
    display: inline-flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    ${({ theme, size = ICON_SIZE.m }) => css`
        width: ${theme.baseSize[size]};
        height: ${theme.baseSize[size]};
    `};

    ${({ disabled }) =>
        disabled &&
        css`
            filter: grayscale(100%);
            opacity: 0.5;
        `}
`;

Root.displayName = 'IconRoot';

const Image = styled.i<IconImageProps & { theme: Theme }>`
    padding: ${({ theme, size = ICON_SIZE.m }) => `${theme.baseSize[size]} ${theme.baseSize[size]} 0 0`};
    display: block;
    width: 0;
    height: 0;

    background-color: transparent;
    background-image: ${({ src }) => (typeof src === 'string' ? `url(${src})` : '')};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;

    overflow: hidden;
`;

Image.displayName = 'IconImage';

export const Icon = ({ src, size, disabled }: IconProps) => (
    <Root disabled={disabled} size={size}>
        <Image src={src} size={size} />
    </Root>
);

Icon.displayName = 'Icon';
