import React, { useState } from 'react';
import styled from 'styled-components';

import { Button, Counter, FILL_VALUE, PostField, Tab, Tabs, Toolbar } from '../../components';
import { useDebounce } from '../../hooks/useDebounce';

const PublisherStyled = styled.div`
`;

const CounterWrapper = styled.div`
    text-align: right;
`;

const Publisher = (): JSX.Element => {
    const [activeTabId, setActiveTabId] = useState<string>('config');
    const [disabledResult, setDisabledResult] = useState<boolean>(true);

    const [post, setPost] = useState<string>('');
    const [postLength, setPostLength] = useState<number>(0);
    const [covers, setCovers] = useState<string[]>([]);

    const debouncedPostLength = useDebounce<number>(postLength, 200);

    return (
        <PublisherStyled>
            <Tabs
                activeTabId={activeTabId}
                onChangeTab={setActiveTabId}
            >
                <Tab
                    tabId="config"
                    label="Config"
                >
                    <PostField
                        post={post}
                        onPostChange={handlerTextChange}
                    />
                    <Toolbar
                        fill={FILL_VALUE.last}
                        items={[
                            <Button
                                type="button"
                                disabled={!post}
                                onClick={onConvertPost}
                            >
                                Convert
                            </Button>,
                            <Button
                                type="reset"
                                disabled={!post}
                                onClick={onClearPost}
                            >
                                Clear
                            </Button>,
                            <CounterWrapper>
                                <Counter length={debouncedPostLength} />
                            </CounterWrapper>
                        ]}
                    />
                </Tab>
                <Tab
                    tabId="result"
                    label="Result"
                    disabled={disabledResult}
                >
                    <PostField
                        post={post}
                        onPostChange={handlerTextChange}
                    />
                    <Toolbar
                        fill={FILL_VALUE.last}
                        items={[
                            <Button
                                type="button"
                                onClick={onCopyPost}
                            >
                                Copy
                            </Button>,
                            <CounterWrapper>
                                <Counter length={debouncedPostLength} />
                            </CounterWrapper>
                        ]}
                    />
                    {covers.map((dataUrl: string, index: number) => (
                        <img
                            key={index}
                            srcSet={dataUrl}
                            alt={`Post cover ${index + 1}`}
                        />
                    ))}
                </Tab>
            </Tabs>
        </PublisherStyled>
    );

    function updatePost(data: {
        post: string,
        covers?: string[]
    }) {
        setPost(data.post);
        setPostLength(data.post.length);
        data.covers && setCovers(data.covers);
    }

    function handlerTextChange(value: string): void {
        updatePost({ post: value });
    }

    function onConvertPost(): void {

        setActiveTabId('result');
        setDisabledResult(false);

        const p = post.substring(0, 20);
        updatePost({ post: p });
        return;

        if (!postLength) {
            return;
        }

        setDisabledResult(true);

        fetch('http://localhost:3000/api/v1/converter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                post: post,
                options: {
                    textColor: '#514253',
                    bgColor: '#f4eae8'
                }
            })
        })
            .then(result => {
                try {
                    if (result.status >= 400) {
                        return result.json().then((err: { errors: string }) => {
                            throw new Error(err.errors);
                        });
                    }
                    return result.json();
                } catch (e) {
                    throw new Error(e);
                }
            })
            .then(result => {
                setActiveTabId('result');
                setDisabledResult(false);
                updatePost({
                    post: result.post,
                    covers: result.covers
                });
            })
            .catch(e => {
                setDisabledResult(true);
                new Error(e);
            });
    }

    function onClearPost(): void {
        setPost('');
        setPostLength(0);
    }

    function onCopyPost(): void {
        const textField = document.createElement('textarea');
        textField.innerText = post;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
    }
};

export default Publisher;
