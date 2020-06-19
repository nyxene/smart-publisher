import React from 'react';

export interface UsePostConfig {
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    textSeparator?: string;
}

export interface UsePostOutput {
    value: string;
    setPost(post: string): void;
    disabledPost: boolean;
    setDisabledPost(value: boolean): void;
    clearPost(): void;
    copyToClipboard(): void;
}

export interface PostProps {
    label?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    textSeparator?: string;
    onChange?(e: React.ChangeEvent<HTMLTextAreaElement>): void;
    postRef?: React.RefObject<HTMLTextAreaElement>;
}
