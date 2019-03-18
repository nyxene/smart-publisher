import React, { Children } from 'react';
import styled from 'styled-components';

import TabButtons from './TabButtons';
import Tab from './Tab';

interface TabsProps {
    activeTabId: string;
    onChangeTab: (tabId: string) => void;
    children: any;
}

export interface TabProps {
    tabId: string;
    label: string;
    disabled?: boolean;
}

const TabContent = styled.div`
    padding: 16px 24px;
`;

const Tabs = ({ activeTabId, onChangeTab, children }: TabsProps): JSX.Element => {
    let tabProps: any = []; // TODO Research

    const content = Children.map(children, child => {
        if (child.type === Tab) {
            const { tabId, label, disabled } = child.props;
            tabProps.push({ tabId, label, disabled });

            if (activeTabId !== tabId) {
                return null;
            }
        }
        return child;
    });

    return (
        <>
            <TabButtons
                activeTabId={activeTabId}
                onChangeTab={onChangeTab}
                tabs={tabProps}
            />
            <TabContent>
                {content}
            </TabContent>
        </>
    );
};

export default Tabs;
