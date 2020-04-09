import React from 'react';
import styled, { css } from 'styled-components';

import { clearProps } from '~core/helpers';
import { Theme } from '~theme';

import { FormGroupProps } from './types';

export const FormGroup = styled(({ children, ref, ...restProps }: FormGroupProps & { theme: Theme }) => (
    <div ref={ref} {...clearProps(restProps)}>
        {React.Children.map(children, (c) => React.isValidElement(c) && React.cloneElement(c))}
    </div>
))`
    ${({ theme, inline }) => css`
        display: flex;
        flex-direction: ${inline ? 'row' : 'column'};
        width: 100%;

        > *:not(:first-child) {
            margin-top: ${theme.sizes.s};
        }
    `}
`;

FormGroup.displayName = 'FormGroup';
