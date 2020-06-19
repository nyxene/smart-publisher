import React from 'react';

import { Text, TEXT_COLOR, TEXT_SIZE } from '~/components';
import { MAIN_TEXT_MAX_LENGTH } from '~/core/constants';

import { CounterProps } from './types';

export const Counter = ({ value, maximum = MAIN_TEXT_MAX_LENGTH }: CounterProps) => (
    <Text component="span" size={TEXT_SIZE.s}>
        <Text component="span" size={TEXT_SIZE.inherit} color={value > maximum ? TEXT_COLOR.accent : TEXT_COLOR.black}>
            {value}
        </Text>
        {`/${maximum}`}
    </Text>
);

Counter.displayName = 'Counter';
