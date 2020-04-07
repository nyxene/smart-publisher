import React, { useState } from 'react';

import { APP_BAR_BUTTON_UI, APP_BAR_CONTROL_TYPE, AppBar, usePostField } from '~/components';
import { useDebounce } from '~core/hooks';
import { TextConverter } from '~core/TextConverter';
import styled from 'styled-components';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    display: flex;
    flex: 1;

    width: 100%;
`;

export const Converter = () => {
    const [converted, setConverted] = useState<boolean>(false);
    const [covers, setCovers] = useState<string[]>([]);

    const [postField, { post, setPost, readonlyPost, setReadonlyPost, clearPost, copyToClipboard }] = usePostField();

    const debouncedPostLength = useDebounce<number>(post.length, 200);

    const onConvertPost = () => {
        if (!post.length) {
            return;
        }

        try {
            const converter = new TextConverter({
                textColor: '#514253',
                bgColor: '#f4eae8'
            });
            const { mainText: convertedPost, covers } = converter.run(post);

            setPost(convertedPost);
            setReadonlyPost(true);
            setConverted(true);
            setCovers(covers);
        } catch (e) {
            setReadonlyPost(false);
        }
    };

    const onResetAll = () => {
        clearPost();
        setReadonlyPost(false);
        setConverted(false);
        setCovers([]);
    };

    const onCopyPost = () => {
        copyToClipboard();
    };

    return (
        <Root data-test-id="converterRoot">
            <AppBar
                items={[
                    {
                        type: APP_BAR_CONTROL_TYPE.brandLink,
                        text: 'SP',
                        onClick: () => {
                            location.reload();
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.fill
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        text: 'Convert',
                        onClick: () => {
                            console.log('convert');
                            setConverted(true);
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        ui: APP_BAR_BUTTON_UI.warn,
                        text: 'Reset',
                        hidden: !post,
                        onClick: () => {
                            console.log('reset');
                            setConverted(false);
                        }
                    }
                ]}
            />
            <Content data-test-id="converterContent">{postField}</Content>
        </Root>
    );
};

Converter.displayName = 'Converter';
