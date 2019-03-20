import React from 'react';
import styled from 'styled-components';

enum Align {
    start = 'flex-start',
    center = 'center',
    end = 'flex-end',
    fill = 'stretch'
}

export enum AlignItemsValue {
    start = 'start',
    center = 'center',
    end = 'end',
    fill = 'fill'
}

export enum FillValue {
    all = 'all',
    last = 'last',
    first = 'first'
}

enum JustifyContent {
    start = 'start',
    center = 'center',
    between = 'space-between;',
    around = 'space-around',
    evenly = 'space-evenly'
}

export enum JustifyContentValue {
    start = 'start',
    center = 'center',
    between = 'between',
    around = 'around',
    evenly = 'evenly'
}

interface ToolbarBaseProps {
    alignItems?: AlignItemsValue;
    fill?: FillValue;
    justifyContent?: JustifyContentValue;
}

interface ToolbarProps extends ToolbarBaseProps {
    items: JSX.Element[];
}

const ToolbarItem = styled.div`
    & + & {
        padding-left: .5em;
    }
`;

export const ToolbarStyled = styled.div<ToolbarBaseProps>`
    display: flex;
    flex-shrink: 1;
    flex-wrap: nowrap;
    flex-direction: ;
    align-items: ${({ alignItems }) => Align[alignItems || AlignItemsValue.center]};
    justify-content: ${({ justifyContent }) => JustifyContent[justifyContent || JustifyContentValue.start]};

    ${({ fill }) => fill === FillValue.all && `
        ${ToolbarItem} {
            flex: 1 1;
        }
    `};
    ${({ fill }) => fill === FillValue.last && `
        ${ToolbarItem}:last-child {
            flex: 1 1;
        }
    `};
    ${({ fill }) => fill === FillValue.first && `
        ${ToolbarItem}:first-child {
            flex: 1 1;
        }
    `};
    
    padding: .5em 1em;
    min-width: 0;
    background-color: #f5f5f5;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
`;

const Toolbar = ({ alignItems, fill, justifyContent, items }: ToolbarProps): JSX.Element => (
    <ToolbarStyled
        alignItems={alignItems}
        fill={fill}
        justifyContent={justifyContent}
    >
        {items.map((item: JSX.Element, index: number) => (
            <ToolbarItem key={index}>
                {item}
            </ToolbarItem>
        ))}
    </ToolbarStyled>
);

export default Toolbar;
