import React, { useState } from 'react';
import styled from 'styled-components';

import { Button } from '../../components/Button';
import { Counter } from '../../components/Counter';
import { PostField } from '../../components/PostField';
import { Tab, Tabs } from '../../components/Tabs';
import { FillValue, Toolbar } from '../../components/Toolbar';
import { useDebounce } from '../../hooks/useDebounce';

interface Result {
    post: string;
    images: string[];
}

const CounterWrapper = styled.div`
    text-align: right;
`;

const Publisher = (): JSX.Element => {
    const [activeTabId, setActiveTabId] = useState<string>('config');
    const [disabledResult, setDisabledResult] = useState<boolean>(true);
    const [post, setPost] = useState<string>('');
    const [postLength, setPostLength] = useState<number>(0);
    const [result, setResult] = useState<Result>({ post: '', images: [] });

    const debouncedPostLength = useDebounce<number>(postLength, 200);

    return (
        <div>
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
                        fill={FillValue.last}
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
                    <div>
                        <p>Main text:</p>
                        <div>{result.post}</div>
                    </div>
                    <div>
                        <p>Other text:</p>
                        <div>
                            {
                                result.images.map((dataUrl: string, index: number) => (
                                    <img key={index} srcSet={dataUrl} alt="image post" />
                                ))
                            }
                        </div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );


    function handlerTextChange(value: string): void {
        setPost(value);
        setPostLength(value.length);
    }

    function onConvertPost(): void {
        if (!postLength) {
            return;
        }
        debugger;
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
                if (result.status >= 400) {
                    result.json().then((err: { errors: string }) => {
                        throw new Error(err.errors);
                    });
                }
                return result.json();
            })
            .then(result => {
                setActiveTabId('result');
                setDisabledResult(false);
                setResult(result);
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
};

export default Publisher;