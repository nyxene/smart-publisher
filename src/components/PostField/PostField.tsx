import React, { ChangeEvent, RefObject, useRef } from 'react';
import styled from 'styled-components';
import { useInput } from '../../hooks/useInput';

interface PostFieldConfig {
    post?: string;
    disabled?: boolean;
    height?: string;
}

interface PostFieldProps extends PostFieldConfig {
    postRef?: RefObject<HTMLTextAreaElement>;
    onChange?: (event: ChangeEvent<{ value: string }>) => void;
}

const PostFieldStyled = styled.div<{ height: string | undefined }>`
    padding: .5em 1em 0;
    height: 100%;
    background-color: #f5f5f5;
    
    textarea {
        display: block;
        padding: .5em 1em; 
        width: 100%;
        height: ${({ height }) => !!height ? height : '50vh'};
        resize: vertical;

        font-family: Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif;
        font-size: 1.2em;
        font-weight: 400;
        line-height: 1.4em;
        letter-spacing: -.005em;
        
        border: 2px solid #d5d5d5;
        border-radius: 2px;
        
        transition: border-color .2s .1s;
        
        &:focus,
        &:active {
            border-color: #27982b;
            outline: 0;
        }
    }
`;

export const usePostField = ({
    post: value = '',
    disabled = false,
    height = ''
}: PostFieldConfig = {}) => {
    const {
        value: post,
        onChange,
        setValue: setPost,
        disabled: disabledPost,
        setDisabled: setDisabledPost,
        clear: clearPost
    } = useInput({ value, disabled });

    const postRef: RefObject<HTMLTextAreaElement> = useRef(null);
    const postField: JSX.Element = PostField({ post, postRef, disabled: disabledPost, onChange, height });

    const copyToClipboard = () => {
        if (postRef && postRef.current) {
            postRef.current.select();
            document.execCommand('copy');
        }
    };

    return {
        postField,
        post,
        setPost,
        disabledPost,
        setDisabledPost,
        clearPost,
        copyToClipboard
    };
};

export const PostField = ({
    post = '',
    postRef,
    onChange,
    disabled,
    height
}: PostFieldProps): JSX.Element => (
    <PostFieldStyled height={height}>
            <textarea
                ref={postRef}
                value={post}
                onChange={onChange}
                disabled={disabled}
            />
    </PostFieldStyled>
);
