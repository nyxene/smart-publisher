import React from 'react';
import styled from 'styled-components';

import { MAIN_TEXT_MAX_LENGTH } from '../../constants';

interface CounterProps {
    length: number;
}

const CounterStyled = styled.div`
    color: #000;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
`;

const CounterCurrentLength = styled.span<{ length: number }>`
    color: ${({ length }) => length > MAIN_TEXT_MAX_LENGTH ? '#cb292c' : '#000'};
`;

const Counter = ({ length }: CounterProps): JSX.Element => (
    <CounterStyled>
        <CounterCurrentLength length={length}>
            {length}
        </CounterCurrentLength> / {MAIN_TEXT_MAX_LENGTH}
    </CounterStyled>
);

export default Counter;
