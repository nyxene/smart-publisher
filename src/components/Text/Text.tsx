import React from 'react';
import styled, { css } from 'styled-components';

import { clearProps } from '~/core/helpers';
import { Theme } from '~/theme';

import { TEXT_ALIGN, TEXT_COLOR, TEXT_SIZE, TEXT_TRANSFORM, TEXT_WEIGHT, TEXT_WHITE_SPACE, TextProps } from './types';

export const Text = styled(({ component = 'div', children, ...restProps }: TextProps & { theme: Theme }) =>
    React.createElement(component, clearProps(restProps), children)
)`
    ${({
        theme,
        align = TEXT_ALIGN.unset,
        color = TEXT_COLOR.black,
        size = TEXT_SIZE.m,
        transform = TEXT_TRANSFORM.unset,
        weight = TEXT_WEIGHT.unset,
        whiteSpace = TEXT_WHITE_SPACE.unset
    }) => css`
        color: ${theme.colors?.[color]};
        font-size: ${theme.font.sizes?.[size]};
        font-weight: ${theme.font.weights?.[weight]};
        text-align: ${align};
        text-transform: ${transform};
        white-space: ${whiteSpace};
        letter-spacing: ${transform === TEXT_TRANSFORM.uppercase ? '0.05rem' : 'unset'};
    `}
`;

Text.displayName = 'Text';
