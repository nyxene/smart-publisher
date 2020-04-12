import React from 'react';

export interface UsePostConfig {
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    textSeparator?: string;
}

export interface PostProps {
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    textSeparator?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    postRef?: React.RefObject<HTMLTextAreaElement>;
}
