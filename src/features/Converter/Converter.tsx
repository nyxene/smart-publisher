import React from 'react';
import styled from 'styled-components';

import configIconSrc from '~/assets/icons/config.svg';
import closeIconSrc from '~/assets/icons/close.svg';
import { APP_BAR_BUTTON_UI, APP_BAR_CONTROL_TYPE, AppBar, CoverItemProps, Covers, usePost } from '~/components';
import { INITIAL_APP_CONFIG } from '~/core/constants';
import { isMobile } from '~/core/helpers';
import { appStorage } from '~/core/storage';
import { TextConverter } from '~/core/TextConverter';
import { Config, ConfigStorage } from '~/features/Config';

import { separateCondition } from './helpers';

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
    const [showConfig, setShowConfig] = React.useState<boolean>(false);
    const [config, setConfig] = React.useState<ConfigStorage>(INITIAL_APP_CONFIG);
    const [converted, setConverted] = React.useState<boolean>(false);
    const [covers, setCovers] = React.useState<CoverItemProps[]>([]);

    const [postControl, { value: post, setPost, setDisabledPost, clearPost, copyToClipboard }] = usePost({
        label: 'Characters before split:',
        placeholder: 'Enter post…',
        textSeparator: config.textSeparator
    });

    const hasCovers = converted && covers.length > 0;

    const onToggleConfig = () => {
        setShowConfig(!showConfig);
        setDisabledPost(!showConfig);
    };

    const onSaveConfig = (newConfig: ConfigStorage) => {
        setConfig(newConfig);
        setShowConfig(false);
        setDisabledPost(false);
    };

    const getConverter = () => {
        return new TextConverter(
            config.textColor,
            config.bgColor,
            config.ratio,
            separateCondition(config.textSeparator)
        );
    };

    const onFormatPost = () => {
        if (!post.length) {
            return;
        }

        try {
            const converter = getConverter();
            const formattedPost = converter.format(post);

            setPost(formattedPost);
        } catch (e) {
            console.log('Text Converter error', e);
        }
    };

    const onConvertPost = () => {
        if (!post.length) {
            return;
        }

        try {
            const converter = getConverter();
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

    React.useEffect(() => {
        let savedConfig = appStorage.getItem<ConfigStorage>('config');

        if (!savedConfig || typeof savedConfig === 'string') {
            savedConfig = INITIAL_APP_CONFIG;
        }

        savedConfig = {
            ...INITIAL_APP_CONFIG,
            ...savedConfig
        };

        setConfig(savedConfig);
    }, []);

    return (
        <Root data-test-id="converterRoot">
            <AppBar
                items={[
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        ui: showConfig ? APP_BAR_BUTTON_UI.secondary : APP_BAR_BUTTON_UI.neutral,
                        icon: showConfig ? closeIconSrc : configIconSrc,
                        onClick: () => {
                            onToggleConfig();
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.brandLink,
                        text: isMobile() ? 'SP' : '🧠 Smart Publisher',
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
                        ui: APP_BAR_BUTTON_UI.neutral,
                        text: 'Format',
                        hidden: !post || converted,
                        disabled: !post.length,
                        onClick: () => {
                            onFormatPost();
                        }
                    },
                    {
                        type: APP_BAR_CONTROL_TYPE.button,
                        text: 'Convert',
                        hidden: !post || converted,
                        disabled: !post.length,
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
            {showConfig && <Config onDone={onSaveConfig} />}
            <Content data-test-id="converterContent">{postControl}</Content>
            {hasCovers && <Covers items={covers} />}
        </Root>
    );
};

Converter.displayName = 'Converter';
