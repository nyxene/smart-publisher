import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Button, Counter, FILL_VALUE, Toolbar } from '../../components';
import { usePostField } from '../../components/PostField';
import { useDebounce } from '../../hooks/useDebounce';
import Converter from '../../services/converter';

const PublisherStyled = styled.div`
    padding: 0.5em;
    background-color: #f5f5f5;
`;

const CounterWrapper = styled.div`
    text-align: right;
`;

const PostCover = styled.div`
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

const PostCovers = styled.div`
    display: flex;
    flex-wrap: wrap;

    ${PostCover} {
        margin: 0.25em;
    }
`;

const Publisher = (): ReactElement => {
    const {
        postField,
        post,
        setPost,
        readonlyPost,
        setReadonlyPost,
        clearPost,
        copyToClipboard
    } = usePostField();
    const debouncedPostLength = useDebounce<number>(post.length, 200);
    const [isConverted, setIsConverted] = useState<boolean>(false);
    const [covers, setCovers] = useState<string[]>([]);

    const onConvertPost = () => {
        if (!post.length) {
            return;
        }

        try {
            const converter = new Converter({
                textColor: '#514253',
                bgColor: '#f4eae8'
            });
            const { mainText: convertedPost, covers } = converter.run(post);

            setPost(convertedPost);
            setReadonlyPost(true);
            setIsConverted(true);
            setCovers(covers);
        } catch (e) {
            setReadonlyPost(false);
        }
    };

    const onResetAll = () => {
        clearPost();
        setReadonlyPost(false);
        setIsConverted(false);
        setCovers([]);
    };

    const onCopyPost = () => {
        copyToClipboard();
    };

    const toolbarActions: ReactElement[] = [];

    if (!isConverted) {
        toolbarActions.push(
            <Button
                type="button"
                disabled={readonlyPost || !post}
                onClick={onConvertPost}
            >
                Convert
            </Button>
        );
    }

    if (isConverted && post.length) {
        toolbarActions.push(
            <Button type="button" onClick={onCopyPost}>
                Copy
            </Button>
        );
    }

    toolbarActions.push(
        <Button type="reset" disabled={!post} onClick={onResetAll}>
            Reset All
        </Button>
    );

    const toolbarItems: ReactElement[] = [
        ...toolbarActions,
        <CounterWrapper>
            <Counter length={debouncedPostLength} />
        </CounterWrapper>
    ];

    const now = Date.now();
    const getStamp = (index: number): number => now + index;

    return (
        <PublisherStyled>
            {postField}
            <Toolbar fill={FILL_VALUE.last} items={toolbarItems} />
            {!!covers.length && (
                <PostCovers>
                    {covers.map((dataUrl: string, index: number) => (
                        <PostCover key={index}>
                            <PostCoverLink
                                href={dataUrl}
                                download={`post_cover_${getStamp(index)}`}
                            >
                                <PostCoverImage
                                    srcSet={dataUrl}
                                    alt={`Post cover ${getStamp(index)}`}
                                />
                            </PostCoverLink>
                        </PostCover>
                    ))}
                </PostCovers>
            )}
        </PublisherStyled>
    );
};

export default Publisher;
