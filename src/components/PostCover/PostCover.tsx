import React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    margin: 0.25em;
    width: 10em;
    height: 12.5em;
    border: 2px solid #27982b;
    border-radius: 2px;
`;

const PostCoverImage = styled.img`
    width: 100%;
    height: 100%;
`;

const PostCoverLink = styled.a`
    display: block;
`;

interface PostCoverProps {
    dataUrl: string;
    name: string;
}

export const PostCover = ({ dataUrl, name }: PostCoverProps) => (
    <Root>
        <PostCoverLink href={dataUrl} download={name}>
            <PostCoverImage srcSet={dataUrl} alt={name} />
        </PostCoverLink>
    </Root>
);
