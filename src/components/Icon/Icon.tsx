import React from 'react';
import styled, { css } from 'styled-components';

import { Theme } from '~/theme';

import { ICON_SIZE, IconImageProps, IconProps, IconRootProps } from './types';

const Root = styled.div<IconRootProps & { theme: Theme }>`
    ${({ theme, size = ICON_SIZE.m }) => css`
        display: inline-flex;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        width: ${theme.sizes[size]};
        height: ${theme.sizes[size]};
    `};

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    ${({ disabled }) =>
        disabled &&
        css`
            filter: grayscale(100%);
            opacity: 0.5;
        `}
`;

Root.displayName = 'IconRoot';

const Image = styled.i<IconImageProps & { theme: Theme }>`
    ${({ theme, src, size = ICON_SIZE.m }) => css`
        display: block;
        padding: ${`${theme.sizes[size]} ${theme.sizes[size]} 0 0`};
        width: 0;
        height: 0;
        overflow: hidden;

        background-color: transparent;
        background-image: ${typeof src === 'string' ? `url(${src})` : ''};
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
    `}
`;

Image.displayName = 'IconImage';

export const Icon = ({ src, size, disabled }: IconProps) => (
    <Root disabled={disabled} size={size}>
        {typeof src === 'string' ? (
            <Image src={src} size={size} />
        ) : (
            <>{React.isValidElement(src) ? React.cloneElement(src) : null}</>
        )}
    </Root>
);

Icon.displayName = 'Icon';
