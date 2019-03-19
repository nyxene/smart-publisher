import React from 'react';
import styled from 'styled-components';

interface ToolbarProps {
    items: JSX.Element[];
}

const ToolbarItem = styled.div`
    & + & {
        padding-left: .5em;
    }
`;

const ToolbarStyled = styled.div`
    display: flex;
    align-items: center;
    padding: .5em 1em;
    background-color: #f5f5f5;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
`;

const Toolbar = ({ items }: ToolbarProps): JSX.Element => (
    <ToolbarStyled>
        {items.map((item: JSX.Element, index: number) => (
            <ToolbarItem key={index}>
                {item}
            </ToolbarItem>
        ))}
    </ToolbarStyled>
);

export default Toolbar;
