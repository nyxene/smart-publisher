import React from 'react';
import styled, { css } from 'styled-components';

import { Button, BUTTON_UI, FormControl, FormGroup, TextInput } from '~/components';
import { INITIAL_APP_CONFIG } from '~/core/constants';
import { appStorage } from '~/core/storage';
import { useInput } from '~/core/form/useInput';
import { RATIO } from '~/core/TextToPng';
import { Theme } from '~/theme';

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

const RadioRoot = styled.div`
    ${({ theme }) => css`
        display: flex;

        > * {
            margin-left: ${theme.sizes.s};
        }
    `}
`;

RadioRoot.displayName = 'RadioRoot';

const RatioBlock = styled.div<{ theme: Theme; ratio: RATIO; isActive: boolean }>`
    ${({ theme, ratio, isActive }) => css`
        display: flex;
        align-items: center;
        justify-content: center;

        width: ${ratio === RATIO.landscape ? theme.sizes.xxxl : theme.sizes.xxl};
        height: ${ratio === RATIO.portrait ? theme.sizes.xxxl : theme.sizes.xxl};

        background-color: ${theme.colors.white};

        border-width: ${theme.borders.widths.base};
        border-color: ${isActive ? theme.colors.primary : theme.colors.backgroundLight};
        border-style: solid;

        font-size: ${theme.font.sizes.xxs};
        font-weight: ${theme.font.weights.semiBold};

        &:hover {
            border-color: ${isActive ? theme.colors.primary : theme.colors.primaryLight};
            cursor: pointer;
        }
    `}
`;

RatioBlock.displayName = 'RatioBlock';

export const Config = ({ textColor, bgColor, textSeparator, ratio, onDone }: ConfigProps) => {
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
    const [ratioValue, setRatioValue] = React.useState<RATIO>(ratio || savedConfig.ratio || RATIO.portrait);

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
            textSeparator: textSeparatorInput.value || '',
            ratio: ratioValue
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
                <FormControl label="Cover ratio:">
                    <RadioRoot>
                        <RatioBlock
                            ratio={RATIO.portrait}
                            isActive={ratioValue === RATIO.portrait}
                            onClick={() => setRatioValue(RATIO.portrait)}
                        >
                            Portrait
                        </RatioBlock>
                        <RatioBlock
                            ratio={RATIO.square}
                            isActive={ratioValue === RATIO.square}
                            onClick={() => setRatioValue(RATIO.square)}
                        >
                            Square
                        </RatioBlock>
                        <RatioBlock
                            ratio={RATIO.landscape}
                            isActive={ratioValue === RATIO.landscape}
                            onClick={() => setRatioValue(RATIO.landscape)}
                        >
                            Landscape
                        </RatioBlock>
                    </RadioRoot>
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
