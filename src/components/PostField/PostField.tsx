import React from 'react';
import styled from 'styled-components';

import { TextareaInput } from '~components';

import { PostFieldProps } from './types';

const Root = styled.div`
    width: 100%;
    height: 100%;

    ${TextareaInput} {
        height: 100%;
    }
`;

Root.displayName = 'Root';

export const PostField = ({ post = '', postRef, onChange, disabled, readonly, height }: PostFieldProps) => (
    <Root>
        <TextareaInput ref={postRef} value={post} onChange={onChange} disabled={disabled} readOnly={readonly} />
    </Root>
);

PostField.displayName = 'PostField';
