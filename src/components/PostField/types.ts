import React from 'react';

export interface UsePostFieldConfig {
    post?: string;
    height?: string;
    disabled?: boolean;
    readonly?: boolean;
}

export interface PostFieldProps extends UsePostFieldConfig {
    postRef?: React.RefObject<HTMLTextAreaElement>;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
