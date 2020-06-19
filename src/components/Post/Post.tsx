import React from 'react';
import styled, { css } from 'styled-components';

import { FormControl, TextareaInput } from '~/components';
import { TEXT_SEPARATOR } from '~/core/constants';
import { useDebounce } from '~/core/hooks';
import { Theme } from '~/theme';

import { PostProps } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        width: 100%;
        height: 100%;
        border-top-width: ${theme.borders.widths.base};
        border-top-color: ${theme.colors.white};
        border-style: solid;

        ${TextareaInput} {
            flex-grow: 1;
        }
    `}
`;

Root.displayName = 'PostRoot';

export const Post = ({
    value = '',
    label,
    placeholder,
    disabled,
    textSeparator = TEXT_SEPARATOR,
    postRef,
    onChange
}: PostProps) => {
    const [mainText] = value?.split(textSeparator) ?? [''];
    const mainTextLength = mainText.trim().length;
    const debouncedPostLength = useDebounce<number>(mainTextLength, 200);

    return (
        <Root>
            <FormControl label={<>{`${label} ${debouncedPostLength}`}</>}>
                <TextareaInput
                    data-test-id="postInput"
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

Post.displayName = 'Post';
