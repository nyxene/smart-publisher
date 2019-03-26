import React, { useState } from 'react';
import styled from 'styled-components';

interface PostFieldProps {
    post: string;
    height?: string;
    onPostChange?: (value: string) => void;
}

const PostFieldStyled = styled.div<{ height: string | undefined }>`
    height: 100%;
    background-color: #f5f5f5;
    
    textarea {
        padding: .5em 1em; 
        width: 100%;
        height: ${({ height }) => !!height ? height : '70vh'};
        resize: vertical;

        font-family: Premiera, Cambria, Roboto Slab, Georgia, Times New Roman, serif;
        font-size: 1.2em;
        font-weight: 400;
        line-height: 1.4em;
        letter-spacing: -.005em;
        
        border: 2px solid #d5d5d5;
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
        
        transition: border-color .2s .1s;
        
        &:focus,
        &:active {
            border-color: #27982b;
            outline: 0;
        }
    }
`;

const PostField = ({ post = '', height, onPostChange }: PostFieldProps): JSX.Element => {
    const [value, setValue] = useState<string>(post);

    return (
        <PostFieldStyled height={height}>
            <textarea
                value={value}
                onChange={e => {
                    setValue(e.target.value);
                    if (onPostChange) {
                        onPostChange(e.target.value);
                    }

                }}
            />
        </PostFieldStyled>
    );
};

export default PostField;
