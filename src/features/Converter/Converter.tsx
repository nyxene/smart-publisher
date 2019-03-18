import React, { useState } from 'react';

import { Tab, Tabs } from '../../components/Tabs';

interface Result {
    mainText: string;
    otherText: string[] | [];
}

const Converter = (): JSX.Element => {

    const [activeTabId, setActiveTabId] = useState<string>('config');
    const [disabledResult, setDisabledResult] = useState<boolean>(true);
    const [postField, setPostField] = useState<string>('');
    const [result, setResult] = useState<Result>({ mainText: '', otherText: [] });

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
                    <div>
                        <textarea
                            value={postField}
                            onChange={e => setPostField(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={onConvertPost}
                        >
                            Send
                        </button>
                    </div>
                </Tab>
                <Tab
                    tabId="result"
                    label="Result"
                    disabled={disabledResult}
                >
                    <div>
                        <p>Main text:</p>
                        <div>{result.mainText}</div>
                    </div>
                    <div>
                        <p>Other text:</p>
                        <div>{result.otherText}</div>
                    </div>
                </Tab>
            </Tabs>
        </div>
    );

    function onConvertPost(): void {
        setDisabledResult(true);
        setActiveTabId('result');

        fetch('http://localhost:3000/api/v1/converter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: postField,
            }),
        })
            .then(result => result.json())
            .then(result => {
                setDisabledResult(false);
                setResult(result);
            });
    }
};

export default Converter;
