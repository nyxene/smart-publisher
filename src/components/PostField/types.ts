import React from 'react';

export interface UsePostFieldConfig {
    value?: string;
    disabled?: boolean;
}

export interface PostFieldProps extends UsePostFieldConfig {
    postRef?: React.RefObject<HTMLTextAreaElement>;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
