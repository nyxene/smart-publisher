import React, { useState } from 'react';
import styled from 'styled-components';

import { APP_BAR_BUTTON_UI, APP_BAR_CONTROL_TYPE, AppBar, CoverItemProps, Covers, usePostField } from '~/components';
import { TextConverter } from '~core/TextConverter';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    width: 100%;
    height: 100%;
`;

Root.displayName = 'ConverterRoot';

const Content = styled.div`
    display: flex;
    flex: 1;

    width: 100%;
`;

Content.displayName = 'ConverterContent';

export const Converter = () => {
    const [converted, setConverted] = useState<boolean>(false);
    const [covers, setCovers] = useState<CoverItemProps[]>([]);

    const [postField, { value: post, setPost, clearPost, copyToClipboard }] = usePostField({
        label: 'Characters:',
        placeholder: 'Enter post…'
    });

    const hasCovers = converted && covers.length > 0;

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

            const newCovers =
                covers?.map((cover, idx) => ({
                    name: `cover-${idx + 1}`,
                    dataImage: cover
                })) ?? [];

            setConverted(true);
            setPost(convertedPost);
            setCovers(newCovers);
        } catch (e) {
            console.log('Text Converter error', e);
        }
    };

    const onResetAll = () => {
        setConverted(false);
        clearPost();
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
                        text: 'Copy',
                        hidden: !converted,
                        onClick: () => {
                            onCopyPost();
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        text: 'Convert',
                        hidden: converted,
                        onClick: () => {
                            onConvertPost();
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        ui: APP_BAR_BUTTON_UI.warn,
                        text: 'Reset',
                        hidden: !post,
                        onClick: () => {
                            onResetAll();
                        }
                    }
                ]}
            />
            <Content data-test-id="converterContent">{postField}</Content>
            {hasCovers && <Covers items={covers} />}
        </Root>
    );
};

Converter.displayName = 'Converter';
