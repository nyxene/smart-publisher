import React from 'react';
import styled, { css } from 'styled-components';

import { Counter, FormControl, Text, TEXT_SIZE, TEXT_TRANSFORM, TextareaInput } from '~components';
import { useDebounce } from '~core/hooks';
import { Theme } from '~theme';

import { PostFieldProps } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        width: 100%;
        height: 100%;
        border-top-width: ${theme.borders.widths.base};
        border-top-color: ${theme.colors.white};
        border-style: solid;

        ${TextareaInput} {
            flex: 1;
        }
    `}
`;

Root.displayName = 'PostFieldRoot';

export const PostField = ({ value = '', label, placeholder, disabled, postRef, onChange }: PostFieldProps) => {
    const debouncedPostLength = useDebounce<number>(value.length, 200);

    return (
        <Root>
            <FormControl
                label={
                    <Text size={TEXT_SIZE.s} transform={TEXT_TRANSFORM.uppercase}>
                        {label} <Counter value={debouncedPostLength} />
                    </Text>
                }
            >
                <TextareaInput
                    placeholder={placeholder}
                    value={value}
                    disabled={disabled}
                    ref={postRef}
                    onChange={onChange}
                />
            </FormControl>
        </Root>
    );
};

PostField.displayName = 'PostField';
