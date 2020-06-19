import React from 'react';

import { Panel, Text, TEXT_COLOR, TEXT_SIZE, TEXT_TRANSFORM, TEXT_WHITE_SPACE } from '~/components';

import { FromLabelProps } from './types';

export const FromLabel = ({ children, error }: FromLabelProps) => (
    <Panel>
        <Text
            color={error ? TEXT_COLOR.accent : TEXT_COLOR.black}
            size={TEXT_SIZE.s}
            transform={TEXT_TRANSFORM.uppercase}
            whiteSpace={TEXT_WHITE_SPACE.nowrap}
        >
            {children}
        </Text>
    </Panel>
);

FromLabel.displayName = 'FromLabel';
