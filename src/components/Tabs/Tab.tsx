import React, { ReactElement } from 'react';

interface TabProps {
    children: ReactElement;
}

const Tab = ({ children }: TabProps): ReactElement => <>{children}</>;

export default Tab;
