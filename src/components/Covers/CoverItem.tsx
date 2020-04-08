import React from 'react';

import { CoverImage } from './CoverImage';
import { CoverLink } from './CoverLink';
import { CoverItemProps } from './types';

export const CoverItem = ({ dataImage, name }: CoverItemProps) => (
    <CoverLink href={dataImage} download={name} data-test-id={name || 'coverItem'}>
        <CoverImage dataImage={dataImage} />
    </CoverLink>
);

CoverItem.displayName = 'CoverItem';
