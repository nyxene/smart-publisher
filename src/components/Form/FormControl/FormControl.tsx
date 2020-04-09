import React from 'react';
import styled, { css } from 'styled-components';

import { FromLabel } from '~components';
import { clearProps } from '~core/helpers';
import { Theme } from '~theme';

import { FormControlProps } from './types';

export const FormControl = styled(({ children, label, ref, ...restProps }: FormControlProps & { theme: Theme }) => (
    <div ref={ref} {...clearProps(restProps)}>
        {label && <FromLabel error={restProps.error}>{label}</FromLabel>}
        {children}
    </div>
))`
    ${({ theme, inline }) => css`
        display: flex;
        flex-direction: ${inline ? 'row' : 'column'};
        align-items: ${inline ? 'center' : 'unset'};
        width: 100%;
        min-height: ${theme.sizes.xl};
    `}
`;

FormControl.displayName = 'FormControl';
