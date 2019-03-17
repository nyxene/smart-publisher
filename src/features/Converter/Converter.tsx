import React, { useState } from 'react';

interface Result {
    mainText: string;
    otherText: string[] | []
}

const Converter = (): JSX.Element => {

    const [postField, setPostField] = useState('');
    const [result, setResult] = useState<Result>({ mainText: '', otherText: [] });

    return (
        <div>
            <div>
                <textarea
                    defaultValue=""
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
            <div>
                <p>Main text:</p>
                <pre>{result.mainText}</pre>
            </div>
            <div>
                <p>Other text:</p>
                <pre>{result.otherText}</pre>
            </div>
        </div>
    );

    function onConvertPost(): void {
        fetch('http://localhost:3000/api/v1/converter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                post: postField
            }),
        })
            .then(result => result.json())
            .then(result => {
                setResult(result);
            });
    }
};

export default Converter;
