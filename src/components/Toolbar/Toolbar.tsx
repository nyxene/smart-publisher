import React, { ReactElement } from 'react';
import styled from 'styled-components';

enum ALIGN {
    start = 'flex-start',
    center = 'center',
    end = 'flex-end',
    fill = 'stretch'
}

export enum ALIGN_ITEMS_VALUE {
    start = 'start',
    center = 'center',
    end = 'end',
    fill = 'fill'
}

export enum FILL_VALUE {
    all = 'all',
    last = 'last',
    first = 'first'
}

enum JUSTIFY_CONTENT {
    start = 'start',
    center = 'center',
    between = 'space-between;',
    around = 'space-around',
    evenly = 'space-evenly'
}

export enum JUSTIFY_CONTENT_VALUE {
    start = 'start',
    center = 'center',
    between = 'between',
    around = 'around',
    evenly = 'evenly'
}

interface ToolbarBaseProps {
    alignItems?: ALIGN_ITEMS_VALUE;
    fill?: FILL_VALUE;
    justifyContent?: JUSTIFY_CONTENT_VALUE;
}

interface ToolbarProps extends ToolbarBaseProps {
    items: ReactElement[];
}

const ToolbarItem = styled.div`
    & + & {
        padding-left: 0.5em;
    }
`;

export const ToolbarStyled = styled.div<ToolbarBaseProps>`
    display: flex;
    flex-shrink: 1;
    flex-wrap: nowrap;
    flex-direction: ;
    align-items: ${({ alignItems }) =>
        ALIGN[alignItems || ALIGN_ITEMS_VALUE.center]};
    justify-content: ${({ justifyContent }) =>
        JUSTIFY_CONTENT[justifyContent || JUSTIFY_CONTENT_VALUE.start]};

    ${({ fill }) =>
        fill === FILL_VALUE.all &&
        `
        ${ToolbarItem} {
            flex: 1 1 auto;
        }
    `};
    ${({ fill }) =>
        fill === FILL_VALUE.last &&
        `
        ${ToolbarItem}:last-child {
            flex: 1 1 auto;
        }
    `};
    ${({ fill }) =>
        fill === FILL_VALUE.first &&
        `
        ${ToolbarItem}:first-child {
            flex: 1 1 auto;
        }
    `};

    padding: 0.5em 1em;
    min-width: 0;
    background-color: #f5f5f5;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
`;

const Toolbar = ({
    alignItems,
    fill,
    justifyContent,
    items
}: ToolbarProps): ReactElement => (
    <ToolbarStyled
        alignItems={alignItems}
        fill={fill}
        justifyContent={justifyContent}
    >
        {items.map((item: ReactElement, index: number) => (
            <ToolbarItem key={index}>{item}</ToolbarItem>
        ))}
    </ToolbarStyled>
);

export default Toolbar;
