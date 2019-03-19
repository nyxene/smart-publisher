import React from 'react';
import styled from 'styled-components';

interface PostFieldProps {
    post: string;
    onPostChange: (value: string) => void;
}

const PostFieldStyled = styled.div`
    background-color: #f5f5f5;
    
    textarea {
        padding: .5em 1em; 
        width: 100%;
        min-height: 400px;
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

const PostField = ({post, onPostChange}: PostFieldProps): JSX.Element => (
    <PostFieldStyled>
        <textarea
            value={post}
            onChange={e => onPostChange(e.target.value)}
        />
    </PostFieldStyled>
);

export default PostField;
