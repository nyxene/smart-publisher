import React from 'react';
import styled, { css } from 'styled-components';

import { FromLabel } from '~components';
import { Theme } from '~theme';

import { FormControlProps } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: ${theme.baseSizes.xl};
    `}
`;

Root.displayName = 'FormControlRoot';

export const FormControl = ({ children, label, error }: FormControlProps) => (
    <Root>
        {label && <FromLabel error={error}>{label}</FromLabel>}
        {children}
    </Root>
);

FormControl.displayName = 'FormControl';
