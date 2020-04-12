import React from 'react';
import styled, { css } from 'styled-components';

import { Button, BUTTON_UI, FormControl, FormGroup, TextInput } from '~components';
import { INITIAL_APP_CONFIG } from '~core/constants';
import { appStorage } from '~core/storage';
import { useInput } from '~core/form/useInput';
import { Theme } from '~theme';

import { ConfigProps, ConfigStorage } from './types';

const Root = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        flex-direction: column;
        padding: ${theme.sizes.thin};
        width: 100%;

        background-color: ${theme.colors.backgroundNeutral};

        border-width: ${theme.sizes.s};
        border-color: ${theme.colors.secondary};
        border-style: solid;
    `}
`;

Root.displayName = 'ConfigRoot';

const Actions = styled.div<{ theme: Theme }>`
    ${({ theme }) => css`
        display: flex;
        justify-content: flex-end;
        margin-top: ${theme.sizes.s};
    `}
`;

Actions.displayName = 'ConfigActions';

export const Config = ({ textColor, bgColor, textSeparator, onDone }: ConfigProps) => {
    let savedConfig = appStorage.getItem<ConfigStorage>('config');

    if (!savedConfig || typeof savedConfig === 'string') {
        savedConfig = INITIAL_APP_CONFIG;
    }

    savedConfig = {
        ...INITIAL_APP_CONFIG,
        ...savedConfig
    };

    const { input: textColorInput } = useInput({ value: textColor || savedConfig.textColor });
    const { input: bgColorInput } = useInput({ value: bgColor || savedConfig.bgColor });
    const { input: textSeparatorInput } = useInput({ value: textSeparator || savedConfig.textSeparator });

    const textColorError = !textColorInput.value;
    const bgColorError = !bgColorInput.value;
    const textSeparatorError = !textSeparatorInput.value;
    const invalidForm = textColorError || bgColorError || textSeparatorError;

    const onSaveConfig = () => {
        if (invalidForm) {
            return;
        }

        const newConfig: ConfigStorage = {
            textColor: textColorInput.value || '',
            bgColor: bgColorInput.value || '',
            textSeparator: textSeparatorInput.value || ''
        };
        appStorage.setItem('config', newConfig);
        onDone?.(newConfig);
    };

    return (
        <Root>
            <FormGroup>
                <FormControl label="Text color:" error={textColorError}>
                    <TextInput type="color" {...textColorInput} />
                </FormControl>
                <FormControl label="Background color:" error={bgColorError}>
                    <TextInput type="color" {...bgColorInput} />
                </FormControl>
                <FormControl label="Symbol for text separating:" error={textSeparatorError}>
                    <TextInput maxLength={10} {...textSeparatorInput} />
                </FormControl>
            </FormGroup>
            <Actions>
                <Button ui={BUTTON_UI.secondary} disabled={invalidForm} onClick={onSaveConfig}>
                    Save
                </Button>
            </Actions>
        </Root>
    );
};

Config.displayName = 'Config';
