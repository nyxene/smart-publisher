import React from 'react';

export interface UsePostFieldConfig {
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
}

export interface PostFieldProps extends UsePostFieldConfig {
    postRef?: React.RefObject<HTMLTextAreaElement>;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
