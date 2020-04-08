import React from 'react';

import { Panel, Text, TEXT_COLOR } from '~components';

import { FromLabelProps } from './types';

export const FromLabel = ({ children, error }: FromLabelProps) => (
    <Panel>
        <Text color={error ? TEXT_COLOR.accent : TEXT_COLOR.black}>{children}</Text>
    </Panel>
);

FromLabel.displayName = 'FromLabel';
