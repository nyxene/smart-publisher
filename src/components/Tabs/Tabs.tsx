import React, { Children, ReactElement } from 'react';
import styled from 'styled-components';

import Tab from './Tab';
import TabButtons from './TabButtons';

interface TabsProps {
    activeTabId: string;
    onChangeTab: (tabId: string) => void;
    children: ReactElement;
}

export interface TabProps {
    tabId: string;
    label: string;
    disabled?: boolean;
}

const TabContent = styled.div`
    padding: 1em 1.5em;
`;

const Tabs = ({
    activeTabId,
    onChangeTab,
    children
}: TabsProps): ReactElement => {
    let tabProps: TabProps[] = [];

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
            <TabContent>{content}</TabContent>
        </>
    );
};

export default Tabs;
