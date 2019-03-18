import React from 'react';
import styled, { css } from 'styled-components';

import { TabProps } from './Tabs';

interface TabButtonsProps {
    tabs: [];
    activeTabId: string;
    onChangeTab: (tabId: string) => void;
}

const TabButtonsStyled = styled.div`
    display: flex;
    height: 42px;
    border-bottom: 2px solid #ccc;
`;

const TabButton = styled.div<{ selected: boolean, disabled: boolean }>`
    padding: 0 24px;
    height: 42px;
    line-height: 42px;
    border-bottom: 2px solid #ccc;
    
    color: #000;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
        color: #197e23;
        background: white;
        cursor: pointer;
        border-bottom-color: #197e23;
    }
        
    ${props => props.selected && css`
        border-bottom-color: #197e23;
        background-color: #f2f2f2;
        cursor: default;
        
        &:hover {
            color: #000;
            background-color: #f2f2f2;
        }
    `}
    
    ${props => props.disabled && css`
        color: rgba(0, 0, 0, .5);
        cursor: default;
        
        &:hover {
            color: rgba(0, 0, 0, .5);
            cursor: default;
            border-bottom: 2px solid #ccc;
        }
    `}
`;

const TabButtons = ({ tabs, activeTabId, onChangeTab }: TabButtonsProps): JSX.Element => {
    return (
        <TabButtonsStyled>
            {tabs.map(({ tabId, label, disabled = false }: TabProps): JSX.Element =>
                <TabButton
                    key={tabId}
                    selected={tabId === activeTabId}
                    disabled={disabled}
                    onClick={() => !disabled && onChangeTab(tabId)}
                >
                    {label}
                </TabButton>
            )}
        </TabButtonsStyled>
    );
};

export default TabButtons;
