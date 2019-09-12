import React, { ReactElement, useState, Fragment } from 'react';
import styled from 'styled-components';

import { Button, Counter, FILL_VALUE, Toolbar } from '../../components';
import { PostCover } from '../../components/PostCover';
import { usePostField } from '../../components/PostField';
import { useDebounce } from '../../hooks/useDebounce';
import Converter from '../../services/converter';

const Root = styled.div`
    padding: 0.5em;
    background-color: #f5f5f5;
`;

const CounterWrapper = styled.div`
    text-align: right;
`;

const PostCoversRoot = styled.div`
    margin: 1em 0;
`;

const PostCoversTitle = styled.h2`
    margin-bottom: 0.5em;
`;

const PostCoversTile = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.25em;
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
        <Root>
            {postField}
            <Toolbar fill={FILL_VALUE.last} items={toolbarItems} />
            {!!covers.length && (
                <PostCoversRoot>
                    <PostCoversTitle>Download images:</PostCoversTitle>
                    <PostCoversTile>
                        {covers.map((dataUrl: string, index: number) => (
                            <Fragment key={getStamp(index)}>
                                <PostCover
                                    dataUrl={dataUrl}
                                    name={`post_cover_${getStamp(index)}`}
                                />
                            </Fragment>
                        ))}
                    </PostCoversTile>
                </PostCoversRoot>
            )}
        </Root>
    );
};

export default Publisher;
