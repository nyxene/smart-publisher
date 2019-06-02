import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { TabProps } from './Tabs';

interface TabButtonsProps {
    tabs: TabProps[];
    activeTabId: string;
    onChangeTab: (tabId: string) => void;
}

const TabButtonsStyled = styled.div`
    padding: 0 1.5em;
    display: flex;
    height: 42px;
    border-bottom: 2px solid #d5d5d5;
`;

const TabButton = styled.div<{ selected: boolean; disabled: boolean }>`
    padding: 0 24px;
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid #d5d5d5;

    color: #000;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;

    &:hover {
        color: #27982b;
        background: white;
        cursor: pointer;
        border-bottom-color: #27982b;
    }

    ${props =>
        props.selected &&
        css`
            border-bottom-color: #27982b;
            background-color: #f2f2f2;
            cursor: default;

            &:hover {
                color: #000;
                background-color: #f2f2f2;
            }
        `}

    ${props =>
        props.disabled &&
        css`
            color: rgba(0, 0, 0, 0.5);
            cursor: default;

            &:hover {
                color: rgba(0, 0, 0, 0.5);
                cursor: default;
                border-bottom: 2px solid #d5d5d5;
            }
        `}
`;

const TabButtons = ({
    tabs,
    activeTabId,
    onChangeTab
}: TabButtonsProps): ReactElement => (
    <TabButtonsStyled>
        {tabs.map(
            ({ tabId, label, disabled = false }: TabProps): ReactElement => (
                <TabButton
                    key={tabId}
                    selected={tabId === activeTabId}
                    disabled={disabled}
                    onClick={() => !disabled && onChangeTab(tabId)}
                >
                    {label}
                </TabButton>
            )
        )}
    </TabButtonsStyled>
);

export default TabButtons;
